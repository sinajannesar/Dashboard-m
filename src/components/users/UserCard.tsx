// src/components/users/UserCard.tsx

import Image from 'next/image';
import { CiEdit } from 'react-icons/ci';
import { AiFillDelete } from 'react-icons/ai';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { User } from '@/types/types';

interface UserCardProps {
  user: User;
  onEdit: (userId: number) => void;
  onDelete: (userId: number, userName: string) => void;
}

export default function UserCard({ user, onEdit, onDelete }: UserCardProps) {
  const handleEdit = () => {
    console.log(`Edit clicked for user: ${user.first_name}, ID: ${user.id}, ID Type: ${typeof user.id}`);
    const userId = typeof user.id === 'string' ? parseInt(user.id, 10) : user.id;
    onEdit(userId);
  };

  const handleDelete = () => {
    console.log(`Delete clicked for user: ${user.first_name}, ID: ${user.id}, ID Type: ${typeof user.id}`);
    const userId = typeof user.id === 'string' ? parseInt(user.id, 10) : user.id;
    onDelete(userId, `${user.first_name} ${user.last_name}`);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="relative h-36 sm:h-48 w-full flex items-center justify-center bg-blue-100 text-blue-600 text-2xl sm:text-3xl font-bold">
        {user.avatar ? (
          <Image
            src={user.avatar}
            alt={`${user.first_name} ${user.last_name}`}
            fill
            className="rounded-t-lg object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={user.id <= 3}
          />
        ) : (
          `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`.toUpperCase()
        )}
      </div>

      <div className="p-3 sm:p-4">
        <CardHeader className="p-0">
          <h3 className="text-base sm:text-lg font-semibold">
            {user.first_name} {user.last_name}
          </h3>
        </CardHeader>

        <CardContent className="mt-2 p-0 space-y-1 sm:space-y-2">
          <p className="text-xs sm:text-sm">
            <span className="font-medium">Email:</span> {user.email}
          </p>
          <p className="text-xs sm:text-sm">
            <span className="font-medium">User ID:</span> {user.id}
          </p>
        </CardContent>

        <div className="mt-3 sm:mt-4 flex justify-end space-x-2 sm:space-x-3">
          <button
            onClick={handleEdit}
            className="text-blue-600 hover:text-blue-800"
            title="Edit"
          >
            <CiEdit className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800"
            title="Delete"
          >
            <AiFillDelete className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
      </div>
    </Card>
  );
}