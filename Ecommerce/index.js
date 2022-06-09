const express = require("express")
const session = require("express-session")
const morgan = require("morgan")
const cookie = require("cookie-parser")
const cors = require("cors")
const { port, sessionSecret } = require("./config")
const { connection } = require("./config/db")
const passport = require("passport")

// Routes:
const auth = require("./routes/auth")
const users = require("./routes/users")
const products = require("./routes/products")
const cart = require("./routes/cart")
const { useGoogleStrategy,useFacebookStrategy,useGitHubStrategy,useTwitterStrategy } = require("./middleware/authProvider")

const app = express()


connection()

// Utilizando middleware
app.use(morgan("dev"))
app.use(express.json())
app.use(cookie())
app.use(cors({
    origin:["http://localhost:3000"],
    credentials:true
}))
app.use(session({
    secret:sessionSecret,
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize())
// Usando strategias
passport.use(useGoogleStrategy())
passport.use(useFacebookStrategy())
passport.use(useTwitterStrategy())
passport.use(useGitHubStrategy())

passport.serializeUser((user,done)=>{
    done(null,user)
})
passport.deserializeUser((user,done)=>{
    done(null,user)
})


// Usando rutas:
auth(app)
users(app)
products(app)
cart(app)


app.get("/",(req,res)=>{
    return res.json({
        name:"Ecommerce v2"
    })
})


app.listen(port,()=>{
    console.log("Listening on: http://localhost:"+port)
})