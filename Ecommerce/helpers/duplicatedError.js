function duplicatedError(error){
    const errors = Object.keys(error).map(field=>({
        [field]:`The ${field} '${error[field]}' is already in use`
    }))

    return errors
}

module.exports = duplicatedError