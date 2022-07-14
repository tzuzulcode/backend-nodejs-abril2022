let users = []
const ChatModel = require("../models/chat")
const cookie = require("cookie")
const AuthService = require("./auth")

class Chat{
    constructor(io){
        this.io = io

        io.on("connection",(socket)=>{
            console.log("Client connected")
            
            socket.on("user_connected",(idUser)=>{
                const cookies = socket.handshake.headers.cookie
                const {token}=cookie.parse(cookies)
                if(token){
                    const user = AuthService.validate(token)
                    console.log(user)
                    users.push({
                        idUser:user.id,
                        idSocket:socket.id
                    })
                    socket.idUser = user.id
    
                    console.log(users)
    
                    io.emit("user_connected",users)
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

            socket.on("send_message",(idSocket,message)=>{
                console.log("Sending message...",idSocket,message)
                socket.to(idSocket).emit("received_message",{
                    senderSocketId:socket.id,
                    senderId:socket.idUser,
                    message
                })
                io.to(socket.id).emit("sended_message",{
                    senderSocketId:socket.id,
                    senderId:socket.idUser,
                    message
                })
            })
        })
    }
}

module.exports = Chat