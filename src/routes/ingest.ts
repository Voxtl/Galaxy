import express from 'express';
import { database } from '../wrappers/database';
import { Redis as redis } from '../helpers/Redis';

export const ingest = express.Router();

ingest.post('/publish', (req, res) => {
    const reqId = req.body.name.slice(0, 36);
    const reqStreamKey = req.body.name.slice(36);

    database.query('SELECT * FROM users WHERE id = ?', [reqId], function(error, result) {
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

        database.query('SELECT * FROM users_info WHERE id = ?', [user.id], function(error, result) {
            if(error) {
                console.error(error);
    
                res.status(500).json({
                    status: 500,
                    message: 'There was an internal server error. Please try again soon.'
                });
                return;
            }

            const userInfo = result[0];

            if(reqStreamKey == user.stream_key) {
                redis.set(`channel:${user.id}:info`, JSON.stringify({
                    username: user.username,
                    category: userInfo.channel_category,
                    viewers: 0
                }));

                redis.sadd(`category:${userInfo.channel_category}`, user.id);
    
                res.redirect(301, `rtmp://127.0.0.1:1936/distribute/${user.id}`);
            } else {
                res.status(402).send({
                    'status': 402,
                    'message': 'You sent an invalid stream key.'
                });
            }
        });
    });
});

ingest.post('/end', (req, res) => {
    const reqId = req.body.name.slice(0, 36);
    const reqStreamKey = req.body.name.slice(36);

    database.query('SELECT * FROM users WHERE id = ?', [reqId], function(error, result) {
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

        database.query('SELECT * FROM users_info WHERE id = ?', [user.id], function(error, result) {
            if(error) {
                console.error(error);
    
                res.status(500).json({
                    status: 500,
                    message: 'There was an internal server error. Please try again soon.'
                });
                return;
            }

            const userInfo = result[0];

            if(reqStreamKey == user.stream_key) {
                redis.del(`channel:${user.id}:info`);
                redis.srem(`category:${userInfo.channel_category}`, user.id);
    
                res.status(200).send('The stream has ended.');
            } else {
                res.status(402).send({
                    'status': 402,
                    'message': 'You sent an invalid stream key.'
                });
            }
        });
    });
});