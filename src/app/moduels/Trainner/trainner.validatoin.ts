import { z } from "zod";

export const createsTrainerValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().nonempty({ message: "Trainer name is required." }),
    gender: z.enum(["male", "female", "other"], {
      message: "Gender must be male, female, or other.",
    }),
    email: z
      .string()
      .trim()
      .nonempty({ message: "Email is required." })
      .email("Invalid email format."),
    contactNo: z
      .string()
      .trim()
      .nonempty({ message: "Contact number is required." }),
    assignedClasses: z.array(z.string()).optional(),
  }),
});

export const TrainerValidations = {
  createsTrainerValidationSchema,
};
