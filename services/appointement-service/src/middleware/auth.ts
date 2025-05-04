import { NextFunction, Request, Response } from "express";
import axios from 'axios';
import { asyncHandler } from '../utils/asyncHandler';

interface AuthenticatedUser {
    name: string;
    email?: string;
    // add any other fields from your decoded token
}

export const authenticate = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const USER_SERVICE_URL = process.env.USER_SERVICE_URL;
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) throw new Error('No token provided');

        const response = await axios.get(`${USER_SERVICE_URL}/api/auth/profile`, {
            headers: { Authorization: authHeader }
        });

        if (response.status === 200) {
            (req as any).user = response.data;
        }
        else {
            throw new Error('Invalid Token');
        }
        next();
    } catch (error) {
        res.status(403).json({error});
    }
});
