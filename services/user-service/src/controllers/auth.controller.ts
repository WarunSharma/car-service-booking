import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export const register = async(req: Request, res: Response) => {
    try {
        const {name, email, password} = req.body;
        const existingUser = await prisma.user.findUnique({where: {
            email
        }});

        if (existingUser) {
            res.status(400).json({error: 'User already exists'});
        }
        else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await prisma.user.create({

                data: {name, email, password: hashedPassword},
            })

            res.status(201).json({id: newUser.id, name: newUser.name, email: newUser.email});
        }
    } catch (error) {
        res.status(500).json({error: 'Server error'});
    }
}

export const login = async(req: Request, res: Response) => {
    try {
        const {email, password} = req.body;
        const user = await prisma.user.findUnique({where: {email}});

        if (!user) {
            res.status(401).json({error: 'Invalid credentials'});
        }
        else {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                res.status(401).json({error: 'Invalid credentials'});
            }
            else {
                const token = jwt.sign({id: user.id, email: user.email}, JWT_SECRET, {expiresIn: '1h'});
                res.json({token});
            }
        }
    } catch (error) {
        res.status(500).json({error: 'Server error'});
    }
}

export const verifyToken = async(req: Request, res: Response) => {
    try {
        const token = req.headers?.authorization?.split(' ')[1];
        if (!token) {
            res.status(401).json({error: 'Token missing'});
        }
        else {
            const decoded = await jwt.verify(token, JWT_SECRET);
            res.json({valid: true, decoded})
        }
    } catch (error) {
        res.status(401).json({error: 'Invalid error'});
    }
}