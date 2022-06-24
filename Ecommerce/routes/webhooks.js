const {Router} = require("express")
const PaymentService = require("../services/payments")


function webhooks(app){
    const router = Router()
    const paymentServ = new PaymentService()

    app.use("/api/webhooks",router)

    router.post("/stripe",async (req,res)=>{
        const sig = req.headers['stripe-signature'];

        const result = await paymentServ.confirm(req.body,sig)

        return res.status(result.success?200:400).json(result)
    })
    router.post("/paypal",async (req,res)=>{
        console.log(req.body)
        await paymentServ.confirmPayPal(req.body)
        return res.status(200).send("OK")
    })
}

module.exports = webhooks