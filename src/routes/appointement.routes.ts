import {Router, Request, Response} from 'express';
import {getAppointement, updateAppointement, deleteAppointement, bookAppointement} from '../controllers/appointement.controller'

const router = Router();

router.post('/', bookAppointement);
router.get('/:id', getAppointement);
router.get('/', getAppointement);
router.put('/:id', updateAppointement);
router.delete('/:id', deleteAppointement);

export default router;