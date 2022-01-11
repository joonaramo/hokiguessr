const playerRouter = require('./player');
const goalRouter = require('./goal');
const userRouter = require('./user');
const predictionRouter = require('./prediction');
const authRouter = require('./auth');
const liigaRouter = require('./liiga');
const adminRouter = require('./admin');

const routes = (app) => {
  app.use('/api/players', playerRouter);
  app.use('/api/goals', goalRouter);
  app.use('/api/users', userRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/predictions', predictionRouter);
  app.use('/api/liiga', liigaRouter);
  app.use('/api/admin', adminRouter);
};

module.exports = routes;
