const AWS = require("aws-sdk")
const { awsBucketName } = require("../config")

const s3 = new AWS.S3()

class Files{
    async download(){
        // Reto
        // s3.getObject()
    }

    async upload(fileName,file){
        try {
            const result = await s3.upload({
                Bucket:awsBucketName,
                Key:fileName,
                Body:file //Buffer
            }).promise()
    
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

    async delete(){
        // 

        // s3.deleteObject()
    }
}

module.exports = Files