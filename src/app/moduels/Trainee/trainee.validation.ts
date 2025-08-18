import { z } from "zod";

export const createsTraineeValidationSchema = z.object({
  body: z.object({
    // user: z.string().nonempty({ message: 'Trainee ID is required.' }),
    name: z.string().trim().nonempty({ message: "Trainee name is required." }),
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
  }),
});

export const bookClassScheduleValidationSchema = z.object({
  body: z.object({
    classScheduleId: z
      .string()
      .trim()
      .nonempty({ message: "classScheduleId ID is required." }),
  }),
});

export const TraineeValidations = {
  createsTraineeValidationSchema,
  bookClassScheduleValidationSchema,
};
