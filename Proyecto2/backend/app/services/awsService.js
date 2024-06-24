require('dotenv').config();
const AWS = require('aws-sdk');
const crypto = require('crypto');

// Configurar AWS SDK
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

const uploadImageToS3 = async (buffer) => {
    const base64Image = buffer.toString('base64');

    // Generar nombre de archivo usando crypto
    const fileName = `${generateFileName()}.png`;

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: Buffer.from(base64Image, 'base64'),
        ContentEncoding: 'base64',
        ContentType: 'image/png' // Ajusta esto según el tipo de imagen
    };

    return s3.upload(params).promise();
};

module.exports = {
    uploadImageToS3
};
