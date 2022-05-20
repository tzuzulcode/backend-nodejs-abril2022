const duplicatedError = require("../helpers/duplicatedError")
const validationError = require("../helpers/validationError")
const UserModel = require("../models/user")

class User{
    async getByEmail(email){
        try {
            const user = await UserModel.findOne({email})

            return user
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async create(data){
        try{
            const user = await UserModel.create(data)
            return {
                created:true,
                user
            }
        }catch(error){
            if(error.code===11000){
                return {
                    created:false,
                    errors:duplicatedError(error.keyValue)
                }
            }

            // Error en la validacion de datos
            return {
                created:false,
                errors:validationError(error.errors)
            }
        }
    }
}

module.exports = User

