const express = require('express').Router();
const router = require('@root/async-router').wrap(express);

const authController = require('../controllers/auth');
const { checkAuth } = require('../utils/middleware');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({
  passError: true,
});

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const signupSchema = Joi.object({
  username: Joi.string().min(3).max(60).required(),
  password: Joi.string().min(8).max(60).required(),
});

router.post('/signup', validator.body(signupSchema), authController.signUp);
router.post('/login', validator.body(loginSchema), authController.logIn);
router.get('/me', checkAuth, authController.getCurrent);

module.exports = router;
