import express from 'express';
import { promisify } from 'util';
import redis from '../helpers/Redis';
import authentication from '../middleware/authentication';

const getAsync = promisify(redis.get).bind(redis);
const smembersAsync = promisify(redis.smembers).bind(redis);

const router = express.Router();
router.use(authentication);

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
                message: 'There was an internal server error. Please try again soon.'
            });
            return;
        }

        const channels:Array<any> = await Promise.all(result.map(async (redisChannel:any) => {
            const channelData = redisChannel.split(':');

            const channelInfo = await getAsync(`channel:${channelData[1]}:info`);
            const channelArray:RedisChannel = JSON.parse(channelInfo || '{}');

            const viewers:Array<any> = await smembersAsync(`channel:${channelData[1]}:viewers`);

            const result = {
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

export default router;