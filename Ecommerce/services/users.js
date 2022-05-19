const UserModel = require("../models/user")

class User{
    async getByEmail(email){
        try {
            const user = await UserModel.find({email})

            return user
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async create(data){
        try{
            const user = await UserModel.create(data)
            return user
        }catch(error){
            console.log(error)

            return {error}
        }
    }
}

module.exports = User

