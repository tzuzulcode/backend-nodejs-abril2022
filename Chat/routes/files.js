const {Router} = require("express")
const FilesService = require("../services/files")
const upload = require("../middleware/upload")
const busboy = require("busboy")

function files(app){
    const router = Router()
    app.use("/api/files",router)

    const filesServ = new FilesService()

    router.get("/:fileName",async (req,res)=>{
        const {fileName} = req.params

        const result = await filesServ.download(fileName)

        if(result.success){
            // readableStream.pipe(req)
            return res.end(result.data.Body)
        }
        
        // reto: descargar archivo mediante streams

        return res.status(400).json(result)
    })
    router.post("/",async (req,res)=>{
        let promise
        const bb = busboy({ headers: req.headers });
        bb.on('file', (name, file, info) => {
            const { filename, encoding, mimeType } = info;
            promise = filesServ.upload(filename,file)
        })

        bb.on('close', async () => {
            console.log('Done parsing form!');
            // res.writeHead(303, { Connection: 'close', Location: '/' });
            const result = await promise
            res.json(result)
        });

        // req: Readable stream
        req.pipe(bb)
        // const result = await filesServ.upload(fileName,file)

        // return res.json(result)
    })
    router.delete("/:fileName",async (req,res)=>{
        const {fileName} = req.params
        console.log(fileName)

        const result = await filesServ.delete(fileName)

        if(result.success){
            return res.json(result)
        }

        return res.status(400).json(result)
    })
}

module.exports = files