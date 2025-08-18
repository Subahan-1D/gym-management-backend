"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainerRouter = void 0;
const express_1 = __importDefault(require("express"));
const authCheck_1 = __importDefault(require("../../middlewares/authCheck"));
const trainner_controller_1 = require("./trainner.controller");
const router = express_1.default.Router();
router.get('/my-schedules', (0, authCheck_1.default)('trainer'), trainner_controller_1.TrainerControllers.getMySchedules);
router.get('/', (0, authCheck_1.default)('admin'), trainner_controller_1.TrainerControllers.getAllTrainer);
exports.TrainerRouter = router;
