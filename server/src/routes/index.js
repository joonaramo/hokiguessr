const playerRouter = require('./player');
const goalRouter = require('./goal');
const userRouter = require('./user');

const routes = (app) => {
  app.use('/api/players', playerRouter);
  app.use('/api/goals', goalRouter);
  app.use('/api/users', userRouter);
};

module.exports = routes;
