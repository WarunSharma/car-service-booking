import {Request, Response, Router} from 'express';

const router = Router();

router.get('/health-check', (req: Request, res: Response) => {
    res.status(200).json({status: 'Up', timestamp: new Date().toISOString()});
});

export default router;