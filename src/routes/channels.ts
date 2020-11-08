import express from 'express';
import { promisify } from 'util';
import redis from '../helpers/Redis';

let getAsync = promisify(redis.get).bind(redis);
let smembersAsync = promisify(redis.smembers).bind(redis);

const router = express.Router();
router.use(require('../middleware/authentication'));

interface RedisChannel {
    username: string;
    category: string;
    viewers: number;
}

router.get('/all', async (req, res) => {
    redis.keys('channel:*:info', async function(error:any, result:any) {
        if(error) {
            console.error(error);

            res.status(500).json({
                status: 500,
                message: "There was an internal server error. Please try again soon."
            });
            return;
        }

        let channels:Array<any> = await Promise.all(result.map(async (redisChannel:any) => {
            let channelData = redisChannel.split(':');

            let channelInfo = await getAsync(`channel:${channelData[1]}:info`);
            let channelArray:RedisChannel = JSON.parse(channelInfo || '{}');

            let viewers:Array<any> = await smembersAsync(`channel:${channelData[1]}:viewers`);

            let result = {
                id: channelData[1],
                username: channelArray.username,
                category: channelArray.category,
                viewers: viewers.length
            };

            return result;
        }));
        
        res.status(200).json({
            status: 200,
            result: channels
        });
    });
});

module.exports = router;