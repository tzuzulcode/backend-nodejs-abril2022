const beginChat = document.getElementById("beginChat")
const loginAuth = document.getElementById("loginAuth")
const sendForm = document.getElementById("sendMessage")
let socket

const connectSocket = ()=>{
    socket = io.connect("http://localhost:4000",{
        withCredentials:true
    })

    socket.emit("user_connected")

    socket.on("user_connected",(users)=>{
        console.log(users)
    
    })
    socket.on("user_disconnected",(users)=>{
        console.log(users)
    })
    socket.on("received_message",(data)=>{
        console.log(data)
    })
    socket.on("sended_message",(data)=>{
        console.log(data)
    })

    socket.on("messages",(messages)=>{
        console.log(messages)
    })
}

fetch("http://localhost:4000/api/auth/validate",{
    credentials:"include"
})
.then(response=>{
    if(response.ok){
        return response.json()
    }

    throw new Error("Not allowed")
})
.then(data=>{
    connectSocket()
})
.catch(error=>{
    console.log(error)
    alert("Debes iniciar sesión")
})

sendForm.onsubmit = (event)=>{
    event.preventDefault()
    const {message} = event.target

    socket.emit("send_message",message.value)
}

loginAuth.onsubmit = (event)=>{
    event.preventDefault()
    const {email,password} = event.target
    fetch("http://localhost:4000/api/auth/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email:email.value,
            password:password.value
        }),
        credentials:"include"
    })
    .then(response=>{
        if(response.ok){
            return response.json()
        }else{
            throw new Error("Credenciales incorrectas")
        }
    })
    .then(data=>{
        connectSocket()
    }).catch(error=>{
        alert(error.message)
    })
}

beginChat.onsubmit = (event)=>{
    event.preventDefault()

    const idChat = event.target.idChat.value

    socket.emit("begin_chat",idChat)
}