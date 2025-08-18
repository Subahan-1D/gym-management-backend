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
exports.User = void 0;
/* eslint-disable @typescript-eslint/no-this-alias */
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_constant_1 = require("./user.constant");
const env_1 = require("../../config/env");
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
// Defining the User schema
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Name id is required']
    },
    email: {
        type: String,
        required: [true, 'Email id is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password id is required'],
        select: 0 // Password will not be selected by default
    },
    role: {
        type: String,
        enum: {
            values: user_constant_1.UserRole,
            message: '{VALUE} is not a valid user role.'
        },
        required: [true, 'role is required.']
    },
    isBlocked: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
// Middleware to hash the password before saving the user
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        user.password = yield bcryptjs_1.default.hash(user.password, Number(env_1.envVars.BCRYPT_SALT_ROUND));
        next();
    });
});
// Static method to check if a user exists by their email
userSchema.statics.isUserExistsByEmail = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.User.findOne({ email }).select('+password');
    });
};
// Static method to check if a user is blocked
userSchema.statics.isUserBlocked = function (isBlocked) {
    return __awaiter(this, void 0, void 0, function* () {
        if (isBlocked) {
            throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, 'This account is currently blocked.');
        }
        return isBlocked;
    });
};
// Static method to compare a plain text password with a hashed password
userSchema.statics.isPasswordMatched = function (plainTextPassword, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(plainTextPassword, hashedPassword);
    });
};
exports.User = (0, mongoose_1.model)('User', userSchema);
