const socketConnection = require("../libs/socket")
const Chat = require("../services/chat")

function chat(server){
    const io = socketConnection(server)
    const chatService = new Chat(io)
}

module.exports = chat