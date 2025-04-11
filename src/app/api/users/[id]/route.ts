import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';

export async function DELETE({ params }: { params: { id: string } }) {
  try {
    const id = await Promise.resolve(params.id);
    const data = await readDb();

    const updatedUsers = data.users.filter(
      (user: any) => String(user.id) !== String(id)
    );

    if (data.users.length === updatedUsers.length) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    data.users = updatedUsers;
    await writeDb(data);
    return NextResponse.json({
      message: 'User deleted successfully',
      users: updatedUsers,
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

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = await Promise.resolve(params.id);
    const body = await request.json();

    const data = await readDb();
    const userIndex = data.users.findIndex(
      (user: any) => String(user.id) === String(id)
    );

    if (userIndex === -1) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    data.users[userIndex] = { ...body, id };
    await writeDb(data);

    return NextResponse.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

export async function GET({ params }: { params: { id: string } }) {
  try {
    const data = await readDb();
    const user = data.users.find(
      (user: any) => String(user.id) === String(params.id)
    );

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}
