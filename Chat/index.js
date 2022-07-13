const express = require("express")
const cors = require("cors")
const { port } = require("./config")
const {connection} = require("./config/db")

// Routers
const auth = require("./routes/auth")
const files = require("./routes/files")
const chat = require("./routes/chat")

connection()

const app = express()

const server = app.listen(port,()=>{
    console.log("Listening on: http://localhost:4000")
})

app.use(cors({
    origin:["http://localhost:5500","http://127.0.0.1:5500"],
    credentials:true
}))

app.use(express.json())

auth(app)
files(app)
chat(server)

app.get("/",(req,res)=>{
    return res.json({
        hola:"mundo"
    })
})