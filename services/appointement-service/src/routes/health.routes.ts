import { timeStamp } from "console";
import { Router } from "express";

const router = Router();

router.get('/health-check', (req, res) => {
    res.status(200).json({status: 'Up', timestamp: new Date().toISOString()});
})

export default router;