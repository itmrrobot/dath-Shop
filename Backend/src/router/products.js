const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const {upload} = require('../common/upload');
// const path = require('path');
// const multer = require('multer');
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, path.join(__dirname,'../public/img'))
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname);
//     }
//   })
// const upload = multer({
//     storage: storage,
//     limits: 1000000,
//     fileFilter(req,file,cb) {
//         if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
//             return cb(new Error("Please upload image"));
//         }
//         cb(undefined,true);
//     }
// });

router.get('/products',productsController.handleGetProductList)
.get('/products/:id',productsController.handleGetProductById)
.post('/products/create',upload.array('img',4),productsController.handleCreateNewProduct)
.put('/products/update/:id',upload.array('img',4),productsController.handleUpdateProduct)
.delete('/products/delete/:id',productsController.handleDeleteProduct)

module.exports = router;