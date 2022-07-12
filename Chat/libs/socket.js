const socket = require("socket.io")

function connection(server){
    const io = socket(server,{
        cors:{
            origin:["http://localhost:5500","http://127.0.0.1:5500"],
            credentials:true,
            methods:["GET","POST"]
        }
    })

    return io
}

module.exports = connection