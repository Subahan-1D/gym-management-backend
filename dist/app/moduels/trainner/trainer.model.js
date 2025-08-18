"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trainer = void 0;
const mongoose_1 = require("mongoose");
const TrainerSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'Trainer id is required'],
        unique: true,
        ref: 'Trainer'
    },
    name: {
        type: String,
        required: [true, 'Trainer name is required.']
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
    },
    assignedClasses: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'ClassSchedule' }]
}, {
    timestamps: true,
    versionKey: false,
    toJSON: {
        virtuals: true
    }
});
exports.Trainer = (0, mongoose_1.model)('Trainer', TrainerSchema);
