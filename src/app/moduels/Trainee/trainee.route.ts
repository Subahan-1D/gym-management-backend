import express from 'express';
import auth from '../../Middleware/auth';
import { TraineeControllers } from './trainee.controller';
import validateRequest from '../../Middleware/validateRequest';
import { TraineeValidations } from './trainee.validation';

const router = express.Router();

router.post(
    '/book-class',
    // auth('trainee'),
    // validateRequest(TraineeValidations.bookClassScheduleValidationSchema),
    // TraineeControllers.bookClassSchedule
);

router.delete(
    '/cancel-booking',
    // auth('trainee'),
    // TraineeControllers.cancelBooking
);

router.get('/', auth('admin'), TraineeControllers.getAllTrainee);
export const TraineeRouter = router;