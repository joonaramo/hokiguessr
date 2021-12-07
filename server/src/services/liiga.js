/**
 * API Service for Liiga API.
 */

const axios = require('axios');
const Goal = require('../models/Goal');

const BASE_URL = 'https://liiga.fi/api/v1';

// Check if a goal is already added to database
const checkIfGoalExists = async (eventId) => {
  const goal = await Goal.find({ event_id: eventId });
  if (goal.length > 0) {
    return true;
  }
  return false;
};

// Poll current games to check if new goals have been scored
const poll = async () => {
  console.log('polled');
  const { data } = await axios.get(`${BASE_URL}/games/poll`);
  data.games.map((g) => {
    g.homeTeam.goalEvents.map(async (e) => {
      const goalExists = await checkIfGoalExists(e.eventId);
      if (!goalExists) {
        const newGoal = new Goal({
          playerId: e.scorerPlayerId,
          eventId: e.eventId,
          date: new Date(e.logTime),
        });
        await newGoal.save();
      }
    });
  });
};

const liigaService = {
  poll,
};

module.exports = liigaService;
