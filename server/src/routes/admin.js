const express = require('express').Router();
const router = require('@root/async-router').wrap(express);
const predictionController = require('../controllers/prediction');
const userController = require('../controllers/user');
const { checkAdmin } = require('../utils/middleware');

const Joi = require('joi');
const playerController = require('../controllers/player');
const validator = require('express-joi-validation').createValidator({
  passError: true,
});

const playerSchema = Joi.object({
  pointsRatio: Joi.number().required(),
  playerId: Joi.number().integer().required(),
});

// Users
router.get('/users', checkAdmin, userController.getAll);
router.get('/users/:id', checkAdmin, userController.getById);
router.patch('/users/:id', checkAdmin, userController.update);
router.delete('/users/:id', checkAdmin, userController.remove);

// Predictions
router.get('/predictions', checkAdmin, predictionController.getAll);

// Players
router.post(
  '/players',
  checkAdmin,
  validator.body(playerSchema),
  playerController.create
);
router.patch('/players/:id', checkAdmin, playerController.update);
router.delete('/players/:id', checkAdmin, playerController.remove);

module.exports = router;
