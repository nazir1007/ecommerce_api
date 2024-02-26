const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Product = require('./product_model'); 

const Cart = sequelize.define('Cart', {
    quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  OrderId: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
});

Cart.belongsTo(Product);

(async () => {
    await Cart.sync({ alter: true });
  })();

module.exports = Cart;