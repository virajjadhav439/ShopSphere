const express = require('express');
const app = express()
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const globalErrorHandler = require('./middlewares/errorMiddleware');
app.use(cors())
app.use(express.json())

app.use('/api/auth',authRoutes)

app.use('/api/products',productRoutes)

app.use('/api/categories',categoryRoutes)

app.use(globalErrorHandler)

module.exports = app

