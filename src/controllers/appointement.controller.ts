import {Request, Response} from 'express';

type Appointement = {
    id: string,
    name: string,
    date: string,
    vehicleNumber: string
}

const appointements = new Map<string, Appointement>();

const bookAppointement = (req:Request, res: Response) => {
    const {name, date, vehicleNumber}: any = req.body;
    const id = Date.now().toString();

    const appointement: Appointement = {id, name, date, vehicleNumber};
    appointements.set(id, appointement);

    res.status(201).json({"message": "Appointement booked", appointement});
}

const getAppointement = (req:Request, res: Response) => {
    const id = req.params.id;

    if (!id) {
        res.json(Array.from(appointements.values()));
    }
    else {
        const appointement = appointements.get(id);
        if (!appointement)
            res.status(401).json({ "error": "Appointement not found" });
        else
            res.json(appointement);
    }
}

const updateAppointement = (req: Request, res: Response) => {
    const id: string = req.params.id;
    const existing: Appointement | undefined = appointements.get(id);

    if (!existing) {
        res.json({ "error": "No appointement found" });
    }
    else {
        const { name, date, vehicleNumber } = req.body;
        const updated: Appointement = { id, name, date, vehicleNumber };
        appointements.set(id, updated);
        res.json({ "message": "Appointement updated", appointement: updated });
    }
}

const deleteAppointement = (req: Request, res: Response) => {
    const id: string = req.params.id;

    if (!appointements.has(id)) {
        res.status(404).json({ "error": "Appointement not found" });
    }
    else {
        appointements.delete(id);
        res.json({ message: "Appointement deleted" })
    }
}

export { bookAppointement, getAppointement, updateAppointement, deleteAppointement };