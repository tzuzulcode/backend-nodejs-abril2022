const express = require("express")
const { port } = require("./config")
const {connection} = require("./config/db")

// Routers
const auth = require("./routes/auth")

connection()

const app = express()

app.use(express.json())

auth(app)

app.use(express.json())

app.get("/",(req,res)=>{
    
})

app.listen(port,()=>{
    console.log("Listening on: http://localhost:4000")
})