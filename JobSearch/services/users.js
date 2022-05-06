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
    async getByEmail(email){
        try{
            const user = await UserModel.findOne({email})
            // Ya tenemos disponibles los datos

            return user // Objeto
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
            if(error.code===11000){
                const message = `El correo "${error.keyValue.email}" ya está en uso`

                return {
                    error:true,
                    message
                }
            }
            

        }
    }

    async update(id,data){
        try{
            const user = await UserModel.findByIdAndUpdate(id,data,{new:true})
            // Ya tenemos disponibles los datos

            return user // Objeto
        }catch(error){
            console.log(error)
        }
    }

    async delete(id){
        try{
            const user = await UserModel.findByIdAndDelete(id)
            // Ya tenemos disponibles los datos

            return user // Objeto
        }catch(error){
            console.log(error)
        }
    }

}

module.exports = Users