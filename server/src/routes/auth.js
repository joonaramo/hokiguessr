const express = require('express');
const authController = require('../controllers/auth');
const { checkAuth } = require('../utils/middleware');
const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/login', authController.logIn);
router.get('/me', checkAuth, authController.getCurrent);

module.exports = router;
