const socket = io.connect("http://localhost:4000")

const login = document.getElementById("login")


login.onsubmit = (event)=>{
    event.preventDefault()

    const {username} = event.target

    console.log(username.value)

    socket.emit("active",username.value)
}

socket.on("user connected",(users)=>{
    console.log(users)
})