const redis = require("redis");
const { logger } = require("../logger/index");

const client = redis.createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

client.on("error", (err) => {
  logger.error("Redis Error:", err);
});

(async () => {
  try {
    await client.connect();
    logger.info("Connected to Redis");
  } catch (err) {
    logger.error("Redis connection failed:", err);
  }
})();

module.exports = client;
