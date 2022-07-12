const users = []
const messages = []

class Chat{
    constructor(io){
        this.io = io

        io.on("connection",(socket)=>{
            console.log("Client conectado")
            socket.on("active",(data)=>{
                users.push(data)

                console.log(users)

                io.emit("user connected",users)
            })

            socket.on("disconnect",()=>{
                users.pop()
                io.emit("user disconnected",users)
            })
        })
    }
}

module.exports = Chat