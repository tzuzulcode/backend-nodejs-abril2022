const {mongoose} = require("../config/db")

const Schema = mongoose.Schema


const userSchema = new Schema({
    name:String,
    email:{
        type:String,
        unique:true
    },
    password:String,
})

const UserModel = mongoose.model("User",userSchema)

module.exports = UserModel