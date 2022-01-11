const jwt = require('jsonwebtoken');

/**
 * Get JWT token from authorization header, verify it and set req.user object
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {NextFunction} next Express next function
 */
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

/**
 * Middleware to check if user is logged in
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {NextFunction} next Express next function
 * @returns unauthorized error or next()
 */
const checkAuth = (req, res, next) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ message: 'Unauthorized', type: 'USER_UNAUTHORIZED_ERROR' });
  }
  next();
};

/**
 * Middleware to check if user is admin
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {NextFunction} next Express next function
 * @returns unauthorized error or next()
 */
const checkAdmin = (req, res, next) => {
  if (!req.user || !req.user.is_admin) {
    return res
      .status(401)
      .json({ message: 'Unauthorized', type: 'USER_UNAUTHORIZED_ERROR' });
  }
  next();
};

/**
 * Error middleware for handling API and DB errors
 * Format:
 *
 *  [
 *    {
 *      message: 'Some error message', // error message
 *      field?: 'username',            // error field name
 *      type: 'string.empty'           // error type
 *    }
 *  ]
 */
const errorHandler = (err, req, res, _next) => {
  if (err && err.error && err.error.isJoi) {
    // we had a joi error, let's return a custom 400 json response
    const errorResponse = err.error.details.map((e) => ({
      message: e.message,
      type: e.type,
      field: e.context.label,
    }));
    return res.status(400).json(errorResponse);
  } else if (err.code) {
    // SQL Error
    return res.status(400).json([
      {
        message: 'Bad Request',
        type: 'BAD_REQUEST_ERROR',
      },
    ]);
  } else {
    // Other error
    return res.status(400).json([
      {
        message: err.message,
        type: err.name,
        field: err.field,
      },
    ]);
  }
};

module.exports = {
  tokenExtractor,
  checkAuth,
  checkAdmin,
  errorHandler,
};
