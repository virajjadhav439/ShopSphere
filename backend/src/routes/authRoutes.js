const express = require('express');
const { signup, login, profile } = require('../controllers/authController');
const protect = require('../middlewares/authMiddleware');

const router = new express.Router()

router.get('/me',protect,profile)


router.post('/signup',signup)
router.post('/login',login)


module.exports = router