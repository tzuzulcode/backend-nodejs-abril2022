require("dotenv").config() // Cargar env variables del archivo .env

const config = {
    port:process.env.PORT
}

module.exports = config