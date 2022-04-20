require("dotenv").config()

const config = {
    env: process.env.NODE_ENV,
    port: process.env.PORT
}

module.exports = config