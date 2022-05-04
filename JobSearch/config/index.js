require("dotenv").config() // Cargar env variables del archivo .env

const config = {
    port:process.env.PORT,
    jwtSecret:process.env.JWT_SECRET,
    dbUsername:process.env.DB_USERNAME,
    dbPassword:process.env.DB_PASSWORD,
    dbHost:process.env.DB_HOST,
    dbName:process.env.DB_NAME,
}

module.exports = config