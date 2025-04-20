// hooks/useAddUser.ts
"use client"
import { useRouter } from 'next/navigation';
import axios from 'axios';

export const AddUser = (userData: { first_name: string, last_name: string, email: string, avatar: string, phonenumber?: string, password: string }) => {
  const router = useRouter();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/users', userData, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.status === 200) {
        router.push('/dashboard/home');
        router.refresh();
      }
    } catch (err) {
      console.error('Error adding user:', err);
    }
  };

  return { handleSubmit };
};
