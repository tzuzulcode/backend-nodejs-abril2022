const dbError = require("../helpers/dbError")
const UserModel = require("../models/user")

class User{

    async getAll(){
        const users = await UserModel.find()

        return users
    }

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
            return dbError(error)
        }
    }
}

module.exports = User

