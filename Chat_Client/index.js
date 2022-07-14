const socket = io.connect("http://localhost:4000",{
    withCredentials:true
})

const login = document.getElementById("login")
const loginAuth = document.getElementById("loginAuth")
const sendForm = document.getElementById("sendMessage")

sendForm.onsubmit = (event)=>{
    event.preventDefault()
    const {message,idSocket} = event.target

    socket.emit("send_message",idSocket.value,message.value)
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
    .then(result=>result.json())
    .then(data=>{
        console.log(data)
    })
}

login.onsubmit = (event)=>{
    event.preventDefault()

    const {username} = event.target

    console.log(username.value)

    socket.emit("user_connected",username.value)
}



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