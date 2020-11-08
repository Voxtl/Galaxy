import express from 'express';
import database from '../wrappers/database';
const Redis = require('../helpers/Redis');

const users = express.Router();
users.use(require('../middleware/authentication'));

users.get('/:user/profile', (req, res) => {
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
                message: "There was an internal server error. Please try again soon."
            });
            return;
        }

        if(!result[0]) {
            res.status(404).json({
                status: 404,
                message: "This user could not be found"
            });
            return;
        }

        let user = result[0];

        database.query('SELECT * FROM users_info WHERE id = ?', [user.id], function(error, result) {
            if(error) {
                console.error(error);
    
                res.status(500).json({
                    status: 500,
                    message: "There was an internal server error. Please try again soon."
                });
                return;
            }

            let userInfo = result[0];

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

users.get('/:user/channel', async (req, res) => {
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
                message: "There was an internal server error. Please try again soon."
            });
            return;
        }

        if(!result[0]) {
            res.status(404).json({
                status: 404,
                message: "This user could not be found"
            });
            return;
        }

        let user = result[0];

        database.query('SELECT * FROM users_info WHERE id = ?', [user.id], function(error, result) {
            if(error) {
                console.error(error);
    
                res.status(500).json({
                    status: 500,
                    message: "There was an internal server error. Please try again soon."
                });
                return;
            }

            let userInfo = result[0];

            Redis.SMEMBERS(`stream:${user.id}:viewers`, function(_error:any, result:any) {
                if(error) {
                    console.error(error);
        
                    res.status(500).json({
                        status: 500,
                        message: "There was an internal server error. Please try again soon."
                    });
                    return;
                }

                let viewers:Array<any> = [];
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


users.get('/:user/channel/key', async (req, res) => {
    if(req.params.user === '@me') {
        req.params.user = res.locals.data.result.user_id;
    }

    database.query('SELECT * FROM users WHERE id = ? OR username = ?', [req.params.user, req.params.user], function(error, result) {
        if(error) {
            console.error(error);

            res.status(500).json({
                status: 500,
                message: "There was an internal server error. Please try again soon."
            });
            return;
        }

        if(!result[0]) {
            res.status(404).json({
                status: 404,
                message: "This user could not be found"
            });
            return;
        }

        let user = result[0];

        if(req.params.user !== '@me' && req.params.user !== user.id && req.params.user !== user.username) {
            res.status(401).json({
                status: 401,
                message: "You do not have access to this resource."
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
                    stream_key: user.id + user.stream_key
                }
            }
        });
    });
});

module.exports = users;