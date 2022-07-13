let users = []
const messages = []

class Chat{
    constructor(io){
        this.io = io

        io.on("connection",(socket)=>{
            console.log("Client connected")
            socket.on("user_connected",(data)=>{
                users.push({
                    idUser:data,
                    idSocket:socket.id
                })
                socket.idUser = data

                console.log(users)

                io.emit("user_connected",users)
            })

            socket.on("disconnect",()=>{
                console.log("Disconnected")
                users = users.filter(user=>user.idUser!==socket.idUser)
                io.emit("user_disconnected",users)
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