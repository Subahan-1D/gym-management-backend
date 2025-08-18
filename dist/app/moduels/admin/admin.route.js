"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRouter = void 0;
const express_1 = __importDefault(require("express"));
const authCheck_1 = __importDefault(require("../../middlewares/authCheck"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const classSchedule_validation_1 = require("../schedule/classSchedule.validation");
const admin_controllers_1 = require("./admin.controllers");
const router = express_1.default.Router();
router.post("/create-schedule", (0, authCheck_1.default)("admin"), (0, validateRequest_1.default)(classSchedule_validation_1.ClassScheduleValidations.createClassScheduleValidationSchema), admin_controllers_1.AdminControllers.createClassSchedule);
exports.AdminRouter = router;
