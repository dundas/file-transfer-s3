const AWS = require('aws-sdk');
const axios = require('axios');
const fs = require('fs');

const s3 = new AWS.S3();

async function downloadFile(url, path) {
  const response = await axios({
    method: 'GET',
    url: url,
    responseType: 'stream',
  });

  const writer = fs.createWriteStream(path);

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

async function uploadFile(bucketName, filePath) {
  const fileStream = fs.createReadStream(filePath);

  const params = {
    Bucket: bucketName,
    Key: filePath,
    Body: fileStream,
  };

  return s3.upload(params).promise();
}

const args = process.argv.slice(2);
const url = args[0];
const bucketName = args[1];
const filePath = args[2];

downloadFile(url, filePath)
  .then(() => uploadFile(bucketName, filePath))
  .then(() => console.log('File downloaded and uploaded successfully'))
  .catch(error => console.error(error));
