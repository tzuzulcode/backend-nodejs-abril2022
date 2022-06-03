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

    async getOrCreateByProvider(data){
        console.log({
            provider:{
                [data.provider]:true
            },
            idProvider:{
                [data.provider]:data.idProvider
            }
        })
        let user = await UserModel.findOne({
            provider:{
                [data.provider]:true
            },
            idProvider:{
                [data.provider]:data.idProvider
            }
        })
        if(user){
            return {
                created:true,
                user
            }
        }
        data.password = uuid.v4()
        const newData ={
            ...data,
            provider:{
                [data.provider]:true
            },
            idProvider:{
                [data.provider]:data.idProvider
            }
        }
        try {
            user = await UserModel.create(newData)

            return {
                created:true,
                user
            }
        } catch (error) {
            if(error.code===11000 && error.keyValue.email){ // Duplicated entry
                const email = error.keyValue.email
                const provider = "provider."+data.provider
                const idProvider = "idProvider."+data.provider
                user = await UserModel.updateOne({
                    email
                },{
                    [provider]:true,
                    [idProvider]:data.idProvider
                },{new:true})

                return {
                    created:true,
                    user
                }
            }

            return dbError(error)
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

