const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../public/img'))
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  })
const upload = multer({
    storage: storage,
    limits: 1000000,
    fileFilter(req,file,cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error("Please upload image"));
        }
        cb(undefined,true);
    }
});

const uploadImgVideo = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5MB in bytes
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|mp4|mov|avi)$/)) {
      return cb(new Error("Please upload an image or video file"));
    }
    cb(undefined, true);
  }
});

module.exports = {upload,uploadImgVideo};