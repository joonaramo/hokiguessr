const express = require('express');
const playerController = require('../controllers/player');
const router = express.Router();

const Joi = require('joi');
const { checkAdmin } = require('../utils/middleware');
const validator = require('express-joi-validation').createValidator({
  passError: true,
});

const playerSchema = Joi.object({
  pointsRatio: Joi.number().required(),
  playerId: Joi.number().integer().required(),
});

router.get('/', playerController.getAll);
router.post(
  '/',
  checkAdmin,
  validator.body(playerSchema),
  playerController.create
);

module.exports = router;
