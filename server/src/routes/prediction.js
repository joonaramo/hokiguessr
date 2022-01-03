const express = require('express');
const router = express.Router();
const predictionController = require('../controllers/prediction');
const { checkAuth } = require('../utils/middleware');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({
  passError: true,
});

const predictionSchema = Joi.object({
  pointsUsed: Joi.number().integer().greater(0).required(),
  playerId: Joi.number().integer().required(),
  gameId: Joi.number().integer().required(),
});

router.get('/', checkAuth, predictionController.getAll);
router.post(
  '/',
  checkAuth,
  validator.body(predictionSchema),
  predictionController.create
);

module.exports = router;
