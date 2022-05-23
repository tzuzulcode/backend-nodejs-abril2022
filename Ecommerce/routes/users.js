const express = require("express")

function users(app){
    const router = express.Router()

    app.use("/api/users",router)


    router.get("/",(req,res)=>{
        console.log(req.cookies)
        return res.json({
            success:true
        })
    })
}

module.exports = users