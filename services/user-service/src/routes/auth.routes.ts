import { Router } from "express";
import { register, login, verifyToken } from '../controllers/auth.controller';
import { getProfile } from "../controllers/auth.controller";
import { authenticationToken } from "../middlewares/auth.middleware";

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/verify', verifyToken);
router.get('/profile', authenticationToken, getProfile);

export default router;