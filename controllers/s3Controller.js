require('dotenv').config();
const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_USER_KEY_ID;
const secretAccessKey = process.env.AWS_USER_ACCESS_KEY;

const s3Bucket = new S3({
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

  return s3Bucket.upload(uploadParams).promise();
}

// downloads a file from s3
function getFile(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName
  }

  return s3Bucket.getObject(downloadParams).promise();
}

module.exports = {
    uploadFile,
    getFile,
}