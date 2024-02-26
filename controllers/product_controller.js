const Product = require('../models/product_model');

module.exports.getProductsByCategoryId = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const products = await Product.findAll({ where: { categoryId } });

        res.json(products);
    } catch (error) {
        console.log("Error in GetCategoryById Controller:", error.message);
        res.status(500).json({error : "Internal Server error"})
    }
};

module.exports.getProductById = async (req, res) => { 
    try {
        const productId = req.params.id;
        const product = await Product.findByPk(productId);

        if (!product) {
           return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        console.log("Error in GetProductById Controller:", error.message);
        res.status(500).json({error : "Internal Server error"})
    }
};
