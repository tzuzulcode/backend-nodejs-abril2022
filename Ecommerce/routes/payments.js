const express = require("express")
const PaymentsService = require("../services/payments")
const authMiddleware = require("../middleware/auth")

function payments(app){
    const router = express.Router()
    const paymentsServ = new PaymentsService()

    app.use("/api/payments",router)

    router.post("/createPayPalOrder",authMiddleware(1), async (req,res)=>{
        const result = await paymentsServ.createPayPalOrder(req.user.id)

        return res.json(result)
    })

    router.get("/availableMercadoPagoMethods",async (req,res)=>{
        const result = await paymentsServ.listPaymentMethodsMercadoPago()

        return res.json(result)
    })

    router.post("/createPaymentMercadoPago",authMiddleware(1), async (req,res)=>{
        const result = await paymentsServ.createPaymentMercadoPago(req.user.id,req.user.email,req.body.type)

        return res.json(result)
    })
}

module.exports = payments