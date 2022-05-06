const jwt = require("jsonwebtoken")
const { jwtSecret } = require("../config")

function authValidation(req,res,next){
    const bearer = req.headers.authorization

    // const split = bearer.split("Bearer ")

    // const token = split[1]
    const [,token] = bearer.split("Bearer ")

    if(token){
        const decoded = jwt.verify(token,jwtSecret)

        console.log(decoded)

        return next()
    }

    return res.status(403).json({
        error:true,
        message:"Permisos insuficientes"
    })
}

module.exports = authValidation