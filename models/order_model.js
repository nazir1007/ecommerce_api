const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Cart = require('./cart_model');
const Product = require('./product_model');

const Order = sequelize.define('Order', {

  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending'
  }
});

Order.belongsToMany(Product, { through: 'OrderProduct' });
Product.belongsToMany(Order, { through: 'OrderProduct' });

(async () => {
    await sequelize.sync();
  })();
  

module.exports = Order;
