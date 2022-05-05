const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { jwtSecret } = require("../config")
const User = require("./users")

class Auth{
    login(data){
        return this.#createToken(data)
    }

    async signup(data){
        if(data.password){
            data.password = await this.#encrypt(data.password)
        }
        const userServ = new User()
        const user = await userServ.create(data)
        if(user.error){
            return user
        }

        const userData = {
            name:user.name,
            email:user.email,
            id:user.id
        }

        const token = this.#createToken(userData)
        return {
            user:userData,
            token
        }

    }

    #createToken(payload){
        const token = jwt.sign(payload,jwtSecret,{
            expiresIn:'7d'
        })
        return token
    }

    async #encrypt(string){
        try{
            const salt = await bcrypt.genSalt()
            const hash = await bcrypt.hash(string,salt)

            return hash
        }catch(error){
            console.log(error)
        }
    }
}

module.exports = Auth