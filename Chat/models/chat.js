const {mongoose} = require("../config/db")

const MessageSchema = new mongoose.Schema({
    idSender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    content:String,
    read:{
        type:Boolean,
        default:false
    },
    isFile:Boolean
},{
    timestamps:true
})

const ChatSchema = new mongoose.Schema({
    idUserOne:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    idUserTwo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    messages:[MessageSchema]
})


const ChatModel = mongoose.model("message",ChatSchema)

module.exports = ChatModel