const { stripeSecretKey } = require("../config")
const dbError = require("../helpers/dbError")
const UserModel = require("../models/user")
const CartService = require("../services/cart")
const stripe = require("stripe")(stripeSecretKey)
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
            let stripeCustomerID
            try {
                const customer = await stripe.customers.create({
                    name:data.name,
                    email:data.email
                })
                stripeCustomerID = customer.id
                user = await UserModel.create({
                    ...newData,
                    stripeCustomerID
                })
            } catch (error) {
                const customer = await stripe.customers.del(stripeCustomerID)
                if(error.code===11000 && error.keyValue.email){ // Duplicated entry
                    const email = error.keyValue.email
                    const provider = "provider."+data.provider
                    const idProvider = "idProvider."+data.provider
                    user = await UserModel.findOneAndUpdate({
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
        let stripeCustomerID
        try{
            const customer = await stripe.customers.create({
                name:data.name,
                email:data.email
            })
            stripeCustomerID = customer.id
            const user = await UserModel.create({
                ...data,
                stripeCustomerID
            })
            const cartServ = new CartService()
            const cart = await cartServ.create(user.id)
            return {
                created:true,
                user
            }
        }catch(error){
            const customer = await stripe.customers.del(stripeCustomerID)
            return dbError(error)
        }
    }
}

module.exports = User

