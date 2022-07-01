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

    router.get("/pay",authMiddleware(1),async(req,res)=>{
        const result = await cartServ.pay(req.user.id,req.user.stripeCustomerID)

        return res.json(result)
    })

    router.post("/add",authMiddleware(1),async (req,res)=>{
        const {idProduct,amount} = req.body
        const result = await cartServ.addToCart(req.user.id,idProduct,amount)

        return res.json(result)
    })

    router.post("/paymentCompleted",authMiddleware(1),async (req,res)=>{
        const result = await cartServ.clearCart(req.user.id)

        return res.json(result)
    })

    router.put("/changeAmount",authMiddleware(1), async (req,res)=>{
        const {idProduct,amount} = req.body
        const products = await cartServ.changeAmount(req.user.id,idProduct,amount)
        return res.json(products)
    })

    router.delete("/remove",authMiddleware(1),async (req,res)=>{
        const {idProduct} = req.body
        const result = await cartServ.removeFromCart(req.user.id,idProduct)

        return res.json(result)
    })
}

module.exports = cart