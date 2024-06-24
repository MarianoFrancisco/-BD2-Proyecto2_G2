const multer = require('multer');
const path = require('path');

// Configurar multer para manejar la subida de archivos
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
        return cb(null, true);
    }
    cb(new Error("Error: File upload only supports the following filetypes - " + filetypes));
};

const upload = multer({
    storage,
    limits: { fileSize: 3 * 1024 * 1024 }, // Limitar a 3MB
    fileFilter: fileFilter
});

module.exports = {
    upload
};
