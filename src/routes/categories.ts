import express from 'express';
import authentication from '../middleware/authentication';

const router = express.Router();
router.use(authentication);

router.get('/top', (req, res) => {
    res.send(req.params);
});

router.get('/:category/info', (req, res) => {
    res.send(req.params);
});

export default router;
