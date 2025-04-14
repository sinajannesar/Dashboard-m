import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const data = await readDb();
    const users = Array.isArray(data.users) ? data.users : [];

    const url = new URL(request.url);
    const userId = url.searchParams.get('id'); // بررسی وجود id در query params

    if (userId) {
      const user = users.find((u: any) => String(u.id) === String(userId));
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      return NextResponse.json({ user }); // بازگرداندن کاربر خاص در قالب آبجکت با کلید user
    }

    return NextResponse.json({ users }); // بازگرداندن لیست کاربران در قالب آبجکت با کلید users
  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = await readDb();

    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    const newUser = {
      id: Date.now().toString(),
      ...body,
    };

    data.users.push(newUser);
    await writeDb(data);

    return NextResponse.json({
      message: 'User added successfully',
      user: newUser,
    });
  } catch (error) {
    console.error('Create error:', error);
    return NextResponse.json({ error: 'Failed to add user' }, { status: 500 });
  }
}
