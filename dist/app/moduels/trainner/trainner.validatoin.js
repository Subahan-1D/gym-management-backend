"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainerValidations = exports.createsTrainerValidationSchema = void 0;
const zod_1 = require("zod");
exports.createsTrainerValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().trim().nonempty({ message: "Trainer name is required." }),
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
        assignedClasses: zod_1.z.array(zod_1.z.string()).optional(),
    }),
});
exports.TrainerValidations = {
    createsTrainerValidationSchema: exports.createsTrainerValidationSchema,
};
