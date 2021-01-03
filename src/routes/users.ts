import express from 'express';
import database from '../wrappers/database';
import redis from '../helpers/Redis';
import authentication from '../middleware/authentication';

const router = express.Router();
router.use(authentication);

router.get('/:user/profile', (req, res) => {
    let user;
    
    // Check if guest
    if(res.locals.guest) {
        if(req.params.user === '@me') {
            res.status(401).json({
                status: 401,
                message: 'You must specify a user.'
            });
            return;
        } else {
            user = req.params.user;
        }
    } else {
        if(req.params.user === '@me') {
            user = res.locals.data.result.user_id;
        } else {
            user = req.params.user;
        }
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
                        avatar: userInfo.profile_avatar,
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

    // Check if guest
    if(res.locals.guest) {
        if(req.params.user === '@me') {
            res.status(401).json({
                status: 401,
                message: 'You must specify a user.'
            });
            return;
        } else {
            user = req.params.user;
        }
    } else {
        if(req.params.user === '@me') {
            user = res.locals.data.result.user_id;
        } else {
            user = req.params.user;
        }
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
                            thumbnail: userInfo.channel_thumbnail,
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
    let user;

    // Check if guest
    if(res.locals.guest) {
        res.status(401).json({
            status: 401,
            message: 'You must be logged in.'
        });
        
        return;
    } else {
        if(req.params.user === '@me') {
            user = res.locals.data.result.user_id;
        } else {
            user = req.params.user;
        }
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

        // if(req.params.user !== '@me' && req.params.user !== user.id && req.params.user !== user.username) {
        //     res.status(401).json({
        //         status: 401,
        //         message: 'You do not have access to this resource.'
        //     });
        //     return;
        // }

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

// router.patch('/@me/profile', async (req, res) => {

// });

// router.patch('/@me/channel', async (req, res) => {

// });

// router.patch('/@me/channel/key', async (req, res) => {

// });

// router.put('/update', async (req, res) => {
//     let user;

//     // Check if guest
//     if(res.locals.guest) {
//         res.status(401).json({
//             status: 401,
//             message: 'You must be logged in.'
//         });
        
//         return;
//     } else {
//         user = res.locals.data.result.user_id;
//     }

//     // Make sure body is an object
//     if(typeof req.body !== 'object') {
//         res.status(400).json({
//             status: 400,
//             message: 'No data sent.',
//         });
    
//         return;
//     }

//     // Make sure object is not empty
//     if(Object.keys(req.body).length === 0) {
//         res.status(400).json({
//             status: 400,
//             message: 'No data sent.',
//         });
    
//         return;
//     }

//     // Valid options to update
//     const users = ['username', 'email'];
//     const usersInfo = ['profile_avatar', 'profile_bio', 'profile_description', 'channel_title', 'channel_thumbnail', 'channel_category'];

//     // Loop through values to update
//     for(let [key, value] of Object.entries(req.body)) {
//         // Make sure value is a string
//         if(typeof value !== 'string') {
//             res.status(400).json({
//                 status: 400,
//                 message: 'Invalid data sent.',
//             });
//             return;
//         }

//         // Check which table to update
//         if(users.includes(key)) {
//             // Update users table

//             // Query database
//             let time = Math.floor(new Date().getTime() / 1000);
//             database.query(`UPDATE users SET ${key} = '${value}', updated = ${time} WHERE id = '${user}'`, (error, result) => {
//                 if(error) {
//                     res.status(500).json({
//                         status: 500,
//                         message: 'There was an internal server error. Please try again soon.'
//                     }); return;
//                 }

//                 res.status(200).json({
//                     status: 200,
//                     message: 'You have updated your user.'
//                 }); return;
//             });
//         } else if(usersInfo.includes(key)) {
//             // Update users_info table
//         } else {
//             // Invalid option
//         }
//     }
// });

export default router;