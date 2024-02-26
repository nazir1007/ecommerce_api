const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv")
const app = express();
const PORT = process.env.PORT || 3000;

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');

const userRoutes = require('./routes/user_routes');
const productRoutes = require('./routes/product_routes');
const categoryRoutes = require('./routes/category_routes')
const cartRoutes = require('./routes/cart_routes');
const orderRoutes = require('./routes/order_routes');

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/cart', cartRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});