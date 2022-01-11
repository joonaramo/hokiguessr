const express = require('express').Router();
const router = require('@root/async-router').wrap(express);
const playerController = require('../controllers/player');

router.get('/', playerController.getAll);
router.get('/:id', playerController.getById);

module.exports = router;
