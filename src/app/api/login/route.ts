import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { Database } from '@/types/types';

const dbPath = path.join(process.cwd(), 'db.json');

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // خواندن دیتابیس
    const dbContents = await fs.readFile(dbPath, 'utf8');
    const db: Database = JSON.parse(dbContents);

    // یافتن کاربر
    const user = db.users.find(
      (user) => user.email === email && user.password === password
    );

    if (!user) {
      return NextResponse.json(
        { error: 'ایمیل یا رمز عبور نادرست است' },
        { status: 401 }
      );
    }

    // پاسخ موفقیت‌آمیز (در حالت واقعی توکن JWT برگردانید)
    return NextResponse.json(
      { success: true, user: { id: user.id, email: user.email } },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { error: 'خطای سرور' },
      { status: 500 }
    );
  }
}