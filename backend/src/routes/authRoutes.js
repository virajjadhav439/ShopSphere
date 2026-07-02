const express = require('express');
const { signup, login, profile } = require('../controllers/authController');
const protect = require('../middlewares/authMiddleware');
const { signupValidator, loginValidator } = require('../validations/authValidator');
const validate = require('../middlewares/validate');

const router = new express.Router()

router.get('/me',protect,profile)


router.post('/signup',signupValidator,validate,signup)
router.post('/login',loginValidator,validate,login)


module.exports = router