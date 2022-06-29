const { stripeSecretKey, mercadoPagoSecretKey } = require("../config")
const stripe = require("stripe")(stripeSecretKey)
const mercadopago = require('mercadopago');
mercadopago.configurations.setAccessToken(mercadoPagoSecretKey);
const endpointSecret = "whsec_2d849de04e6aa72abd49bf02b669777334504a448b75a97e166203f8fb714ffe";
const CartModel = require("../models/cart")
const UserModel = require("../models/user")

const paypalClient = require("../libs/paypalClient")
const paypal = require("@paypal/checkout-server-sdk")

class Payments{
    // Payment session
    async createIntent(amount,idUser,stripeCustomerID){
        const intent = await stripe.paymentIntents.create({
            amount,//price
            currency:"usd", // "mxn", "cop", "ars","eur"
            customer:stripeCustomerID
        })

        // consulta para guardar el client_secret

        return intent.client_secret
    }

    async confirm(data,signature){
        let event;
        try {
            event = stripe.webhooks.constructEvent(data, signature, endpointSecret);
        } catch (err) {
            return {success:false,message:`Webhook Error: ${err.message}`}
        }


        switch (event.type) {
            case 'payment_intent.succeeded':
                const paymentIntent = event.data.object;
                console.log(paymentIntent)
                const stripeCustomerID = paymentIntent.customer

                const user = await UserModel.findOne({stripeCustomerID})

                // Realizar con el servicio correspondiente
                const cart = await CartModel.findByIdAndUpdate(user.id,{
                    items:[]
                },{new:true})

                // Then define and call a function to handle the event payment_intent.succeeded
                break;
            // ... handle other event types
            default:
                console.log(`Unhandled event type ${event.type}`);
        }


        return {
            success:true,
            message:"OK"
        }
    }

    async createPayPalOrder(idUser){
        const result = await CartModel.findById(idUser).populate("items._id","name price")
        const total = result.items.reduce((result,item)=>{
            return result+(item._id.price*item.amount)
        },0)
        
        const request = new paypal.orders.OrdersCreateRequest()
        request.headers["Prefer"] = "return=representation"
        request.requestBody({
            intent:"CAPTURE",
            purchase_units:[
                {
                    amount:{
                        currency_code:"USD",
                        value:total
                    }
                }
            ]
        })

        const response = await paypalClient.execute(request)
        if(response.statusCode!==201){
            return {
                success:false,
                message:"An error ocurred"
            }
        }
        // Almacenar orderID
        const user = await UserModel.findByIdAndUpdate(idUser,{
            paypalOrderId:response.result.id
        })
        return {
            success:true,
            orderID: response.result.id
        }
    }

    async confirmPayPal(data){
        console.log(data)
        // switch (data.event_type) {
        //     case 'PAYMENT.CAPTURE.COMPLETED':
        //         const orderID = data.resource.id
                
        //         console.log(data.resource.id)
        //         const user = await UserModel.findOne({paypalOrderId:orderID})
        //         console.log(user)
        //         // Realizar con el servicio correspondiente
        //         const cart = await CartModel.findByIdAndUpdate(user.id,{
        //             items:[]
        //         },{new:true})
        //     break;
        // }
    }

    async createPayment(idUser,email,type){
        const result = await CartModel.findById(idUser).populate("items._id","name price")
        const total = result.items.reduce((result,item)=>{
            return result+(item._id.price*item.amount)
        },0)
        const data = await mercadopago.payment.create({
            transaction_amount: total,
            description: 'Pago de productos',
            payment_method_id: type,
            payer: {
              email: email
            }
        })

        console.log(data)
    }
}

module.exports = Payments