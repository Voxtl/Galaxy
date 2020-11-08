import express from 'express';
const router = express.Router();

router.use(require('../middleware/authentication'));

router.get('/top', (req, res) => {
    res.send(req.params);
});

router.get('/:category/info', (req, res) => {
    res.send(req.params);
});

module.exports = router;