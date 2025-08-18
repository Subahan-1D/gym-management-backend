"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraineeRouter = void 0;
const express_1 = __importDefault(require("express"));
const trainee_validation_1 = require("./trainee.validation");
const authCheck_1 = __importDefault(require("../../middlewares/authCheck"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const trainee_controllers_1 = require("./trainee.controllers");
const router = express_1.default.Router();
router.post('/book-class', (0, authCheck_1.default)('trainee'), (0, validateRequest_1.default)(trainee_validation_1.TraineeValidations.bookClassScheduleValidationSchema), trainee_controllers_1.TraineeControllers.bookClassSchedule);
router.post('/cancel-booking', (0, authCheck_1.default)('trainee'), trainee_controllers_1.TraineeControllers.cancelBooking);
router.get('/', (0, authCheck_1.default)('admin'), trainee_controllers_1.TraineeControllers.getAllTrainee);
exports.TraineeRouter = router;
