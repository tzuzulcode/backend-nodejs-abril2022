const UserModel = require("../models/user")

class Users{
    async getAll(){
        try{
            const users = await UserModel.find()
            // Ya tenemos disponubles los datos

            return users // Array de objetos
        }catch(error){
            console.log(error)
        }
    }

    async create(data){
        try{
            const user = await UserModel.create(data)
            // Ya tenemos disponibles los datos

            return user // Objeto
        }catch(error){
            console.log(error)
        }
    }
}

module.exports = Users