import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
interface User {
  id: string;
  email: string;
  password: string;
}

interface Database {
  users: User[];
}

const dbPath = path.join(process.cwd(), 'db.json');

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const dbContents = await fs.readFile(dbPath, 'utf8');
    const db: Database = JSON.parse(dbContents);

    const user = db.users.find((u: User) => u.email === email);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    if (user.password !== password) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const { password: _, ...userData } = user;
    
    return NextResponse.json(
      { success: true, user: userData },
      { status: 200 }
    );

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}