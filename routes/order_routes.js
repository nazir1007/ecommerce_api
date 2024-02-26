const express = require("express");
const router = express.Router();

const orderController = require('../controllers/order_controller');
const protectRoute = require('../middleware/protectRoute')


router.post('/', protectRoute, orderController.addOrder);
router.get('/', protectRoute, orderController.orderHistory);
router.get('/:orderId', protectRoute, orderController.getOrderById);



module.exports = router;