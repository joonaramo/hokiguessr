const express = require('express').Router();
const router = require('@root/async-router').wrap(express);
const playerController = require('../controllers/player');

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
router.get('/:id', playerController.getById);
router.post(
  '/',
  checkAdmin,
  validator.body(playerSchema),
  playerController.create
);
router.patch('/:id', checkAdmin, playerController.update);
router.delete('/:id', checkAdmin, playerController.remove);

module.exports = router;
