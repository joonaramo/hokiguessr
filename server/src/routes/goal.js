const express = require('express').Router();
const router = require('@root/async-router').wrap(express);
const goalController = require('../controllers/goal');

router.get('/', goalController.getAll);
router.post('/', goalController.create);

module.exports = router;
