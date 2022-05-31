const express = require("express")
const {authResponse,providerResponse,deleteCookie} = require("../helpers/authResponse")
const AuhtService = require("../services/auth")
const passport = require("passport")
function auth(app){
    const router = express.Router()
    app.use("/api/auth",router)
    
    const authServ = new AuhtService()

    router.post("/login",async (req,res)=>{
        const result = await authServ.login(req.body)

        return authResponse(res,result,401)
    })
    router.post("/signup",async (req,res)=>{
        const result = await authServ.signup(req.body)

        return authResponse(res,result,400)
    })

    router.get("/logout",(req,res)=>{
        return deleteCookie(res)
    })

    router.get("/google",passport.authenticate("google",{
        scope:["email","profile"]
    }))
    router.get("/google/callback",passport.authenticate("google",{session:false}), async (req,res)=>{
        const user = req.user.profile
        console.log(user)
        const result = await authServ.socialLogin(user)
        return providerResponse(res,result,401)
    })
}

module.exports = auth