"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const user_controler_1 = require("./user.controler");
const trainee_validation_1 = require("../trainee/trainee.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const express_1 = __importDefault(require("express"));
const authCheck_1 = __importDefault(require("../../middlewares/authCheck"));
const trainner_validatoin_1 = require("../trainner/trainner.validatoin");
const router = express_1.default.Router();
router.post("/create-trainee", (0, validateRequest_1.default)(trainee_validation_1.TraineeValidations.createsTraineeValidationSchema), user_controler_1.UserControllers.createTrainee);
router.post('/create-trainer', (0, authCheck_1.default)('admin'), (0, validateRequest_1.default)(trainner_validatoin_1.TrainerValidations.createsTrainerValidationSchema), user_controler_1.UserControllers.createTrainer);
exports.userRouter = router;
