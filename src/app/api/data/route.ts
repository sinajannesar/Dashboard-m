import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { UserData, Database } from '@/types/types';
import { userSchema } from '@/schemas/user';

const dbPath = path.join(process.cwd(), 'db.json');

export async function POST(request: Request) {
  try {
    const inputData = await request.json();

    const validationResult = userSchema.safeParse(inputData);
    
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "اعتبارسنجی ناموفق",
          details: validationResult.error.issues.map((err) => ({
            field: err.path[0], 
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    let db: Database = { users: [] };
    try {
      const fileData = await fs.readFile(dbPath, 'utf8');
      db = JSON.parse(fileData) as Database;
    } catch {
      console.log('Initializing new database file');
    }

    if (db.users.some(user => user.email === inputData.email)) {
      return NextResponse.json(
        { error: 'این ایمیل قبلا ثبت شده است' },
        { status: 409 }
      );
    }

    const newUser: UserData = {
      id: Date.now(),
      ...validationResult.data, 
      createdAt: new Date().toISOString()
    };

    db.users.push(newUser);
    await fs.writeFile(dbPath, JSON.stringify(db, null, 2));

    return NextResponse.json(
      { 
        success: true,
        user: newUser 
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { error: 'خطای سرور' },
      { status: 500 }
    );
  }
}