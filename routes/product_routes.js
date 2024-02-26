const express = require("express");
const router = express.Router();

const productController = require('../controllers/product_controller');


router.get('/:categoryId',  productController.getProductsByCategoryId);
router.get('/details/:id', productController.getProductById);

module.exports = router;