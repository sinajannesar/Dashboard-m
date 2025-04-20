import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import Auth0Provider from "next-auth/providers/auth0";
import { z } from 'zod';
import fs from 'fs';
import path from 'path';
import { AddUser } from '@/lib/actions/addUser';
import {Emailcheck} from '@/hooks/useEmailcheck'


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

    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: `https://${process.env.AUTH0_ISSUER_BASE_URL}`,
      authorization: {
        params: {
          prompt: "login",
          scope: "openid profile email",
        },
      },
    }),


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

    async signIn({ user, account, profile }) {
      if (account?.provider === "auth0") {
        try {
          // Check if the user already exists by email
          const existingUser = await Emailcheck(user.email!);
    
          if (!existingUser) {
            // Create a new user if it doesn't exist
            await AddUser({
              first_name: (profile as any).given_name || user.name?.split(" ")[0] || "",
              last_name: (profile as any).family_name || user.name?.split(" ")[1] || "",
              email: user.email!,
              password: `auth0_${Date.now()}`, // Temporary password for Auth0 users
              avatar: user.image || `https://reqres.in/img/faces/2-image.jpg`,
            });
          } else if (!existingUser.password.startsWith("auth0_")) {
            // Handle case where the email is already registered with credentials
            console.error("This email is already registered with credentials");
            return false;
          }
          return true; // Successfully signed in
        } catch (error) {
          console.error("Error saving Auth0 user:", error);
          return false; // Error occurred
        }
      }
      return true; // Non-Auth0 user (or other providers)
    },
    
    
    
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
  debug: true,
};
