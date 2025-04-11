import { NextResponse } from 'next/server';
import { UserData } from '@/types/types';
import { formDataSchema } from '@/schemas/user';
import { initDb, writeDb, generateToken } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const inputData = await request.json();
    const validationResult = formDataSchema.safeParse(inputData);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'اعتبارسنجی ناموفق',
          details: validationResult.error.issues.map(err => ({
            field: err.path[0],
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    const db = await initDb();

    if (db.users.some(user => user.email === inputData.email)) {
      return NextResponse.json(
        { error: 'این ایمیل قبلا ثبت شده است' },
        { status: 409 }
      );
    }

    const newUser: UserData = {
      id: Date.now(),
      ...validationResult.data,
      createdAt: new Date().toISOString(),
    };

    db.users.push(newUser);
    await writeDb(db);

    const token = generateToken(newUser.id.toString());

    return NextResponse.json(
      {
        success: true,
        user: newUser,
        token,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'خطای سرور' }, { status: 500 });
  }
}
