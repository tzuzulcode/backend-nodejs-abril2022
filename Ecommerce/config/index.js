require("dotenv").config()

console.log(process.env.DB_NAME)

const config = {
    production:process.env.NODE_ENV==="production",
    development:process.env.NODE_ENV==="development",
    port:process.env.PORT,
    sessionSecret:process.env.SESSION_SECRET,
    jwtSecret:process.env.JWT_SECRET,
    dbUsername:process.env.DB_USERNAME,
    dbPassword:process.env.DB_PASSWORD,
    dbHost:process.env.DB_HOST,
    dbName:process.env.DB_NAME,
    stripePublicKey:process.env.STRIPE_PK,
    stripeSecretKey:process.env.STRIPE_SK,
    paypalClientID:process.env.PAYPAL_CLIENT_ID,
    paypalClientSecret:process.env.PAYPAL_CLIENT_SECRET,
    mercadoPagoSecretKey:process.env.MERCADO_PAGO_SK,
    oauthClientID: process.env.OAUTH_CLIENT_ID,
    oauthClientSecret: process.env.OAUTH_CLIENT_SECRET,
    facebookAppID: process.env.FACEBOOK_APP_ID,
    facebookAppSecret: process.env.FACEBOOK_APP_SECRET,
    twitterConsumerID: process.env.TWITTER_CONSUMER_ID,
    twitterConsumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    githubClientID: process.env.GITHUB_CLIENT_ID,
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    callbackURLDev: process.env.CALLBACK_URL_DEVELOPMENT
}


module.exports = config