const express = require('express').Router();
const router = require('@root/async-router').wrap(express);
const liigaController = require('../controllers/liiga');

router.get('/players', liigaController.getPlayers);
router.get('/teams', liigaController.getTeams);
router.get('/games/live', liigaController.getLiveGames);
router.get('/games', liigaController.getGames);
router.get('/games/:season/:gameId', liigaController.getGame);

module.exports = router;
