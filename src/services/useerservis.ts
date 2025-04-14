import { User } from '@/types/types';
import { readDb } from '@/lib/db';

export async function fetchUsers(): Promise<User[]> {
  try {
    const apiResponse = await fetch('https://reqres.in/api/users');
    if (!apiResponse.ok) throw new Error('External API failed');
    const apiData = await apiResponse.json();

    const dbData = await readDb();
    
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
