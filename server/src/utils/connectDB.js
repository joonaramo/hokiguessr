const mysql = require('mysql');

/**
 * Create MySQL connection pool
 * Also add typecasting so tinyints will be converted to booleans in our API.
 */
const connectionPool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  typeCast: function (field, next) {
    if (field.type === 'TINY' && field.length === 1) {
      return field.string() === '1'; // 1 = true, 0 = false
    } else {
      return next();
    }
  },
});

module.exports = connectionPool;
