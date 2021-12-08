const jwt = require('jsonwebtoken');

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7);
    try {
      const { user } = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
    } catch (err) {
      next(err);
    }
  }
  next();
};

const checkAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

module.exports = {
  tokenExtractor,
  checkAuth,
};
