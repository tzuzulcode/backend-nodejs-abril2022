const express = require("express")
const morgan = require("morgan")
const { port } = require("./config")
const { connection } = require("./config/db")

// Routes:
const auth = require("./routes/auth")

const app = express()


connection()

// Cookies. Diferentes tipos de cookies. HTTP Only Cookie

// Utilizando middleware
app.use(morgan("dev"))
app.use(express.json())


// Usando rutas:
auth(app)


app.get("/",(req,res)=>{
    return res.json({
        name:"Ecommerce"
    })
})


app.listen(port,()=>{
    console.log("Listening on: http://localhost:"+port)
})