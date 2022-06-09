const express = require("express")
const CartService = require("../services/cart")
const authMiddleware = require("../middleware/auth")

function cart(app){
    const router = express.Router()
    const cartServ = new CartService()

    app.use("/api/cart",router)

    router.get("/",authMiddleware(1), async (req,res)=>{
        const result = await cartServ.getItems(req.user.id)

        return res.json(result)
    })

    router.post("/",authMiddleware(1),async (req,res)=>{
        const {idProduct,amount} = req.body
        const result = await cartServ.addToCart(req.user.id,idProduct,amount)

        return res.json(result)
    })
}

module.exports = cart