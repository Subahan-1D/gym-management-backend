import { UserControllers } from "./user.controler";
import { TraineeValidations } from "../trainee/trainee.validation";
import validateRequest from "../../middlewares/validateRequest";
import express from "express";
import authCheck from "../../middlewares/authCheck";
import { TrainerValidations } from "../trainner/trainner.validatoin";

const router = express.Router();

router.post(
  "/create-trainee",
  validateRequest(TraineeValidations.createsTraineeValidationSchema),
  UserControllers.createTrainee
);
router.post(
    '/create-trainer',
    authCheck('admin'),
    validateRequest(TrainerValidations.createsTrainerValidationSchema),
    UserControllers.createTrainer
);

export const userRouter = router;
