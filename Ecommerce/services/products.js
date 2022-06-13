const { stripeSecretKey } = require("../config")
const ProductModel = require("../models/product")
const stripe = require("stripe")(stripeSecretKey)

// Consultar en la documentación los metodos para crear clientes(customers) y productos(products)

class Products{
    async getAll(){
        const products = await ProductModel.find()

        return products
    }
    async create(data){
        const product = await ProductModel.create(data)

        return product
    }
}


module.exports = Products