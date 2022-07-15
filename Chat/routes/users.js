const express = require("express")
const authValidation = require("../middleware/auth")
const UsersService = require("../services/users")

function users(app){
    const router = express.Router()
    const usersServ = new UsersService()

    app.use("/api/users",router)


    router.get("/",authValidation(1),async (req,res)=>{
        const users = await usersServ.getAll()
        return res.json(users)
    })
}

module.exports = users