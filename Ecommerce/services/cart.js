const CartModel = require("../models/cart")
const PaymentsService = require("./payments")

class Cart{

    async getItems(idUser){
        const result = await CartModel.findById(idUser).populate("items._id","name price")

        return result
    }

    async addToCart(idUser,idProduct,amount){
        const result = await CartModel.findByIdAndUpdate(idUser,{
            $push:{
                items:{
                    _id:idProduct,
                    amount
                }
            }
        },{new:true}).populate("items._id","name price")

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

    async pay(idUser){
        const {items} = await this.getItems(idUser)
        console.log(items)
        const total = items.reduce((result,item)=>{
            return result+(item._id.price*item.amount)
        },0)*100

        const paymentsServ = new PaymentsService()
        const clientSecret = await paymentsServ.createIntent(total)
        return {
            success:true,
            clientSecret
        }
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