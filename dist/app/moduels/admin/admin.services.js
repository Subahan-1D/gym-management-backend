"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminServices = void 0;
const classSchedule_model_1 = __importDefault(require("../schedule/classSchedule.model"));
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const trainer_model_1 = require("../trainner/trainer.model");
const createClassScheduleIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, startTime, trainerId } = payload;
    // Check if the trainer already has 5 classes scheduled on this date
    const existingScheduleCount = yield classSchedule_model_1.default.countDocuments({
        date,
        trainerId,
    });
    if (existingScheduleCount >= 5) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "A trainer can schedule up to 5 classes per day.");
    }
    // Check if the trainer has another class at the same time
    const existingSchedule = yield classSchedule_model_1.default.findOne({
        date,
        startTime,
        trainerId,
    });
    if (existingSchedule) {
        throw new AppError_1.default(http_status_codes_1.default.CONFLICT, "The trainer already has a class at this time.");
    }
    // Create the class schedule
    const newClassSchedule = yield classSchedule_model_1.default.create(payload);
    // Update Trainer's assignedClasses field
    yield trainer_model_1.Trainer.findByIdAndUpdate(trainerId, {
        $push: { assignedClasses: newClassSchedule._id },
    });
    return newClassSchedule;
});
exports.AdminServices = {
    createClassScheduleIntoDB,
};
