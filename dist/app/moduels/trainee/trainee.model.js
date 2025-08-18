"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trainee = void 0;
const mongoose_1 = require("mongoose");
const traineeSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'Trainee id is required'],
        unique: true,
        ref: 'Trainee'
    },
    name: {
        type: String,
        required: [true, 'Trainee name is required.']
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female', 'other'],
            message: '{VALUE} is not a valid gender.'
        },
        required: [true, 'Gender is required.']
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true
    },
    contactNo: {
        type: String,
        required: [true, 'Contact number is required.']
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});
exports.Trainee = (0, mongoose_1.model)('Trainee', traineeSchema);
