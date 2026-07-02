const express = require('express');
const app = express()
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const globalErrorHandler = require('./middlewares/errorMiddleware');
app.use(cors())
app.use(express.json())

app.use('/api/auth',authRoutes)

app.use(globalErrorHandler)
module.exports = app

