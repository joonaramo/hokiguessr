const express = require('express');
const goalController = require('../controllers/goal');
const router = express.Router();

router.get('/', goalController.getAll);
router.post('/', goalController.create);

module.exports = router;
