const EventEmitter = require("events")

class Payment extends EventEmitter{
    pay(callback){
        console.log("Iniciando pago...")
        this.emit("inicio")

        callback()
    }
}

const payment = new Payment()

//Escuchando eventos

payment.on("inicio",()=>{
    console.log("Realizando pago, espere...")
})

// Registrando un listener
payment.on("completado",()=>{
    console.log("Pago realizado... Gracias!!")
    console.log("Finalizando pago...")
})

payment.pay(()=>{
    return setTimeout(()=>{
        console.log("LISTO! Gracias por su pago")
        payment.emit("completado")
    },500)
})