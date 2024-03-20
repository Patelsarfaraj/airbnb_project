const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
cloudinary.config({
    cloud_name: process.env.cloudNamee,
    api_key: process.env.APIkey,
    api_secret: process.env.APIsecret
}

);
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'wonderlust',
        allowedFormats: ['png', 'jpg', 'jpeg'] // supports promises as well

    },
});
module.exports = {
    cloudinary, storage
}