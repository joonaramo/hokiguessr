const Redis = require('ioredis');
const redis = new Redis(process.env.REDIS_URL);
const cachePrefix = 'hokiguessr';

const Cache = {};

/**
 * Get data from Redis
 * @param {string} key unique key to find from Redis
 * @returns data from cache in JSON format
 */
Cache.get = async (key) => {
  const data = await redis.get(`${cachePrefix}_${key}`);
  return JSON.parse(data);
};

/**
 * Saves data to Redis to specific key, can be passed an expiration as well
 * @param {string} key unique key to save the data to
 * @param {string} value data to save in JSON format
 * @param {number} ex expiration time in seconds
 * @returns {Promise} Returns promise which resolves to "OK", if succeeded
 */
Cache.set = (key, value, ex) =>
  // If function is given an expiration, assign that to the key
  ex
    ? redis.set(`${cachePrefix}_${key}`, JSON.stringify(value), 'EX', ex)
    : redis.set(`${cachePrefix}_${key}`, JSON.stringify(value));

module.exports = Cache;
