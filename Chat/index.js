const express = require("express")
const { port } = require("./config")
const {connection} = require("./config/db")

connection()

const app = express()

app.use(express.json())

app.get("/",(req,res)=>{
    
})

app.listen(port,()=>{
    console.log("Listening on: http://localhost:4000")
})

// Streams