'use client';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Suspense, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CiEdit } from 'react-icons/ci';
import { AiFillDelete } from 'react-icons/ai';
import { Card } from '@/components/ui/card';
import { Session } from 'next-auth';
import axios from 'axios';
const EditDialog = dynamic(() => import('../usreamodal/usermodals').then(mod => mod.EditDialog));
const DeleteDialog = dynamic(() => import('../usreamodal/usermodals').then(mod => mod.DeleteDialog));

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar?: string;
}

interface UserCardProps {
  user: User;
  session: Session ;
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
    const res = await axios.put('/api/users', {
      id: user.id,
      ...editData,
    }, {
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (res.status === 200) {
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
        <div className="relative w-full aspect-[3/2]">
          {user.avatar ? (
            <Suspense fallback={<div>Loading...</div>}>
              <Image
                src={user.avatar.startsWith("http") ? user.avatar : `/${user.avatar}`}
                alt={`${user.first_name} ${user.last_name}`}
                fill
                priority 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </Suspense>
          ) : (
            <div className="w-full h-full bg-blue-50 flex items-center justify-center">
              <span className="text-3xl text-blue-500">
                {user.first_name[0]}
                {user.last_name[0]}
              </span>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold">
            {user.first_name} {user.last_name}
          </h3>

          <div className="mt-2 text-sm space-y-1 text-gray-700">
            <p><span className="font-medium">Email:</span> {user.email}</p>
            <p><span className="font-medium">User ID:</span> {user.id}</p>
          </div>

          <div className="mt-4 flex justify-end gap-3 text-gray-600">
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
              className="hover:text-red-600"
            >
              <AiFillDelete className="h-5 w-5" />
              {session?.user?.name && (
                <span className="sr-only">User: {session.user.name}</span>
              )}
            </button>
          </div>
        </div>
      </Card>

      <EditDialog
        open={editOpen}
        setOpen={setEditOpen}
        editData={editData}
        setEditData={setEditData}
        onSave={handleUpdate}
      />

      <DeleteDialog
        open={deleteOpen}
        setOpen={setDeleteOpen}
        onDelete={handleDelete}
      />
    </>
  );
}
