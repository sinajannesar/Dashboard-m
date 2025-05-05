import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';

export const AddUser = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    avatar: '',
    phonenumber: '',
    password: '',
  });

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/users', form, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.status >= 200 && res.status < 300) {
        router.push('/dashboard/home');
        router.refresh();
      }
      
    } catch (err) {
      console.error('Error adding user:', err);
    }
  };

  return {
    form,
    handleChange,
    handleSubmit,
  };
};
