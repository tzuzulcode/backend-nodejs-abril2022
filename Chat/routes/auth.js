const express = require("express")
const {authResponse,deleteCookie} = require("../helpers/authResponse")
const AuhtService = require("../services/auth")
const authValidation = require("../middleware/auth")
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

    router.get("/validate",authValidation(1),(req,res)=>{
        return res.json({
            success:true,
            user:req.user
        })
    })
}

module.exports = auth