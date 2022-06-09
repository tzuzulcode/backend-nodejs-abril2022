const CartModel = require("../models/cart")

class Cart{

    async getItems(idUser){
        const result = await CartModel.findById(idUser)

        return result.items
    }

    async addToCart(idUser,idProduct,amount){
        const result = await CartModel.findByIdAndUpdate(idUser,{
            $push:{
                items:{
                    _id:idProduct,
                    amount
                }
            }
        },{new:true}).populate("items._id")

        return result
    }

    async removeFromCart(idUser,idProduct){
        const result = await CartModel.findByIdAndUpdate(idUser,{
            $pull:{
                items:{
                    _id:idProduct
                }
            }
        },{new:true})

        return result
    }

    async create(idUser){
        const cart = await CartModel.create({
            _id:idUser,
            items:[]
        })

        return cart
    }


}

module.exports = Cart