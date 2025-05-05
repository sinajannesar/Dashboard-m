import { NextRequest, NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';
import {UserData} from "@/types/types"


export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { id, first_name, last_name, email, phonnumber } = body;

  if (!id || !email) {
    return NextResponse.json({ message: 'Invalid user data' }, { status: 400 });
  }

  const db = await readDb();
  const userIndex = db.users.findIndex((user: UserData) => user.id === id);

  if (userIndex === -1) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  const updatedUser = {
    ...db.users[userIndex],
    first_name,
    last_name,
    email,
    phonnumber
  };

  db.users[userIndex] = updatedUser;
  await writeDb(db);

  return NextResponse.json({ message: 'User updated successfully' });
}



export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const { id, email } = body;

  if (!id || !email) {
    return NextResponse.json({ message: 'Invalid data' }, { status: 400 });
  }

  const db = await readDb();
  const userIndex = db.users.findIndex(
    (user: UserData) => user.id === id && user.email === email
  );

  if (userIndex === -1) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  db.users.splice(userIndex, 1);
  await writeDb(db);

  return NextResponse.json({ message: 'User deleted successfully' });
}





export async function POST(req: NextRequest) {
  const body = await req.json();
  const { first_name, last_name, email, avatar } = body;

  if (!first_name || !last_name || !email) {
    return NextResponse.json({ message: 'Invalid data' }, { status: 400 });
  }

  const db = await readDb();

  const newUser: UserData = {
    id: Date.now(),
    first_name,
    last_name,
    email,
    avatar: avatar || '',
    phonenumber: body.phonenumber || '',    
    password: body.password || '',          
    createdAt: new Date().toISOString(),   
  };

  db.users.push(newUser);
  await writeDb(db);

  return NextResponse.json({ message: 'User added successfully', user: newUser }, { status: 201 });
}
