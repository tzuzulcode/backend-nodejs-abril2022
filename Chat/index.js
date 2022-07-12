const express = require("express")
const cors = require("cors")
const { port } = require("./config")
const {connection} = require("./config/db")
const socketConnection = require("./libs/socket")
const Chat = require("./services/chat")

// Routers
const auth = require("./routes/auth")
const files = require("./routes/files")

connection()

const app = express()

app.use(cors({
    origin:["http://localhost:5500","http://127.0.0.1:5500"],
    credentials:true
}))

app.use(express.json())

auth(app)
files(app)

app.use(express.json())

app.get("/",(req,res)=>{
    
})

const server = app.listen(port,()=>{
    console.log("Listening on: http://localhost:4000")
})

const io = socketConnection(server)
const chatService = new Chat(io)