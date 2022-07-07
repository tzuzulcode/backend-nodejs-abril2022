const multer = require("multer")

const storage = multer.memoryStorage()

const upload = multer({
    storage,
    limits:{
        fieldSize:10000000
    }
})

module.exports = upload