import redis, { RedisClient } from 'redis';

const Redis: RedisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD
});

export default Redis;