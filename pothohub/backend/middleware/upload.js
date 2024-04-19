require("dotenv").config();
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
var randomstring = require("randomstring");

const imageFilter = (req, file, cb) => {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      // Create an error message to be returned in case validation fails
      req.fileValidationError = 'Invalid image format. Only jpeg, jpg, png and gif images are allowed.';
      return cb(new Error('Invalid image format'), false);
    }
    cb(null, true);
  };

const storage = new GridFsStorage({
    url: process.env.DB_URL,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpeg"];

        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${randomstring.generate(7)}-${Date.now()}-ph-${file.originalname}`;
            return filename;
        }

        return {
            bucketName: "photos",
            filename: `${randomstring.generate(7)}-${Date.now()}-ph-${file.originalname.replace(/\s/g, '')}`,
            customfield:'test',
        };
    },
});

module.exports = multer({ storage, fileFilter: imageFilter });