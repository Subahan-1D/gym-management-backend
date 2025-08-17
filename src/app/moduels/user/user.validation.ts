import { z } from 'zod';
import { UserRole } from './user.constant';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .nonempty({ message: 'Name is required.' })
      .min(3, 'Name must be at least 3 characters long.'),
    email: z
      .string()
      .trim()
      .nonempty({ message: 'Email is required.' })
      .email('Invalid email format.')
      .min(4, 'Email must be at least 4 characters long.'),
    password: z
      .string()
      .nonempty({ message: 'Password is required.' })
      .min(6, 'Password must be at least 6 characters long.'),
    role: z.enum([...UserRole] as [string, ...string[]], {
      errorMap: () => ({
        message: `Invalid Role. Allowed types are: ${UserRole.join(', ')}.`
      })
    }),
    isBlocked: z.boolean().default(false)
  })
});

export const UserValidations = {
  createUserValidationSchema
};
