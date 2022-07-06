const jwt = require("jsonwebtoken")
const {jwtSecret} = require("../config/index")


function authValidation(role){
    return (req,res,next)=>{
        req.neededRole = role

        return validateToken(req,res,next)
    }
}

function validateToken(req,res,next){
    const token = req.cookies.token

    if(!token){
        return res.status(403).json({
            success:false,
            message:"A token is required for this process"
        })
    }

    return verifyToken(token,req,res,next)
}

function verifyToken(token,req,res,next){
    try{
        const decoded = jwt.verify(token,jwtSecret)
        delete decoded.iat
        delete decoded.exp
        req.user = decoded

        return validateRole(req,res,next)
    }catch({message,name}){
        return res.status(403).json({
            success:false,
            message,
            type:name
        })
    }
}


function validateRole(req,res,next){
    console.log(req.user)
    if(req.user.role>=req.neededRole){
        return next()
    }

    return res.status(403).json({
        success:false,
        messages:"Insufficient permissions. You need a higher role"
    })
}



module.exports = authValidation
