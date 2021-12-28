/**
 * API Service for Liiga API.
 */

const axios = require('axios');
const Goal = require('../models/Goal');
const Prediction = require('../models/Prediction');
const User = require('../models/User');

const BASE_URL = 'https://liiga.fi/api/v1';
const mockData = require('./mockData');

// Check if a goal is already added to database
const checkIfGoalExists = async (eventId) => {
  const goal = await Goal.find({ event_id: eventId });
  if (goal.length > 0) {
    return true;
  }
  return false;
};

const handleGoalEvent = async (goalEvent) => {
  if (!goalEvent.goalTypes.includes('VL')) {
    const goalExists = await checkIfGoalExists(goalEvent.eventId);
    if (!goalExists) {
      const newGoal = new Goal({
        player_id: goalEvent.scorerPlayerId,
        event_id: goalEvent.eventId,
        date: new Date(goalEvent.logTime),
      });
      await newGoal.save();
      const predictions = await Prediction.find({
        player_id: goalEvent.scorerPlayerId,
      });
      predictions.forEach(async (prediction) => {
        prediction.completed_at = new Date(goalEvent.logTime);
        prediction.completed = 1;
        prediction.correct = 1;
        await prediction.save();
        const user_id = prediction.user_id;
        const user = await User.findById(user_id);
        user.points =
          user.points + prediction.points_used * prediction.points_ratio;
        await user.save();
      });
    }
  }
};

/**
 * Get all players
 * @returns {array} All players from Liiga
 */
const getPlayers = async (teamId) => {
  const { data } = await axios.get(
    `${BASE_URL}/players/info?season=2021&tournament=runkosarja`
  );
  return teamId
    ? data.filter((player) => player.teamId.includes(teamId))
    : data;
};

/**
 * Get all teams
 * @returns {array} All teams from Liiga
 */
const getTeams = async () => {
  const { data } = await axios.get(`${BASE_URL}/teams/info`);
  return data.teams;
};

const getLiveGames = async () => {
  const { data } = await axios.get(
    `${BASE_URL}/games/poll/?tournament=runkosarja`
  );
  return data.games;
};

/**
 * Poll current games to check if new goals have been scored
 */
const poll = async () => {
  console.log('polled');
  // const { data } = await axios.get(`${BASE_URL}/games/poll`);
  const data = mockData;
  if (data.games.length > 0) {
    data.games.map((g) => {
      g.homeTeam.goalEvents &&
        g.homeTeam.goalEvents.map(async (goalEvent) => {
          await handleGoalEvent(goalEvent);
        });
      g.awayTeam.goalEvents &&
        g.awayTeam.goalEvents.map(async (goalEvent) => {
          await handleGoalEvent(goalEvent);
        });
    });
  }
};

const liigaService = {
  poll,
  getPlayers,
  getTeams,
  getLiveGames,
};

module.exports = liigaService;
