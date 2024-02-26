const express = require("express");
const router = express.Router();

const cartController = require('../controllers/cart_controller');
const protectRoute = require("../middleware/protectRoute");

router.post('/', protectRoute, cartController.addCartItem);
router.get('/', protectRoute, cartController.getCartItem);
router.put('/:cartItemId', protectRoute, cartController.updateCartItem);
router.delete('/:cartItemId', protectRoute, cartController.deleteCartItem);

module.exports = router;