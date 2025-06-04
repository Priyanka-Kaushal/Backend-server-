// const redis = require('redis');
// const { logger } = require('../logger/index');

// const isDocker = process.env.IS_DOCKER === 'true';
// const redisHost = isDocker ? 'redis' : 'localhost';

// const redisClient = redis.createClient({
//   url: `redis://${redisHost}:6379`,
// });

// redisClient.on('connect', () => {
//   logger.info(`Redis connected at ${redisHost}:6379`);
// });

// redisClient.on('error', (err) => {
//   logger.error('Redis connection error:', err);
// });

// (async () => {
//   try {
//     await redisClient.connect();
//   } catch (err) {
//     logger.error('Redis connection failed:', err);
//   }
// })();

// module.exports = redisClient;
// const redis = require('redis');
// const { logger } = require('../logger/index');
// const isDocker = process.env.IS_DOCKER === 'true';
// const redisHost = isDocker ? 'redis' : 'localhost';

// // Use REDIS_URL from .env directly
// const redisClient = redis.createClient({
//   url: process.env.REDIS_URL || 'redis://localhost:6379',
// });

// redisClient.on('connect', () => {
//   logger.info(`✅ Redis connected: ${process.env.REDIS_URL}`);
// });

// redisClient.on('error', (err) => {
//   logger.error('❌ Redis connection error:', err);
// });

// (async () => {
//   try {
//     await redisClient.connect();
//   } catch (err) {
//     logger.error('❌ Redis connection failed:', err);
//   }
// })();

// module.exports = redisClient;


const redis = require('redis');
const { logger } = require('../logger/index');

const isDocker = process.env.IS_DOCKER === 'true';
const redisHost = isDocker ? 'redis' : 'localhost';
const redisUrl = process.env.REDIS_URL || `redis://${redisHost}:6379`;

const redisClient = redis.createClient({
  url: redisUrl,
});

redisClient.on('connect', () => {
  logger.info(`Redis connected at ${redisUrl}`);
});

redisClient.on('error', (err) => {
  logger.error(' Redis connection error:', err);
});

(async () => {
  try {
    await redisClient.connect();
  } catch (err) {
    logger.error('Redis connection failed:', err);
  }
})();

module.exports = redisClient;

