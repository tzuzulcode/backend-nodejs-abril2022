const socket = io.connect("http://localhost:4000")

const login = document.getElementById("login")
const sendForm = document.getElementById("sendMessage")

sendForm.onsubmit = (event)=>{
    event.preventDefault()
    const {message,idSocket} = event.target

    socket.emit("send_message",idSocket.value,message.value)
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