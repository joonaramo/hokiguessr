const express = require('express').Router();
const router = require('@root/async-router').wrap(express);
const predictionController = require('../controllers/prediction');
const { checkAuth } = require('../utils/middleware');

const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({
  passError: true,
});

const predictionSchema = Joi.object({
  pointsUsed: Joi.number().integer().positive().required(),
  playerId: Joi.number().integer().required(),
  gameId: Joi.number().integer().required(),
});

router.get('/', checkAuth, predictionController.getAllFromUser);
router.post(
  '/',
  checkAuth,
  validator.body(predictionSchema),
  predictionController.create
);
router.patch('/:id', checkAuth, predictionController.update);

module.exports = router;
