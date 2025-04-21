// lib/actions/addUser.ts
"use server"

import { redirect } from 'next/navigation';
import fs from 'fs';
import path from 'path';

type UserData = {
  first_name: string;
  last_name: string;
  email: string;
  avatar?: string;
  phonenumber?: string;
  password: string;
};

type User = UserData & {
  id: number;
};

type DbData = {
  data: User[];
  total: number;
  total_pages: number;
  per_page: number;
};

// خواندن داده‌ها از فایل db.json
async function readData(): Promise<DbData> {
  const dbPath = path.join(process.cwd(), 'db.json');
  
  try {
    const fileData = await fs.promises.readFile(dbPath, 'utf-8');
    return JSON.parse(fileData);
  } catch {
    // اگر فایل وجود نداشت یا خالی بود، یک ساختار پایه ایجاد می‌کنیم
    return {
      data: [],
      total: 0,
      total_pages: 0,
      per_page: 6
    };
  }
}

// نوشتن داده‌ها در فایل db.json
async function writeData(data: DbData): Promise<void> {
  const dbPath = path.join(process.cwd(), 'db.json');
  await fs.promises.writeFile(dbPath, JSON.stringify(data, null, 2));
}

// تابع اصلی افزودن کاربر با قابلیت ریدایرکت
export async function AddUser(
  userData: UserData,
  shouldRedirect: boolean = false
) {
  try {
    const data = await readData();
    
    // پیدا کردن بالاترین شناسه
    const highestId = data.data.reduce(
      (max: number, user: User) => Math.max(max, user.id),
      0
    );
    
    const newUser: User = {
      ...userData,
      id: highestId + 1,
      avatar: userData.avatar || `https://reqres.in/img/faces/2-image.jpg`,
      password: userData.password || "1234"
    };
    
    // افزودن کاربر جدید به آرایه
    data.data.push(newUser);
    data.total = data.data.length;
    data.total_pages = Math.ceil(data.total / data.per_page);
    
    // ذخیره داده‌ها
    await writeData(data);
    
    // اگر پارامتر ریدایرکت true باشد، به صفحه داشبورد هدایت می‌شود
    if (shouldRedirect) {
      redirect('/dashboard/home');
    }
    
    // برگرداندن کاربر جدید بدون رمز عبور
    const { password:_, ...userWithoutPassword } = newUser;
    return { success: true, user: userWithoutPassword };
    
  } catch (error) {
    console.error('Error adding user:', error);
    return { success: false,  };
  }
}