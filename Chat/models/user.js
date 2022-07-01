const {mongoose} = require("../config/db")

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true,"El nombre es requerido"],
        minlength:[3,"No menor a 3 caracteres"],
        maxlength:[100,"No mayor a 100 caracteres"],
        trim:true
    },
    email:{
        type:String,
        required:[true,"El email es requerido"],
        trim:true,
        unique:[true,"Email ya registrado"],
        match:[/^[\w\.-]+@[\w]+\.[\.\w]+$/,"Email no valido"]
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    profilePic:String,
    role:{
        type:Number,
        default:1
    }
})

const UserModel = mongoose.model("user",userSchema)

module.exports = UserModel