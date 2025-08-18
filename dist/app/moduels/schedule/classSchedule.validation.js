"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassScheduleValidations = exports.createClassScheduleValidationSchema = void 0;
const zod_1 = require("zod");
const validateTimeDifference = (startTime, endTime) => {
    const start = new Date(`1980-01-01T${startTime}:00`);
    const end = new Date(`1980-01-01T${endTime}:00`);
    const diffInMinutes = (end.getTime() - start.getTime()) / (1000 * 60); // time difference in minutes
    return diffInMinutes === 120; // 2 hours = 120 minutes
};
exports.createClassScheduleValidationSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        date: zod_1.z
            .string()
            .trim()
            .nonempty({ message: 'Date is required.' })
            .regex(/^\d{2}-\d{2}-\d{4}$/, 'Invalid date format. Use DD-MM-YYYY.'),
        startTime: zod_1.z.string().trim().nonempty({ message: 'Start time is required.' }),
        endTime: zod_1.z.string().trim().nonempty({ message: 'End time is required.' }),
        capacity: zod_1.z
            .number()
            .min(1, { message: 'Capacity must be at least 1 trainee.' })
            .max(10, { message: 'Capacity cannot exceed 10 trainees.' }),
        trainerId: zod_1.z.string().trim().nonempty({ message: 'Trainer ID is required.' }),
        trainees: zod_1.z.array(zod_1.z.string()).optional()
    })
        .refine(data => validateTimeDifference(data.startTime, data.endTime), {
        message: 'Class duration must be exactly 2 hours.',
        path: ['endTime']
    })
});
exports.ClassScheduleValidations = {
    createClassScheduleValidationSchema: exports.createClassScheduleValidationSchema
};
