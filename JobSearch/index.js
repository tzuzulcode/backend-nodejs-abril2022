const express = require("express")
const cors = require("cors")
const { port } = require("./config")
const {connection} = require("./config/db")


//Importando routes
const users = require("./routes/users")
const auth = require("./routes/auth")

connection()

const app = express()

//Middleware de JSON
app.use(cors({
    origin:["http://localhost:3000"]
}))
app.use(express.json())

//Usando routes
users(app)
auth(app)


app.listen(port,()=>{
    console.log("Listening: http://localhost:"+port)
})