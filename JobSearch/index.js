const express = require("express")
const { port } = require("./config")
const {connection} = require("./config/db")

//Importando routes
const users = require("./routes/users")

connection()

const app = express()

//Middleware de JSON
app.use(express.json())

//Usando routes
users(app)


app.listen(port,()=>{
    console.log("Listening: http://localhost:"+port)
})