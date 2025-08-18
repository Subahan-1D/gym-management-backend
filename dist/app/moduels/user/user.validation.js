"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidations = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .trim()
            .nonempty({ message: "Name is required." })
            .min(3, "Name must be at least 3 characters long."),
        email: zod_1.z
            .string()
            .trim()
            .nonempty({ message: "Email is required." })
            .email("Invalid email format.")
            .min(4, "Email must be at least 4 characters long."),
        password: zod_1.z
            .string()
            .nonempty({ message: "Password is required." })
            .min(6, "Password must be at least 6 characters long."),
        role: zod_1.z.enum(user_constant_1.UserRole, {
            message: `Invalid Role. Allowed types are: ${user_constant_1.UserRole.join(", ")}.`,
        }),
        isBlocked: zod_1.z.boolean().default(false),
    }),
});
exports.UserValidations = {
    createUserValidationSchema,
};
