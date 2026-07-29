const express = require('express');
const protect = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/authorize');
const getAdminAnalyticsController = require('../controllers/adminAnalyticsController');

const router = express.Router()

router.get("/",protect,authorize("admin"),getAdminAnalyticsController)

module.exports = router