/**
 * API Service for Liiga API.
 */

const axios = require('axios');
const Goal = require('../models/Goal');
const Prediction = require('../models/Prediction');
const User = require('../models/User');
const Cache = require('../utils/cache');

const BASE_URL = 'https://liiga.fi/api/v1';
const USE_MOCK_DATA = false;
const mockData = require('./mockData');

/**
 * Get all players
 * @returns {array} All players from Liiga
 */
const getPlayers = async (teamId) => {
  // Try getting data from cachee
  const cacheKey = teamId ? `players-${teamId}` : 'players';
  const players = await Cache.get(cacheKey);

  // If cache contains data, return it
  if (players) return players;

  // No data is cached, make a request
  let { data } = await axios.get(
    `${BASE_URL}/players/info?season=2021&tournament=runkosarja`
  );

  // If teamId is given, filter players by team
  if (teamId) {
    data = data.filter((player) => player.teamId.includes(teamId));
  }

  // Set data to cache and return it
  await Cache.set(cacheKey, data, 60 * 60 * 24); // expires in one day
  return data;
};

/**
 * Get all teams
 * @returns {array} All teams from Liiga
 */
const getTeams = async () => {
  // Try getting data from cache
  const cacheKey = 'teams';
  const teams = await Cache.get(cacheKey);

  // If cache contains data, return it
  if (teams) return teams;

  // No data is cached, make a request
  const { data } = await axios.get(`${BASE_URL}/teams/info`);

  let teamsData = Object.values(data.teams);

  teamsData = teamsData.map((team) => ({
    id: team.id,
    name: team.name,
    slug: team.slug,
  }));

  // Set data to cache and return it
  await Cache.set(cacheKey, teamsData, 60 * 60 * 24 * 7); // expires in one week
  return teamsData;
};

/**
 * Get all games that are currently live
 * @returns {array} Live games
 */
const getLiveGames = async () => {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return mockData.liveGames.games;
  }
  const { data } = await axios.get(
    `${BASE_URL}/games/poll/?tournament=runkosarja`
  );
  return data.games;
};

/**
 * Get all games from Liiga
 * @returns {array} All games from Liiga on specific season
 */
const getGames = async () => {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return mockData.upcomingGames;
  }
  const { data } = await axios.get(
    `${BASE_URL}/games?tournament=runkosarja&season=2022`
  );
  return data;
};

/**
 * Get a single game from Liiga API
 * @param {number} season - Season the game is played on
 * @param {number} gameId - Game ID on Liiga API
 * @returns {object} Single game object
 */
const getGame = async (season = 2022, gameId) => {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return mockData.singleGame;
  }
  const { data } = await axios.get(`${BASE_URL}/games/${season}/${gameId}`);
  return data;
};

/**
 * A function that checks if goal already exists on the database
 * so there won't be duplicate entries
 * @param {number} eventId - Represent's each goal's ID
 * @returns {boolean} true if goal exists, false if not
 */
const checkIfGoalExists = async (eventId) => {
  const goal = await Goal.findOne({ event_id: eventId });
  if (goal) {
    return true;
  }
  return false;
};

/**
 * A function for handling predictions when someone scores a goal
 * @param {object} goalEvent - Goal's data
 */
const handleGoalEvent = async (goalEvent) => {
  if (!goalEvent.goalTypes.includes('VL')) {
    // If goal already exists in database, don't do anything
    const goalExists = await checkIfGoalExists(goalEvent.eventId);
    if (goalExists) {
      return;
    }

    // If goal is not in database, make new goal entry and check which predictions
    // have that goal scorer
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
      if (!prediction.completed) {
        prediction.completed_at = new Date(goalEvent.logTime);
        prediction.completed = 1;
        prediction.correct = 1;
        await prediction.save();
        const user_id = prediction.user_id;
        const user = await User.findById(user_id);
        user.points =
          user.points + prediction.points_used * prediction.points_ratio;
        await user.save();
      }
    });
  }
};

/**
 * Poll current games to check if new goals have been scored
 * and if prediction states need to be changed
 */
const poll = async () => {
  const games = await getLiveGames();
  if (games.length > 0) {
    games.map(async (g) => {
      // Handle goal events from both teams
      g.homeTeam?.goalEvents?.map(async (goalEvent) => {
        await handleGoalEvent(goalEvent);
      });
      g.awayTeam?.goalEvents?.map(async (goalEvent) => {
        await handleGoalEvent(goalEvent);
      });
      // If game state is ended, make all incomplete predictions for that game completed
      if (g.ended) {
        const predictions = await Prediction.find({
          game_id: g.id,
          completed: 0,
        });
        predictions.forEach(async (prediction) => {
          prediction.completed = 1;
          prediction.completed_at = new Date(Date.now());
          await prediction.save();
        });
      }
    });
  }
};

const liigaService = {
  poll,
  getPlayers,
  getTeams,
  getLiveGames,
  getGame,
  getGames,
};

module.exports = liigaService;
