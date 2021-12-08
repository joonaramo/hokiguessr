const express = require('express');
const router = express.Router();
const predictionController = require('../controllers/prediction');
const { checkAuth } = require('../utils/middleware');

router.get('/', checkAuth, predictionController.getAll);
router.post('/', predictionController.create);

module.exports = router;
