// Still to add
// -> CORS support? (If on voxtl.tv, some endpoints don't need authentication.)

import axios from 'axios';
import qs from 'qs';

//TODO: Remove implicit anys
export default function(req: any, res: any, next: any): void {
    let token = req.get('Authorization');

    if(typeof token === 'string' || token instanceof String) {
        token = token.slice(7);

        axios({
            method: 'post',
            url: 'https://auth.voxtl.tv/token/validate',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${token}`,
            },
        }).then(response => {
            res.locals.data = response.data;
            next();
        }).catch(error => {
            let origin = req.get('origin') || '';
            origin = origin.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];

            console.log(origin);

            res.status(500).json({
                status: 500,
                message: 'There was an internal server error. Please try again soon.'
            });
            return;
        });
    } else {
        res.status(401).json({
            status: 401,
            message: 'No authorisation token was sent.'
        });
        return;
    }
}