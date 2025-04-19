import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';

const loginCredentialsSchema = z.object({
  email: z.string().email('ایمیل معتبر نیست'),
  password: z.string().min(4, 'رمز عبور باید حداقل ۴ کاراکتر باشد'),
});

function validateData<T extends z.ZodTypeAny>(
  schema: T,
  data: unknown
): { success: true; data: z.infer<T> } | { success: false; errors: z.ZodError } {
  try {
    const parsed = schema.parse(data);
    return { success: true, data: parsed };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error };
    }
    throw error;
  }
}

const dbFilePath = path.join(process.cwd(), 'db.json');

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const result = validateData(loginCredentialsSchema, credentials);

        if (!result.success) {
          console.error('❌ خطای اعتبارسنجی:', result.errors.flatten().fieldErrors);
          return null;
        }

        const { email, password } = result.data;

        try {
          const fileData = fs.readFileSync(dbFilePath, 'utf-8');
          const db = JSON.parse(fileData);
          const users = db.users || [];

          const user = users.find(
            (u: any) => u.email === email && u.password === password
          );

          if (user) {
            return {
              id: user.id.toString(),
              name: user.name,
              email: user.email,
              image: user.image || null,
            };
          }

          return null;
        } catch (error) {
          console.error('❌ خطا در خواندن فایل db.json:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
