function duplicatedError(error){
    const errors = Object.keys(error).map(field=>({
        message:`The ${field} '${error[field]}' is already in use`,
        field
    }))

    return errors
}

module.exports = duplicatedError