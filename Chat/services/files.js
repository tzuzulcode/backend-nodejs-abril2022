const AWS = require("aws-sdk")
const { awsBucketName } = require("../config")
const uuid = require("uuid")
const path = require("path")
const {PassThrough} = require("stream")

const s3 = new AWS.S3()

class Files{
    async download(fileName){
        // Reto
        // s3.getObject()
        try {
            // Download: By buffer
            // const result = await s3.getObject({
            //     Key:fileName,
            //     Bucket:awsBucketName,
            // })

            // By stream
            const result = s3.getObject({
                Key:fileName,
                Bucket:awsBucketName,
            }).createReadStream()

            return {
                success:true,
                message:"File downloaded successfully",
                data:result
            }

        } catch (error) {
            console.log(error)
            return {success:false,message:"An error ocurred"}
        }
    }

    async upload(fileName,file){
        try {
            console.log(file)
            const ext = path.extname(fileName)
            const Key = uuid.v4()+ext
            // const passStream = new PassThrough()

            const result = await s3.upload({
                Bucket:awsBucketName,
                Key,
                Body:file //Buffer o stream
            }).promise()

            console.log(result)

            // Registrar en la BD el archivo
    
            return {
                success:true,
                message:"File uploaded successfully",
                key:result.Key,
                location: result.Location
            }
        } catch (error) {
            console.log(error)
            return {success:false,message:"An error ocurred"}
        }
    }

    async delete(fileName){
        try {
            const result = await s3.deleteObject({
                Key:fileName,
                Bucket:awsBucketName
            }).promise()
    
            return {
                success:true,
                message:"File deleted successfully",
                key:fileName
            }
        } catch (error) {
            console.log(error)
            return {
                success:false,
                message:"An error ocurred",
                key:fileName
            }
        }
    }
}

module.exports = Files