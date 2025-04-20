'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AddUser } from '@/hooks/useAdduser';

export default function AddUserForm() {
  const { form, handleChange, handleSubmit } = AddUser();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-gray-800">Add New User</CardTitle>
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
              <div key={id} className="space-y-1">
                <Label htmlFor={id} className="block text-sm font-medium text-gray-600">{label}</Label>
                <Input
                  id={id}
                  type={type}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={form[id as keyof typeof form]}
                  onChange={(e) => handleChange(id, e.target.value)}
                  required
                />
              </div>
            ))}

            <Button 
              type="submit" 
              className="w-full mt-4 bg-blue-500 hover:bg-blue-400 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Add User
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
