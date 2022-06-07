const express = require("express")
const {authResponse,providerResponse,deleteCookie} = require("../helpers/authResponse")
const AuhtService = require("../services/auth")
const passport = require("passport")
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

    router.get("/google",passport.authenticate("google",{
        scope:["email","profile"]
    }))
    router.get("/google/callback",passport.authenticate("google",{session:false}), async (req,res)=>{
        const user = req.user.profile
        console.log(user)
        const result = await authServ.socialLogin(user)
        return providerResponse(res,result,401)
    })

    router.get("/facebook",passport.authenticate("facebook",{
        scope:["email"]
    }))
    router.get("/facebook/callback",passport.authenticate("facebook",{session:false}), async (req,res)=>{
        const user = req.user.profile
        console.log(user)
        const result = await authServ.socialLogin(user)
        return providerResponse(res,result,401)
    })
    router.get("/twitter",passport.authenticate("twitter"))
    router.get("/twitter/callback",passport.authenticate("twitter",{scope:["email"]}), async (req,res)=>{
        const user = req.user.profile
        console.log(user)
        const result = await authServ.socialLogin(user)
        return providerResponse(res,result,401)
    })
    router.get("/github",passport.authenticate("github",{ scope: [ 'user:email' ] }))
    router.get("/github/callback",passport.authenticate("github",{session:false}), async (req,res)=>{
        const user = req.user.profile
        console.log(user)
        const result = await authServ.socialLogin(user)
        return providerResponse(res,result,401)
    })
}

module.exports = auth