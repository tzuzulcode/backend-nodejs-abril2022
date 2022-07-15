let users = []
const ChatModel = require("../models/chat")
const cookie = require("cookie")
const AuthService = require("./auth")

class Chat{
    constructor(io){
        this.io = io

        io.on("connection",(socket)=>{
            console.log("Client connected")
            
            socket.on("user_connected",()=>{
                const cookies = socket.handshake.headers.cookie
                if(cookies){
                    const {token}=cookie.parse(cookies)
                    if(token){
                        const user = AuthService.validate(token)
                        // console.log(user)
                        users.push({
                            idUser:user.id,
                            idSocket:socket.id
                        })
                        socket.idUser = user.id
        
                        // console.log(users)
        
                        io.emit("user_connected",users)
                    }
                }
                
            })

            socket.on("disconnect",()=>{
                console.log("Disconnected")
                users = users.filter(user=>user.idUser!==socket.idUser)
                io.emit("user_disconnected",users)
            })

            socket.on("begin_chat",async (idChat)=>{
                socket.idChat = idChat
                const messages = await ChatModel.findById(idChat)
                io.to(socket.id).emit("messages",messages)
            })

            socket.on("send_message",async (content)=>{
                console.log("Sending message...",content)

                const chat = await this.sendMessage(socket.idChat , socket.idUser ,content)
                console.log(chat)

                const {idUserOne,idUserTwo} = chat

                const receiverID = socket.idUser===idUserOne ? idUserTwo.toString():idUserOne.toString()

                console.log(receiverID)

                const receiverConnected = users.find(user=>user.idUser===receiverID)
                console.log(receiverConnected)
                if(receiverConnected){
                    socket.to(receiverConnected.idSocket).emit("received_message",{
                        senderId:socket.idUser,
                        content
                    })
                }
                io.to(socket.id).emit("sended_message",chat)
            })
        })
    }

    async getMyChats(idUser){
        const chats = await ChatModel.find({
            $or:[{idUserOne:idUser},{idUserTwo:idUser}]
        })

        return chats
    }

    async create(idUserOne,idUserTwo){
        const chat = await ChatModel.create({
            idUserOne,
            idUserTwo
        })

        return chat
    }

    async sendMessage(idChat,idSender,content){
        const chat = await ChatModel.findByIdAndUpdate(idChat,{
            $push:{
                messages:{
                    content,
                    idSender,
                    isFile:false
                }
            }
        },{new:true})

        return chat
    }
}

module.exports = Chat