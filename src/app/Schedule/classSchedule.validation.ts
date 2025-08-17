import { z } from 'zod';

const validateTimeDifference = (startTime: string, endTime: string): boolean => {
  const start = new Date(`1980-01-01T${startTime}:00`);
  const end = new Date(`1980-01-01T${endTime}:00`);
  const diffInMinutes = (end.getTime() - start.getTime()) / (1000 * 60); // time difference in minutes

  return diffInMinutes === 120; // 2 hours = 120 minutes
};

export const createClassScheduleValidationSchema = z.object({
  body: z
    .object({
      date: z
        .string()
        .trim()
        .nonempty({ message: 'Date is required.' })
        .regex(/^\d{2}-\d{2}-\d{4}$/, 'Invalid date format. Use DD-MM-YYYY.'),
      startTime: z.string().trim().nonempty({ message: 'Start time is required.' }),
      endTime: z.string().trim().nonempty({ message: 'End time is required.' }),
      capacity: z
        .number()
        .min(1, { message: 'Capacity must be at least 1 trainee.' })
        .max(10, { message: 'Capacity cannot exceed 10 trainees.' }),
      trainerId: z.string().trim().nonempty({ message: 'Trainer ID is required.' }),
      trainees: z.array(z.string()).optional()
    })
    .refine(data => validateTimeDifference(data.startTime, data.endTime), {
      message: 'Class duration must be exactly 2 hours.',
      path: ['endTime']
    })
});

export const ClassScheduleValidations = {
  createClassScheduleValidationSchema
};
