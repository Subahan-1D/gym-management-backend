import express from 'express';
import authCheck from '../../middlewares/authCheck';
import { TrainerControllers } from './trainner.controller';

const router = express.Router();

router.get('/my-schedules', authCheck('trainer'), TrainerControllers.getMySchedules);
router.get('/', authCheck('admin'), TrainerControllers.getAllTrainer);


export const TrainerRouter = router;