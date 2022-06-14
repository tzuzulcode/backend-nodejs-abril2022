const { stripeSecretKey } = require("../config")
const stripe = require("stripe")(stripeSecretKey)

class Payments{
    // Payment session
    async createIntent(amount){
        const intent = await stripe.paymentIntents.create({
            amount,//price
            currency:"usd" // "mxn", "cop", "ars","eur"
        })

        return intent.client_secret
    }
}

module.exports = Payments