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
exports.UserServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const user_model_1 = require("./user.model");
const mongoose_1 = __importDefault(require("mongoose"));
const trainer_model_1 = require("../trainner/trainer.model");
const trainee_model_1 = require("../trainee/trainee.model");
const createTraineeService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = {};
    const user = yield user_model_1.User.findOne({ email: payload.email });
    if (user) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, 'A user with this email already exists.');
    }
    //set Trainee Info
    userData.role = 'trainee';
    userData.email = payload.email;
    userData.name = payload.name;
    userData.password = payload.password;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // create a user (transaction-1)
        const newUser = yield user_model_1.User.create([userData], { session });
        //create a Trainee
        if (!newUser.length) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, 'Failed to create user');
        }
        // set id , _id as user
        payload.user = newUser[0]._id; //reference _id
        // create a Trainee (transaction-2)
        const newTrainee = yield trainee_model_1.Trainee.create([payload], { session });
        if (!newTrainee.length) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, 'Failed to create Trainee');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newTrainee;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
const createTrainerService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = {};
    //set Trainer Info
    const user = yield user_model_1.User.findOne({ email: payload.email });
    if (user) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, 'A user with this email already exists.');
    }
    userData.role = 'trainer';
    userData.email = payload.email;
    userData.name = payload.name;
    userData.password = payload.password;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // create a user (transaction-1)
        const newUser = yield user_model_1.User.create([userData], { session });
        //create a Trainer
        if (!newUser.length) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, 'Failed to create user');
        }
        // set id , _id as user
        payload.user = newUser[0]._id; //reference _id
        // create a Trainer (transaction-2)
        const newTrainer = yield trainer_model_1.Trainer.create([payload], { session });
        if (!newTrainer.length) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, 'Failed to create Trainer');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newTrainer;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
exports.UserServices = {
    createTraineeService,
    createTrainerService
};
