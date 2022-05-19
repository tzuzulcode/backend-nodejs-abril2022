const express = require("express")
const AuthService = require("../services/auth")
const { verifyToken } = require('../middleware/authValidation')

function auth(app){
    const router = express.Router()
    const authServ = new AuthService()

    app.use("/api/auth",router)

    router.post("/login", async (req, res) => {
        const result = await authServ.login(req.body)
        return res.status(result.error?400:200).json(result)
    })
    router.post("/signup", async (req, res) => {
        const result = await authServ.signup(req.body)
        return res.status(result.error?400:200).json(result)
    })
    router.post('/validate', verifyToken, async (req, res) => {
        return res.json({ logged: true, user: req.user })
   })
    
}

module.exports = auth