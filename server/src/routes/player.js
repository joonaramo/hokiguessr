const express = require('express');
const playerController = require('../controllers/player');
const router = express.Router();

router.get('/', playerController.getAll);
router.post('/', playerController.create);

module.exports = router;
