const express = require('express');
const playerController = require('../controllers/player');
const router = express.Router();

router.get('/', playerController.getAll);

module.exports = router;
