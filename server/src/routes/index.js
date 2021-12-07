const playerRouter = require('./player');
const goalRouter = require('./goal');

const routes = (app) => {
  app.use('/api/players', playerRouter);
  app.use('/api/goals', goalRouter);
};

module.exports = routes;
