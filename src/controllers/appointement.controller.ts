import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { Prisma } from '@prisma/client';

type Appointement = {
    id: string,
    name: string,
    date: string,
    vehicleNumber: string
}

const bookAppointement = async (req: Request, res: Response) => {
    const { name, date, vehicleNumber }: any = req.body;
    const id = Date.now().toString();

    try {
        const appointement: Appointement = await prisma.appointment.create({
            data: { name, date, vehicleNumber }
        })

        res.status(201).json({ "message": "Appointement booked", appointement });
    }
    catch (err: any) {
        res.status(500).json({ error: "Internal server error" });
    }
}

const getAppointement = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        if (!id) {
            const appointements: Appointement[] = await prisma.appointment.findMany();
            res.json(appointements);
        }
        else {
            const appointement: Appointement | null = await prisma.appointment.findUnique({
                where: { id }
            })
            if (!appointement)
                res.status(401).json({ "error": "Appointement not found" });
            else
                res.json(appointement);
        }
    }
    catch (err: any) {
        res.status(500).json({ error: "Internal server error" });
    }
}

const updateAppointement = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const { name, date, vehicleNumber } = req.body;

    try {
        const existing: Appointement | null = await prisma.appointment.findUnique({
            where: { id }
        })
        console.log(existing);
        if (existing) {
            const updated: Appointement = await prisma.appointment.update({
                where: { id },
                data: { name, date, vehicleNumber }
            })
            res.json({ "message": "Appointement updated", appointement: updated });
        }
        else {
            res.json({ error: "No appointement found" });
        }
    }
    catch (err: any) {
        res.status(500).json({ error: "Internal server error" });
    }
}

const deleteAppointement = async(req: Request, res: Response) => {
    const id: string = req.params.id;

    try {
        await prisma.appointment.delete({
            where: {id}
        })
        res.json({ message: "Appointement deleted" })
    }
    catch (err: any) {
        res.status(404).json({ error: "Appointement not found" });
    }
}

export { bookAppointement, getAppointement, updateAppointement, deleteAppointement };