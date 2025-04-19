'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AddUserPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    avatar: '',
    phonenumber: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push('/dashboard/home');
      router.refresh();
    }
  };

  return (
    <div className="flex justify-center mt-12 px-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Add New User
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="first_name" className='p-1'>First Name</Label>
              <Input
              className='border-blue-500/50'
                id="first_name"
                value={form.first_name}
                onChange={(e) => setForm({ ...form, first_name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="last_name" className='p-1'>Last Name</Label>
              <Input
              className='border-blue-500/50'
                id="last_name"
                value={form.last_name}
                onChange={(e) => setForm({ ...form, last_name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="email" className='p-1'>Email</Label>
              <Input
              className='border-blue-500/50'
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="avatar" className='p-1'>Avatar URL (optional)</Label>
              <Input
              className='border-blue-500/50'
                id="avatar"
                value={form.avatar}
                onChange={(e) => setForm({ ...form, avatar: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="phonenumber" className='p-1'>Phone Number </Label>
              <Input
              className='border-blue-500/50'
                id="phonenumber"
                value={form.phonenumber}
                onChange={(e) => setForm({ ...form, phonenumber: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="password" className='p-1'>Password </Label>
              <Input
              className='border-blue-500/50'
                id="password"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
            <Button type="submit" className="w-full mt-2 bg-blue-500/90 hover:bg-blue-500/50">
              Add User
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
