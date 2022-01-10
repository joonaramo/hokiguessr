const express = require('express').Router();
const router = require('@root/async-router').wrap(express);
const userController = require('../controllers/user');
const { checkAdmin } = require('../utils/middleware');

router.get('/', checkAdmin, userController.getAll);
router.get('/:id', checkAdmin, userController.getById);
router.patch('/:id', checkAdmin, userController.update);
router.delete('/:id', checkAdmin, userController.remove);

module.exports = router;
