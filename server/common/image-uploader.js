const Multer = require('multer');
const Path = require('path');

const uploadImage = Multer({
    storage: Multer.diskStorage({
        destination: './public',
        filename: (req, file, cb) => {
            return cb(
                null,
                `${Date.now()}_${file.fieldname}${Path.extname(file.originalname)}`
            );
        }
    })
});

module.exports = uploadImage;