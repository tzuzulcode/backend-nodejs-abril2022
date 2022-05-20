function validationError(errors) {
    // let messages = []
    // // for(let error of Object.values(errors)){
    // //     messages.push(error.message)
    // // }

    const messages = Object.values(errors).map(error=>({message:error.message,field:error.path}))

    return messages
}

module.exports = validationError