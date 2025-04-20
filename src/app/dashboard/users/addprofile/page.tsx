'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AddUser } from '@/hooks/useAdduser';

export default function AddUserForm() {
  const { form, handleChange, handleSubmit } = AddUser();

  return (
    <Card className="w-full max-w-md shadow-xl rounded-2xl">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">Add New User</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { label: 'First Name', id: 'first_name' },
            { label: 'Last Name', id: 'last_name' },
            { label: 'Email', id: 'email', type: 'email' },
            { label: 'Avatar URL (optional)', id: 'avatar' },
            { label: 'Phone Number', id: 'phonenumber' },
            { label: 'Password', id: 'password', type: 'password' },
          ].map(({ label, id, type = 'text' }) => (
            <div key={id}>
              <Label htmlFor={id} className="p-1">{label}</Label>
              <Input
                id={id}
                type={type}
                className="border-blue-500/50"
                value={form[id as keyof typeof form]}
                onChange={(e) => handleChange(id, e.target.value)}
              />
            </div>
          ))}

          <Button type="submit" className="w-full mt-2 bg-blue-500/90 hover:bg-blue-500/50">
            Add User
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
