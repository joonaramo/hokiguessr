const playerRouter = require('./player');

const routes = (app) => {
  app.use('/api/players', playerRouter);
};

module.exports = routes;
