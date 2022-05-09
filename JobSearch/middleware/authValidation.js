const jwt = require("jsonwebtoken")
const { jwtSecret } = require("../config")

function authValidation(req,res,next){
    const bearer = req.headers.authorization

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ){
        // const split = bearer.split("Bearer ")

        // const token = split[1]
        const [,token] = bearer.split("Bearer ")

        if(token){
            try{
                const decoded = jwt.verify(token,jwtSecret)

                console.log(decoded)

                req.user = decoded

                return next()
 
            }catch({name,message}){
                return res.status(403).json({
                    error:true,
                    message,
                    type:name
                })
            }
            
        }
    }

    

    return res.status(403).json({
        error:true,
        message:"Insufficient permissions"
    })
}

function adminValidation(req,res,next){
    if(req.user.role==="admin"){
        return next()
    }
}

function authMiddleware(){
    return [authValidation,adminValidation]
}


module.exports = authMiddleware