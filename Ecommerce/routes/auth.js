const express = require("express")
const AuhtService = require("../services/auth")

function auth(app){
    const router = express.Router()
    app.use("/api/auth",router)
    const authServ = new AuhtService()

    router.post("/login",async (req,res)=>{
        const result = await authServ.login(req.body)


        return res.json(result)
    })
    router.post("/signup",async (req,res)=>{
        console.log(req.body)
        const result = await authServ.signup(req.body)


        return res.json(result)
    })
}

module.exports = auth