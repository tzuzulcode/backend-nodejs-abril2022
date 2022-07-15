const socketConnection = require("../libs/socket")
const Chat = require("../services/chat")
const {Router} = require("express")
const authValidation = require("../middleware/auth")

function chat(server,app){
    const io = socketConnection(server)
    const chatService = new Chat(io)
    const router = Router()

    app.use("/api/chats",router)

    router.get("/",authValidation(1),async (req,res)=>{
        const idUser = req.user.id
        const chats = await chatService.getMyChats(idUser)

        return res.json(chats)
    })

    router.post("/:idUser",authValidation(1),async (req,res)=>{
        const idUserOne = req.user.id
        const idUserTwo= req.params.idUser

        const chat = await chatService.create(idUserOne,idUserTwo)

        return res.json(chat)
    })
}

module.exports = chat