const Redlock = require('redlock').default;
const { redis } = require('./cache');

const redlock = new Redlock([redis], { retryCount: 3, retryDelay: 200 });

async function executeWithLock(resourceKey, ttl, task) {
  const lock = await redlock.acquire([resourceKey], ttl);
  try { return await task(); } finally { await lock.release(); }
}
module.exports = { executeWithLock };
