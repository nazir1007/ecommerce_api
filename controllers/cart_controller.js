const Cart = require('../models/cart_model');
const Product = require('../models/product_model');

module.exports.addCartItem = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const product = await Product.findByPk(productId);
        console.log("user found");

        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }
        
        let cartItem = await Cart.findOne({ where: { productId } });
        if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            cartItem = await Cart.create({  productId, quantity });
        }
        res.status(201).json(cartItem);
    } catch (error) {
        console.log("Error in AddCartItem Controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports.getCartItem = async (req, res) => {
    try {
        const cartItems = await Cart.findAll({ include: [{ model: Product }] });
        res.json(cartItems);
    } catch (error) {
        console.log("Error in GetCartItem Controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports.updateCartItem = async (req, res) => {
    try {
        const { cartItemId } = req.params;
        const { quantity } = req.body;

        if (!quantity) {
            return res.status(400).json({ message: 'Quantity is required.' });
        }

        const cartItem = await Cart.findByPk(cartItemId);
        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found.' });
        }
        cartItem.quantity = quantity;
        await cartItem.save();
        res.json(cartItem);
    } catch (error) {
        console.log("Error in UpdateCartItem Controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports.deleteCartItem = async (req, res) => {
    try {
        const { cartItemId } = req.params;
        const cartItem = await Cart.findByPk(cartItemId);
        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found.' });
        }
        await cartItem.destroy();
        res.json({ message: 'Cart item removed successfully.' });
    } catch (error) {
        console.log("Error in DeleteCartItem Controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
