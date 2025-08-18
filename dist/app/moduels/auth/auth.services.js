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
exports.AuthServices = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const user_model_1 = require("../user/user.model");
const env_1 = require("../../config/env");
const registerUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.role === 'admin') {
        throw new AppError_1.default(http_status_codes_1.default.UNAUTHORIZED, 'Only Super Admin can create an Admin account.');
    }
    else if (payload.role === 'trainer') {
        throw new AppError_1.default(http_status_codes_1.default.UNAUTHORIZED, 'Only Admin can create a Trainer account.');
    }
    const user = yield user_model_1.User.create(payload);
    const result = yield user_model_1.User.findById(user._id)
        .select('_id name email isBlocked role')
        .lean();
    return result;
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExistsByEmail(payload === null || payload === void 0 ? void 0 : payload.email);
    // checking if the user is exist
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, 'This user is not found');
    }
    // checking if the user is Blocked
    yield user_model_1.User.isUserBlocked(user.isBlocked);
    if (!(yield user_model_1.User.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password))) {
        throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, 'Password do not matched!');
    }
    // create token and send to the client
    const jwtPayload = {
        userId: user._id,
        userEmail: user.email,
        role: user.role
    };
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, env_1.envVars.JWT_ACCESS_SECRET, {
        expiresIn: '30d'
    });
    return { token: accessToken };
});
exports.AuthServices = {
    registerUserIntoDB,
    loginUser
};
