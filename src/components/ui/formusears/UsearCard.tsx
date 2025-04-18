'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CiEdit } from 'react-icons/ci';
import { AiFillDelete } from 'react-icons/ai';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Session } from 'next-auth';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar?: string;
}

interface UserCardProps {
  user: User;
  session?: Session | null;
}

export default function UserCard({ user, session }: UserCardProps) {
  const router = useRouter();

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editData, setEditData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    avatar: user.avatar || '',
  });

  const handleUpdate = async () => {
    const res = await fetch('/api/users', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: user.id, ...editData }),
    });

    if (res.ok) {
      setEditOpen(false);
      router.refresh();
    }
  };

  const handleDelete = async () => {
    const res = await fetch('/api/users', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: user.id, email: user.email }),
    });

    if (res.ok) {
      setDeleteOpen(false);
      router.refresh();
    }
  };

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow">
        <div className="relative h-48 w-full">
          {user.avatar ? (
            <Image
              src={user.avatar.startsWith('http') ? user.avatar : `/${user.avatar}`}
              alt={`${user.first_name} ${user.last_name}`}
              fill
              className="rounded-t-lg object-cover"
            />

          ) : (
            <div className="h-full w-full bg-blue-50 flex items-center justify-center rounded-t-lg">
              <span className="text-3xl text-blue-500">
                {user.first_name[0]}
                {user.last_name[0]}
              </span>
            </div>
          )}
        </div>

        <div className="p-4">
          <CardHeader className="p-0">
            <h3 className="text-lg font-semibold">
              {user.first_name} {user.last_name}
            </h3>
          </CardHeader>

          <CardContent className="mt-2 p-0 space-y-2">
            <p className="text-sm">
              <span className="font-medium">Email:</span> {user.email}
            </p>
            <p className="text-sm">
              <span className="font-medium">User ID:</span> {user.id}
            </p>
          </CardContent>

          <div className="mt-4 flex justify-end space-x-3">
            <button
              onClick={() => setEditOpen(true)}
              title="Edit"
              className="hover:text-blue-800"
            >
              <CiEdit className="h-5 w-5" />
            </button>

            <button
              onClick={() => setDeleteOpen(true)}
              title="Delete"
              className="hover:text-red-800"
            >
              <AiFillDelete className="h-5 w-5 text-black" />
              {session?.user?.name && (
                <span className="sr-only">User: {session.user.name}</span>
              )}
            </button>
          </div>
        </div>
      </Card>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>First Name</Label>
              <Input
                value={editData.first_name}
                onChange={(e) =>
                  setEditData({ ...editData, first_name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Last Name</Label>
              <Input
                value={editData.last_name}
                onChange={(e) =>
                  setEditData({ ...editData, last_name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                value={editData.email}
                onChange={(e) =>
                  setEditData({ ...editData, email: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Avatar URL</Label>
              <Input
                value={editData.avatar}
                onChange={(e) =>
                  setEditData({ ...editData, avatar: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleUpdate}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this user?</p>
          <DialogFooter>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
