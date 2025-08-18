import express from 'express';
import authCheck from '../../middlewares/authCheck';
import { ScheduleController } from './classSchedule.controller';


const router = express.Router();

router.get('/',authCheck("admin"), ScheduleController.getAllSchedule);


export const ScheduleRouter = router;