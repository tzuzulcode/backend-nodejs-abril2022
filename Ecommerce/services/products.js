const { stripeSecretKey } = require("../config")
const { paginate } = require("../libs/pagination")
const ProductModel = require("../models/product")
const stripe = require("stripe")(stripeSecretKey)

// Consultar en la documentación los metodos para crear clientes(customers) y productos(products)

class Products{
    async getAll(limit=20,page=1){
        const products = await paginate("/api/products",limit,page,ProductModel)

        return products
    }
    async create(data){
        const product = await ProductModel.create(data)

        return product
    }
}


module.exports = Products