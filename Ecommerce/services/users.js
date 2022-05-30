const dbError = require("../helpers/dbError")
const UserModel = require("../models/user")
const uuid = require("uuid")

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

    async getOrCreate(data){
        const user = await UserModel.findOne({provider:data.provider,idProvider:data.idProvider})
        if(user){
            return user
        }
        data.password = uuid.v4()
        return await UserModel.create(data)
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

