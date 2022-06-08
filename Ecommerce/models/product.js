const {mongoose} = require("../config/db")

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required"],
    },
    description:{
        type:String,
        required:[true,"description"]
    },
    price:{
        type:Number,
        required:[true,"price is required"]
    },
    image:{
        type:[String],
        required:[true,"image is required"]
    },
    stock:{
        type:Number,
        required:[true,"stock is required"]
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
})

const ProductModel = mongoose.model("product",productSchema)

module.exports = ProductModel