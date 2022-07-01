const { stripeSecretKey } = require("../config")
const { paginate } = require("../libs/pagination")
const ProductModel = require("../models/product")
const CartModel = require("../models/cart")
const stripe = require("stripe")(stripeSecretKey)

// Consultar en la documentación los metodos para crear clientes(customers) y productos(products)

class Products{
    async getAll(limit=20,page=1){
        const products = await paginate("/api/products",limit,page,ProductModel)

        return products
    }

    async getAllByUser(limit=20,page=1,ownerId){
        console.log(ownerId)
        const products = await paginate("/api/products",limit,page,ProductModel,{owner:ownerId})

        return products
    }

    async getOne(idProduct){
        const product = await ProductModel.findById(idProduct)

        return product
    }

    async create(data){
        const product = await ProductModel.create(data)

        return product
    }

    async delete(id,idUser){
        // const product = await ProductModel.findById(id)
        // if(product.owner===idUser){
        //     await ProductModel.deleteOne({
        //         id:id
        //     })
        // }
        try {
            const product = await ProductModel.findOneAndDelete({
                _id:id,
                owner:idUser
            })
            await CartModel.updateMany({
                $pull:{
                    items:{
                        _id:product.id
                    }
                }
            })

            return {
                success:true,
                product,
                message:"Deleted succesfully"
            }
        } catch (error) {
            console.log(error)
            return {
                success:false,
                message:"An error ocurred. Maybe you are not the owner"
            }
        }
    }
}


module.exports = Products