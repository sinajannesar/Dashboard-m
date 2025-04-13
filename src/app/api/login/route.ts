import { NextResponse } from 'next/server';
import { UserData } from '@/types/types';
import { readFileSync } from 'fs';
import { join } from 'path';
import { sign } from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Read users from the JSON file
    const dbPath = join(process.cwd(), 'db.json');
    const dbContent = readFileSync(dbPath, 'utf-8');
    const users: UserData[] = JSON.parse(dbContent).users;

    // Find user by email
    const user = users.find((u: UserData) => u.email === email);

    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = sign(
      {
        userId: user.id,
        email: user.email,
        name: `${user.first_name} ${user.last_name}`,
      },
      process.env.JWT_SECRET || 'default-secret',
      { expiresIn: '1h' }
    );

    return NextResponse.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
