const CartModel = require("../models/cart")
const UserModel = require("../models/user")
const PaymentsService = require("./payments")

class Cart{

    async getItems(idUser){
        const result = await CartModel.findById(idUser).populate("items._id","name price images")
        console.log(result)
        const products = result.items.map(product=>{
            return {
                ...product._id?._doc,
                amount:product.amount
            }
        })
        return products
    }

    async addToCart(idUser,idProduct,amount){
        const result = await CartModel.findByIdAndUpdate(idUser,{
            $push:{
                items:{
                    _id:idProduct,
                    amount
                }
            }
        },{new:true}).populate("items._id","name price images")
        const products = result.items.map(product=>{
            return {
                ...product._id?._doc,
                amount:product.amount
            }
        })
        return products
    }

    async removeFromCart(idUser,idProduct){
        const result = await CartModel.findByIdAndUpdate(idUser,{
            $pull:{
                items:{
                    _id:idProduct
                }
            }
        },{new:true}).populate("items._id","name price images")
        const products = result.items.map(product=>{
            return {
                ...product._id?._doc,
                amount:product.amount
            }
        })
        return products
    }

    async pay(idUser,stripeCustomerID){
        const result = await this.getItems(idUser)
        if(result){
            const total = result.reduce((result,item)=>{
                return result+(item.price*item.amount)
            },0)*100

            if(total>0){
                const paymentsServ = new PaymentsService()
                const clientSecret = await paymentsServ.createIntent(total,idUser,stripeCustomerID)
                return {
                    success:true,
                    clientSecret
                }
            }else{
                return {
                    success:false,
                    message:"Tu cuenta debe ser mayor a 0"
                }
            }
    
            
        }else{
            return {
                success:false,
                message:"Ocurrió un error"
            }
        }
        
    }

    async create(idUser){
        const cart = await CartModel.create({
            _id:idUser,
            items:[]
        })

        return cart
    }

    async changeAmount(idUser,idProduct,amount){
        const result = await CartModel.findOneAndUpdate({_id: idUser},
        {$set: {"items.$[el].amount": amount } },
        { 
          arrayFilters: [{ "el._id": idProduct}],
          new: true
        }).populate("items._id","name price images")

        const products = result.items.map(product=>{
            return {
                ...product._id?._doc,
                amount:product.amount
            }
        })

        return products
    }

    // async clearCart(idUser){
    //     const cart = await CartModel.findByIdAndUpdate(idUser,{
    //         items:[]
    //     },{new:true})

    //     return cart
    // }
    async clearCart(stripeCustomerID){
        const user = await UserModel.findOne({stripeCustomerID})
        const cart = await CartModel.findByIdAndUpdate(user.id,{
            items:[]
        },{new:true})

        return cart
    }


}

module.exports = Cart