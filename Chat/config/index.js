require("dotenv").config()


const config = {
    development:process.env.NODE_ENV==="development",
    production:process.env.NODE_ENV==="production",
    port:process.env.PORT,
    jwtSecret:process.env.JWT_SECRET,
    dbUsername:process.env.DB_USERNAME, 
    dbPassword:process.env.DB_PASSWORD, 
    dbHost:process.env.DB_HOST, 
    dbName:process.env.DB_NAME,
    awsBucketName:process.env.AWS_BUCKET_NAME
}

module.exports = config