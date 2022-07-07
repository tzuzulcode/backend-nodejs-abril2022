const {Router} = require("express")
const FilesService = require("../services/files")
const upload = require("../middleware/upload")

function files(app){
    const router = Router()
    app.use("/api/files",router)

    const filesServ = new FilesService()

    router.post("/upload",upload.single("file"),async (req,res)=>{
        const file = req.file.buffer
        const fileName = req.file.originalname

        const result = await filesServ.upload(fileName,file)

        return res.json(result)
    })
}

module.exports = files