const dbError = require("../helpers/dbError")
const UserModel = require("../models/user")
const CartService = require("../services/cart")
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

        const userData = {
            provider:{
                [data.provider]:true
            },
            idProvider:{
                [data.provider]:data.idProvider
            }
        }
        let user = await UserModel.findOne(userData)
        if(!user){
            data.password = uuid.v4()
            const newData ={
                ...data,
                ...userData
            }
            try {
                user = await UserModel.create(newData)
                const cartServ = new CartService()
                const cart = await cartServ.create(user.id)
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

                    // {"$set":{
                    // "userObjects":{
                    //     "$mergeObjects":[
                    //     "$userObjects",
                    //     {"newerItem":"newervalue","newestItem":"newestvalue"}
                    //     ]
                    // }
                    // }}
                    return {
                        created:true,
                        user
                    }
                }

                return dbError(error)
            }
        }
        return {
            created:true,
            user
        }
        
    }

    async create(data){
        try{
            const user = await UserModel.create(data)
            const cartServ = new CartService()
            const cart = await cartServ.create(user.id)
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

