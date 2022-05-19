const jwt = require("jsonwebtoken")
const { jwtSecret } = require("../config")

const verifyToken = (req, res, next) => {
    const bearer = req.headers.authorization

    if (!bearer) return res.status(401).json({ error: true, message: 'No token provider' })

    const [, token] = bearer.split(' ')

    try {
        const decoded = jwt.verify(token, jwtSecret)
        req.user = decoded
        return next()
    } catch (error) {
        return res.status(401).json({ failed: true, error })
    }
}

function authValidation(req, res, next){
    const bearer = req.headers.authorization
    if (bearer && bearer.startsWith("Bearer")){
        const [,token] = bearer.split("Bearer ")
        if (token){
            try {
                const decoded = jwt.verify(token, jwtSecret)
                req.user = decoded
                return next()
            } catch ({name, message}) {
                if (name){
                    return res.status(403).json({
                        error: true,
                        type: name,
                        message
                    })
                }
            } 
        }
    }
    return res.status(403).json({
        error: true,
        message: "Permission denied"
    })
}

function adminValidation(req, res, next){
    if(req.user.role === "admin"){
        return next()
    } else{
        return res.status(403).json({
            error: true,
            message: "Permission denied"
        })
    }
}

function applicantValidation(req, res, next){
    if(req.user.role === "applicant"){
        return next()
    } else{
        return res.status(403).json({
            error: true,
            message: "Permission denied"
        })
    }
}

function employerValidation(req, res, next){
    if(req.user.role === "employer"){
        return next()
    } else{
        return res.status(403).json({
            error: true,
            message: "Permission denied"
        })
    }
}

function employerAdminValidation(req, res, next){
    if(req.user.role === "employer" || req.user.role === "admin"){
        return next()
    } else{
        return res.status(403).json({
            error: true,
            message: "Permission denied"
        })
    }
}

function applicantEmployerAdminValidation(req, res, next){
    if(req.user.role === "employer" || req.user.role === "admin" || req.user.role === "applicant"){
        return next()
    } else{
        return res.status(403).json({
            error: true,
            message: "Permission denied"
        })
    }
}


function authMiddleware(type){
    let middlewares
    if(type === "employer"){
        middlewares = [authValidation,employerValidation]
    } else if(type === "employer-admin"){
        middlewares = [authValidation,employerAdminValidation]
    } else if(type === "applicant"){
        middlewares = [authValidation,applicantValidation]
    } else if(type === "admin"){
        middlewares = [authValidation,adminValidation]
    } else if(type === "applicant-employer-admin"){
        middlewares = [authValidation,applicantEmployerAdminValidation]
    } else{
        middlewares = []
    }

    return middlewares
}

module.exports = {authMiddleware,verifyToken}
