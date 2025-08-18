import express from "express";
import authCheck from "../../middlewares/authCheck";
import validateRequest from "../../middlewares/validateRequest";
import { ClassScheduleValidations } from "../schedule/classSchedule.validation";
import { AdminControllers } from "./admin.controllers";

const router = express.Router();

router.post(
  "/create-schedule",
  authCheck("admin"),
  validateRequest(ClassScheduleValidations.createClassScheduleValidationSchema),
  AdminControllers.createClassSchedule
);

export const AdminRouter = router;
