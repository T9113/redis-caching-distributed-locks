const Redis = require('ioredis');
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

async function getOrSetCache(key, cb, ttl = 300) {
  const data = await redis.get(key);
  if (data) return JSON.parse(data);
  const fresh = await cb();
  await redis.setex(key, ttl, JSON.stringify(fresh));
  return fresh;
}
module.exports = { redis, getOrSetCache };
