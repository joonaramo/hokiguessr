const express = require('express').Router();
const router = require('@root/async-router').wrap(express);
const userController = require('../controllers/user');
const { checkAdmin } = require('../utils/middleware');

router.get('/', checkAdmin, userController.getAll);

module.exports = router;
