const express = require('express');
const app = express()
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminOrderRoutes = require('./routes/adminOrderRoutes');
const globalErrorHandler = require('./middlewares/errorMiddleware');
app.use(cors())
app.use(express.json())

app.use('/api/auth',authRoutes)

app.use('/api/products',productRoutes)

app.use('/api/categories',categoryRoutes)

app.use('/api/wishlist',wishlistRoutes)

app.use('/api/cart',cartRoutes)

app.use('/api/order',orderRoutes)

app.use('/api/admin/orders',adminOrderRoutes)

app.use(globalErrorHandler)

module.exports = app

