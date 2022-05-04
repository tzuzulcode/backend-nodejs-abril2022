const jwt = require("jsonwebtoken")
const { jwtSecret } = require("../config")

class Auth{
    login(data){
        console.log(jwtSecret)
        const token = jwt.sign(data,jwtSecret,{
            expiresIn:'7d'
        })
        return token
    }
}

module.exports = Auth