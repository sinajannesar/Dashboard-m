import { User } from "@/types/types";
import { promises as fs } from 'fs';
import path from 'path';

export async function fetchUsers(): Promise<User[]> {
  try {
    // 1. Fetch from external API
    const apiResponse = await fetch('https://reqres.in/api/users');
    if (!apiResponse.ok) throw new Error('External API failed');
    const apiData = await apiResponse.json();

    // 2. Read local db.json
    const dbPath = path.join(process.cwd(), 'db.json');
    const dbContents = await fs.readFile(dbPath, 'utf-8');
    const dbData = JSON.parse(dbContents);

    // 3. Validate data structure
    if (!Array.isArray(apiData?.data) || !Array.isArray(dbData?.users)) {
      throw new Error('Invalid data structure');
    }

    // 4. Combine and deduplicate
    const combinedUsers = [...apiData.data, ...dbData.users];
    const uniqueUsers = combinedUsers.filter(
      (user, index, self) => index === self.findIndex(u => u.id === user.id)
    );

    return uniqueUsers as User[];
  } catch (error) {
    console.error('Fetching failed:', error);
    return [];
  }
}