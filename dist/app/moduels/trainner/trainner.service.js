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
exports.TrainerServices = void 0;
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const trainer_model_1 = require("./trainer.model");
const getAllTrainerFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield trainer_model_1.Trainer.find(query);
    return { result };
});
const getMySchedules = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const trainer = yield trainer_model_1.Trainer.findOne({ email: userEmail }).populate({
        path: 'assignedClasses',
        populate: { path: 'trainerId', select: 'name email' }
    });
    if (!trainer) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, 'Trainer not found.');
    }
    if (!trainer.assignedClasses || trainer.assignedClasses.length === 0) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, 'You have no assigned classes.');
    }
    return trainer.assignedClasses;
});
exports.TrainerServices = {
    getMySchedules,
    getAllTrainerFromDB
};
