const { stripeSecretKey } = require("../config")
const ProductModel = require("../models/product")
const stripe = require("stripe")(stripeSecretKey)

// Consultar en la documentación los metodos para crear clientes(customers) y productos(products)

class Products{
    async getAll(limit=20,page=1){
        const total = await ProductModel.count()
        const totalPages = Math.ceil(total / limit)
        if(page>totalPages || page<1){
            return {
                success:false,
                message:"Page not found"
            }
        }

        const skip = (page-1)*limit
        
        const products = await ProductModel.find().skip(skip).limit(limit)

        const nextPage = page===totalPages ? null: limit===20?`/api/products?page=${page+1}`:`/api/products?page=${page+1}&limit=${limit}`
        const prevPage = page===1 ? null : limit===20?`/api/products?page=${page-1}`:`/api/products?page=${page-1}&limit=${limit}`

        return {
            success:true,
            data:products,
            total,
            page,
            prevPage,
            nextPage,
            totalPages
        }
    }
    async create(data){
        const product = await ProductModel.create(data)

        return product
    }
}


module.exports = Products