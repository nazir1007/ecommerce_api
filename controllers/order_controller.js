const Order = require('../models/order_model');
const Cart = require('../models/cart_model');
const Product = require('../models/product_model');

module.exports.addOrder = async (req, res) => {
    try {
        const cartItems = await Cart.findAll({ include: [{ model: Product }] });
        if (cartItems.length === 0) {
            return res.status(400).json({ message: 'Cart is empty. Add items to cart first.' });
        }

        const order = await Order.create();
        
        await Promise.all(cartItems.map(async (cartItem) => {
            await order.addProduct(cartItem.product, { through: { quantity: cartItem.quantity } });
        }));
        
        await Cart.destroy({ where: {} }); 
        res.status(201).json(order);
    } catch (error) {
        console.log("Error in addOrder Controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports.orderHistory = async (req, res) => {
    try {
        const orders = await Order.findAll({ include: [{ model: Product }] });
        res.status(201).json(orders);
    } catch (error) {
        console.log("Error in orderHistory Controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports.getOrderById = async (req, res) => {
   
    try {       
        const { orderId } = req.params;
        const order = await Order.findByPk(orderId, { include: [{ model: Product }] });
        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }
        res.json(order);
    } catch (error) {
        console.log("Error in getOrderById Controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};