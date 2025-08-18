"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleRouter = void 0;
const express_1 = __importDefault(require("express"));
const authCheck_1 = __importDefault(require("../../middlewares/authCheck"));
const classSchedule_controller_1 = require("./classSchedule.controller");
const router = express_1.default.Router();
router.get('/', (0, authCheck_1.default)("admin"), classSchedule_controller_1.ScheduleController.getAllSchedule);
exports.ScheduleRouter = router;
