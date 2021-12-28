const express = require('express');
const liigaController = require('../controllers/liiga');
const router = express.Router();

router.get('/players', liigaController.getPlayers);
router.get('/teams', liigaController.getTeams);
router.get('/games/live', liigaController.getLiveGames);

module.exports = router;
