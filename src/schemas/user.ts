import { z } from 'zod';

// schemas/user.ts
export const userSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  phoneNumber: z.string().min(10).regex(/^[0-9]+$/),
  email: z.string().email(),
  password: z.string().min(4)
});