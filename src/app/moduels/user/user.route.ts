import { UserControllers } from "./user.controler";
import { TraineeValidations } from "../Trainee/trainee.validation";
import validateRequest from "../../middlewares/validateRequest";
import express from "express";

const router = express.Router();

router.post(
  "/create-trainee",
  validateRequest(TraineeValidations.createsTraineeValidationSchema),
  UserControllers.createTrainee
);
router.post(
    '/crete-trainer',
    auth('admin'),
    validateRequest(TrainerValidations.createsTrainerValidationSchema),
    UserControllers.createTrainer
);

export const userRouter = router;
