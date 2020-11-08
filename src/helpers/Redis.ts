import redis, { RedisClient } from 'redis';

let Redis:RedisClient = redis.createClient({
    host: 'web-1.fra-de.voxtl.com',
    password: 'cCphPDBpasnphATQzbYP24WobuU4sPLb9jtszxUdtmisC6GL2QfxSAJhKAs9sjo2LpbysGXusLpu4MlBuNH65w7tlZNCEid8wmLUjkhBfrqk2lpU3UMAOswUVBpZ4LRQ'
});

module.exports = Redis;
export default Redis;