const express = require("express")
const morgan = require("morgan")
const cookie = require("cookie-parser")
const { port } = require("./config")
const { connection } = require("./config/db")

// Routes:
const auth = require("./routes/auth")
const users = require("./routes/users")

const app = express()


connection()

// Cookies. Diferentes tipos de cookies. HTTP Only Cookie

// Utilizando middleware
app.use(morgan("dev"))
app.use(express.json())
app.use(cookie())


// Usando rutas:
auth(app)
users(app)


app.get("/",(req,res)=>{
    return res.json({
        name:"Ecommerce"
    })
})


app.listen(port,()=>{
    console.log("Listening on: http://localhost:"+port)
})