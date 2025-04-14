import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';

/**
 * API جایگزین برای حذف کاربر با استفاده از متد POST به جای DELETE
 * این روش مشکلات احتمالی مربوط به Preflight Request را دور می‌زند
 */
export async function POST(request: Request) {
  try {
    // دریافت و بررسی body
    let body;
    try {
      body = await request.json();
    } catch (err) {
      console.error('Invalid JSON in request body:', err);
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    // بررسی وجود userId در body
    const userId = body?.userId;
    if (!userId && userId !== 0) {
      console.log('No userId provided in request body');
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    console.log(`Alternative API: Trying to delete user with ID: ${userId}`);

    const data = await readDb();
    if (!data?.users || !Array.isArray(data.users)) {
      console.log('Invalid data structure in database');
      return NextResponse.json(
        { error: 'Invalid data structure' },
        { status: 500 }
      );
    }

    // گزارش وضعیت کاربران
    console.log(`Found ${data.users.length} users in database`);
    console.log(`Looking for user with ID (as string): ${String(userId)}`);

    // جستجوی کاربر
    const userToDelete = data.users.find(
      user => String(user.id) === String(userId)
    );

    if (!userToDelete) {
      console.log(`User with ID ${userId} not found`);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    console.log(
      `Found user to delete: ${userToDelete.first_name} ${userToDelete.last_name}`
    );

    // حذف کاربر
    data.users = data.users.filter(user => String(user.id) !== String(userId));
    await writeDb(data);

    console.log(`Successfully deleted user with ID: ${userId}`);
    return NextResponse.json({
      message: 'User deleted successfully',
      deletedUserId: userId,
    });
  } catch (error) {
    console.error('Delete alternative API error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to delete user',
      },
      { status: 500 }
    );
  }
}
