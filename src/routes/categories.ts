import express from 'express';

export const categories = express.Router();

//TODO: Implement this better
// eslint-disable-next-line @typescript-eslint/no-var-requires
categories.use(require('../middleware/authentication'));

categories.get('/top', (req, res) => {
    res.send(req.params);
});

categories.get('/:category/info', (req, res) => {
    res.send(req.params);
});