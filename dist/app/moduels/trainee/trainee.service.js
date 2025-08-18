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
exports.TraineeServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const classSchedule_model_1 = __importDefault(require("../schedule/classSchedule.model"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const trainee_model_1 = require("../trainee/trainee.model");
const bookClassSchedule = (traineeId, classId) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if class exists
    const classSchedule = yield classSchedule_model_1.default.findById(classId).populate('trainerId');
    if (!classSchedule) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, 'Class not found');
    }
    // Check if the class has available seats (Max 10 trainees)
    if (classSchedule.trainees.length >= 10) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, 'No seats available');
    }
    // Check if the trainee is already book in the class
    const traineeExists = classSchedule.trainees.some(trainee => trainee.toString() === traineeId.toString());
    if (traineeExists) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, 'You are already booked a seat in this class.');
    }
    //  Check if the trainee already has a class at the same time
    const existingBooking = yield classSchedule_model_1.default.findOne({
        _id: { $ne: classId }, // Exclude the current class
        trainees: traineeId,
        date: classSchedule.date,
        startTime: classSchedule.startTime
    });
    if (existingBooking) {
        throw new AppError_1.default(http_status_codes_1.default.CONFLICT, 'You already have a class at this time');
    }
    //  Add trainee to the class
    classSchedule.trainees.push(new mongoose_1.default.Types.ObjectId(traineeId));
    yield classSchedule.save();
    return classSchedule;
});
const cancelBooking = (traineeId, classId) => __awaiter(void 0, void 0, void 0, function* () {
    const classSchedule = yield classSchedule_model_1.default.findById(classId);
    if (!classSchedule) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, 'Class not found.');
    }
    // **Ensure traineeId exists in the list**
    if (!classSchedule.trainees.some(id => id.toString() === traineeId.toString())) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, 'You are not enrolled in this class.');
    }
    // Remove trainee
    classSchedule.trainees = classSchedule.trainees.filter(id => id.toString() !== traineeId.toString());
    yield classSchedule.save();
    return classSchedule;
});
const getAllTraineeFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield trainee_model_1.Trainee.find(query);
    return { result };
});
exports.TraineeServices = {
    bookClassSchedule,
    cancelBooking,
    getAllTraineeFromDB
};
