import express from 'express';
import { TraineeValidations } from './trainee.validation';
import authCheck from '../../middlewares/authCheck';
import validateRequest from '../../middlewares/validateRequest';
import { TraineeControllers } from './trainee.controllers';

const router = express.Router();

router.post(
    '/book-class',
    authCheck('trainee'),
    validateRequest(TraineeValidations.bookClassScheduleValidationSchema),
    TraineeControllers.bookClassSchedule
);

router.delete(
    '/cancel-booking',
    authCheck('trainee'),
    TraineeControllers.cancelBooking
);

router.get('/', authCheck('admin'), TraineeControllers.getAllTrainee);
export const TraineeRouter = router;