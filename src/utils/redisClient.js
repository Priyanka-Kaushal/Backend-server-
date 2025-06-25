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


// const redis = require('redis');
// const { logger } = require('../logger/index');

// const isDocker = process.env.IS_DOCKER === 'true';
// const redisHost = isDocker ? 'redis' : 'localhost';
// const redisUrl = process.env.REDIS_URL || `redis://${redisHost}:6379`;

// const redisClient = redis.createClient({
//   url: redisUrl,
// });

// redisClient.on('connect', () => {
//   logger.info(`Redis connected at ${redisUrl}`);
// });

// redisClient.on('error', (err) => {
//   logger.error(' Redis connection error:', err);
// });

// (async () => {
//   try {
//     await redisClient.connect();
//   } catch (err) {
//     logger.error('Redis connection failed:', err);
//   }
// })();

// module.exports = redisClient;




// src/utils/redisClient.js
// require('dotenv').config();          // 1) Load env vars immediately

// const { createClient } = require('redis');
// const { logger } = require('../logger/index');

// const isDocker = process.env.IS_DOCKER === 'true';

// // 2) Determine host & port
// const host = process.env.REDIS_HOST || (isDocker ? 'redis' : 'localhost');
// const port = parseInt(process.env.REDIS_PORT, 10) || 6379;

// // 3) Build URL
// const url = process.env.REDIS_URL || `redis://${host}:${port}`;

// logger.info(`🔌 Connecting to Redis at ${url}`);

// const redisClient = createClient({ url });

// redisClient.on('connect', () => {
//   logger.info('✅ Redis connected');
// });

// redisClient.on('error', (err) => {
//   logger.error('❌ Redis connection error:', err);
// });

// // 4) Immediately start connection
// (async () => {
//   try {
//     await redisClient.connect();
//   } catch (err) {
//     logger.error('⚠️  Redis initial connection failed:', err);
//   }
// })();

// module.exports = redisClient;

// const redis = require('redis');
// const { logger } = require('../logger/index');

// const isDocker = process.env.IS_DOCKER;
// const redisHost = !isDocker ? 'redis' : 'localhost';
// const redisUrl = process.env.REDIS_URL || `redis://localhost:6379`;

// const redisClient = redis.createClient({
//   url: redisUrl,
// });

// redisClient.on('connect', () => {
//   logger.info(`Redis connected at ${redisUrl}`);
// });

// redisClient.on('error', (err) => {
//   logger.error(' Redis connection error:', err);
// });

// (async () => {
//   try {
//     await redisClient.connect();
//   } catch (err) {
//     logger.error('Redis connection failed:', err);
//   }
// })();

// module.exports = redisClient;

// redisClient.js
const redis = require('redis');
const { logger } = require('../logger/index');

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

const redisClient = redis.createClient({ url: redisUrl });

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