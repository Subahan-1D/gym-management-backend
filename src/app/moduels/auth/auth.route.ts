import express from "express";

import { AuthValidations } from "./auth.validation";
import validateRequest from "../../middlewares/validateRequest";
import { AuthControllers } from "./auth.controler";

const router = express.Router();
router.post(
  "/login",
  validateRequest(AuthValidations.loginValidationSchema),
  AuthControllers.loginUser
);

export const AuthRouter = router;
