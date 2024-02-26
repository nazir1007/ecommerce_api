const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Category = require('./category_model');

const Product = sequelize.define('Product', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      availability: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
});

Product.belongsTo(Category, { foreignKey: 'categoryId' });

  (async () => {
    await Product.sync({ alter: true });
  })();

module.exports = Product;
 