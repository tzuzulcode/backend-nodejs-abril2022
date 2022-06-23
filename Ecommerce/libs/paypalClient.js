const paypal = require("@paypal/checkout-server-sdk")
const { development, paypalClientID, paypalClientSecret } = require("../config")

const environment = development ? 
new paypal.core.SandboxEnvironment(paypalClientID,paypalClientSecret):
new paypal.core.LiveEnvironment(paypalClientID,paypalClientSecret)

const client = new paypal.core.PayPalHttpClient(environment)

module.exports = client