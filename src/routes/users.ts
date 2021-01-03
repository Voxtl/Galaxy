import express from 'express';
import database from '../wrappers/database';
import redis from '../helpers/Redis';
import authentication from '../middleware/authentication';

const router = express.Router();
router.use(authentication);

router.get('/:user/profile', (req, res) => {
    let user;
    if(req.params.user === '@me') {
        user = res.locals.data.result.user_id;
    } else {
        user = req.params.user;
    }

    database.query('SELECT * FROM users WHERE id = ? OR username = ?', [user, user], function(error, result) {
        if(error) {
            console.error(error);

            res.status(500).json({
                status: 500,
                message: 'There was an internal server error. Please try again soon.'
            });
            return;
        }

        if(!result[0]) {
            res.status(404).json({
                status: 404,
                message: 'This user could not be found'
            });
            return;
        }

        const user = result[0];

        database.query('SELECT * FROM users_info WHERE user_id = ?', [user.id], function(error, result) {
            if(error) {
                console.error(error);
    
                res.status(500).json({
                    status: 500,
                    message: 'There was an internal server error. Please try again soon.'
                });
                return;
            }

            const userInfo = result[0];

            res.status(200).json({
                status: 200,
                result: {
                    user: {
                        id: user.id,
                        username: user.username
                    },
                    profile: {
                        avatar: user.avatar,
                        bio: userInfo.profile_bio,
                        description: userInfo.profile_description,
                    }
                }
            });
            return;
        });
    });
});

router.get('/:user/channel', async (req, res) => {
    let user;
    if(req.params.user === '@me') {
        user = res.locals.data.result.user_id;
    } else {
        user = req.params.user;
    }

    database.query('SELECT * FROM users WHERE id = ? OR username = ?', [user, user], function(error, result) {
        if(error) {
            console.error(error);

            res.status(500).json({
                status: 500,
                message: 'There was an internal server error. Please try again soon.'
            });
            return;
        }

        if(!result[0]) {
            res.status(404).json({
                status: 404,
                message: 'This user could not be found'
            });
            return;
        }

        const user = result[0];

        database.query('SELECT * FROM users_info WHERE user_id = ?', [user.id], function(error, result) {
            if(error) {
                console.error(error);
    
                res.status(500).json({
                    status: 500,
                    message: 'There was an internal server error. Please try again soon.'
                });
                return;
            }

            const userInfo = result[0];

            redis.SMEMBERS(`stream:${user.id}:viewers`, function(_error:any, result:any) {
                if(error) {
                    console.error(error);
        
                    res.status(500).json({
                        status: 500,
                        message: 'There was an internal server error. Please try again soon.'
                    });
                    return;
                }

                const viewers:Array<any> = [];
                result.forEach((viewer:any) => {
                    viewers.push(JSON.parse(viewer).id);
                });
                
                res.status(200).json({
                    status: 200,
                    result: {
                        user: {
                            id: user.id,
                            username: user.username
                        },
                        channel: {
                            title: userInfo.channel_title,
                            category: userInfo.channel_category,
                            viewers: {
                                count: viewers.length,
                                list: viewers
                            }
                        }
                    }
                });
            });
        });
    });
});


router.get('/:user/channel/key', async (req, res) => {
    if(req.params.user === '@me') {
        req.params.user = res.locals.data.result.user_id;
    }

    database.query('SELECT * FROM users WHERE id = ? OR username = ?', [req.params.user, req.params.user], function(error, result) {
        if(error) {
            console.error(error);

            res.status(500).json({
                status: 500,
                message: 'There was an internal server error. Please try again soon.'
            });
            return;
        }

        if(!result[0]) {
            res.status(404).json({
                status: 404,
                message: 'This user could not be found'
            });
            return;
        }

        const user = result[0];

        if(req.params.user !== '@me' && req.params.user !== user.id && req.params.user !== user.username) {
            res.status(401).json({
                status: 401,
                message: 'You do not have access to this resource.'
            });
            return;
        }

        res.status(200).json({
            status: 200,
            result: {
                user: {
                    id: user.id,
                    username: user.username
                },
                channel: {
                    stream_key: user.stream_key
                }
            }
        });
    });
});

router.put('/update', async (req, res) => {
    if(typeof req.body !== 'object') {
        res.status(400).json({
            status: 400,
            message: 'You have not sent any data.'
        });
        return;
    }

    const users = ['email', 'stream_key'];
    const users_info = ['channel_title', 'channel_category', 'profile_bio', 'profile_description'];

    for(const [key, value] of Object.entries(req.body)) {
        let data:string = "";
        if(typeof value === 'string') data = value;

        // TODO: Add email and stream_key updating.
        if(users.includes(key)) {

        } else if(users_info.includes(key)) {
            database.query(`UPDATE users_info SET ${key} = '${encodeURI(data)}' WHERE id = '${res.locals.data.result.user_id}'`, function(error, result) {
                if(error) {
                    console.error(error);
        
                    res.status(500).json({
                        status: 500,
                        message: 'There was an internal server error. Please try again soon.'
                    });
                    return;
                }

                let time = Math.floor(new Date().getTime() / 1000);

                database.query(`UPDATE users SET updated = ${time} WHERE id = '${res.locals.data.result.user_id}'`, function(error, result) {
                    if(error) {
                        console.error(error);
            
                        res.status(500).json({
                            status: 500,
                            message: 'There was an internal server error. Please try again soon.'
                        });
                        return;
                    }

                    res.status(200).json({
                        status: 200,
                        message: 'You have updated your user.'
                    });
                    return;
                });
            });
        } else {
            res.status(400).json({
                status: 400,
                message: 'Invalid preference.'
            });
            return;
        }
    }
});

export default router;