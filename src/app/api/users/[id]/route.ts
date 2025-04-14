import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';

interface RequestContext {
  params: {
    id: string;
  };
}

export async function DELETE({ params }: RequestContext) {
  try {
    // لاگ ساختار دقیق params
    console.log(`Received DELETE request with params:`, JSON.stringify(params));

    // بررسی وجود params.id به طور صحیح
    if (
      !params ||
      typeof params !== 'object' ||
      !('id' in params) ||
      !params.id
    ) {
      console.log('No valid ID provided in request params');
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // آیدی کاربر برای حذف
    const userId = params.id;
    console.log(
      `Trying to delete user with ID: ${userId}, Type: ${typeof userId}`
    );

    const data = await readDb();
    if (!data?.users || !Array.isArray(data.users)) {
      console.log('Invalid data structure in database');
      return NextResponse.json(
        { error: 'Invalid data structure' },
        { status: 500 }
      );
    }

    // گزارش تعداد کاربران و آیدی‌های آنها برای عیب‌یابی
    console.log(`Found ${data.users.length} users in database`);
    console.log(
      `User IDs in database: ${data.users
        .map(u => `${u.id} (${typeof u.id})`)
        .join(', ')}`
    );

    // Check if user ID exists
    const userIdsInString = data.users.map(u => String(u.id));
    console.log(`User IDs as strings: ${userIdsInString.join(', ')}`);
    console.log(`Looking for ID (as string): ${String(userId)}`);
    console.log(
      `ID exists in array: ${userIdsInString.includes(String(userId))}`
    );

    // جستجوی کاربر با استفاده از تبدیل هر دو مقدار به رشته
    const userToDelete = data.users.find(
      user => String(user.id) === String(userId)
    );

    if (!userToDelete) {
      console.log(`User with ID ${userId} not found in database`);
      return NextResponse.json(
        {
          error: 'User not found',
          requestedId: userId,
          availableIds: data.users.map(u => u.id),
        },
        { status: 404 }
      );
    }

    console.log(
      `Found user to delete: ${userToDelete.first_name} ${userToDelete.last_name} with ID ${userToDelete.id}`
    );

    // حذف کاربر از آرایه
    const originalLength = data.users.length;
    data.users = data.users.filter(user => String(user.id) !== String(userId));
    const newLength = data.users.length;

    console.log(`Users before: ${originalLength}, after: ${newLength}`);

    if (originalLength === newLength) {
      console.log(`WARNING: User was found but not removed!`);
    }

    await writeDb(data);
    console.log(`Successfully deleted user with ID: ${userId}`);

    return NextResponse.json({
      message: 'User deleted successfully',
      deletedUserId: userId,
    });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to delete user',
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: RequestContext) {
  try {
    const { id } = params;
    const body = await request.json();

    const data = await readDb();
    if (!data?.users || !Array.isArray(data.users)) {
      return NextResponse.json(
        { error: 'Invalid data structure' },
        { status: 500 }
      );
    }

    const userIndex = data.users.findIndex(
      (user: any) => String(user.id) === String(id)
    );

    if (userIndex === -1) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    data.users[userIndex] = { ...body, id };
    await writeDb(data);

    return NextResponse.json({
      message: 'User updated successfully',
      user: data.users[userIndex],
    });
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}
