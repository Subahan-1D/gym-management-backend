"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraineeValidations = exports.bookClassScheduleValidationSchema = exports.createsTraineeValidationSchema = void 0;
const zod_1 = require("zod");
exports.createsTraineeValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        // user: z.string().nonempty({ message: 'Trainee ID is required.' }),
        name: zod_1.z.string().trim().nonempty({ message: "Trainee name is required." }),
        gender: zod_1.z.enum(["male", "female", "other"], {
            message: "Gender must be male, female, or other.",
        }),
        email: zod_1.z
            .string()
            .trim()
            .nonempty({ message: "Email is required." })
            .email("Invalid email format."),
        contactNo: zod_1.z
            .string()
            .trim()
            .nonempty({ message: "Contact number is required." }),
    }),
});
exports.bookClassScheduleValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        classScheduleId: zod_1.z
            .string()
            .trim()
            .nonempty({ message: "classScheduleId ID is required." }),
    }),
});
exports.TraineeValidations = {
    createsTraineeValidationSchema: exports.createsTraineeValidationSchema,
    bookClassScheduleValidationSchema: exports.bookClassScheduleValidationSchema,
};
