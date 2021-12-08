const express = require('express');
const predictionController = require('../controllers/prediction');
const router = express.Router();

router.get('/', predictionController.getAll);
router.post('/', predictionController.create);

module.exports = router;
