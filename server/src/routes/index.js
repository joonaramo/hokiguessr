const playerRouter = require('./player');
const goalRouter = require('./goal');
const userRouter = require('./user');
const predictionRouter = require('./prediction');
const authRouter = require('./auth');

const routes = (app) => {
  app.use('/api/players', playerRouter);
  app.use('/api/goals', goalRouter);
  app.use('/api/users', userRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/predictions', predictionRouter);
};

module.exports = routes;
