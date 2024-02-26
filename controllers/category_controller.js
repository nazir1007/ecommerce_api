const Category = require('../models/category_model');

module.exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (error) {
        console.log("Error in getAllCategories Controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};