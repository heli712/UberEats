require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

const bucketName = "imagesmenu12"
const region = "us-east-1"
const accessKeyId = "AKIAQT5AZDLB5XMEYRWN"
const secretAccessKey = "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"

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})

// uploads a file to s3
function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path)

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename
  }
  return s3.upload(uploadParams).promise()
}
exports.uploadFile = uploadFile


// downloads a file from s3
function getFileStream(fileKey) {
    console.log("Inside the function")
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName
    }
  return s3.getObject(downloadParams).createReadStream()
}
exports.getFileStream = getFileStream;