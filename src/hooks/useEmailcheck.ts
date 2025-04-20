import { promises as fs } from 'fs';
import path from 'path';
import { z } from 'zod';

const DATA_FILE_PATH = path.join(process.cwd(), 'db.json');

const userSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  first_name: z.string(),
  last_name: z.string(),
  avatar: z.string().optional(),
  password: z.string(),
});
type User = z.infer<typeof userSchema>;

export const Emailcheck = async (email: string): Promise<User | null> => {
  try {
    const file = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    const users: User[] = userSchema.array().parse(JSON.parse(file).data);
    return users.find(u => u.email === email) || null;
  } catch (err) {
    console.error('Error checking email:', err);
    return null;
  }
};
