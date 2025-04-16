import Image from 'next/image';
import Link from 'next/link';
import { CiEdit } from 'react-icons/ci';
import { AiFillDelete } from 'react-icons/ai';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Session } from "next-auth"; 

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
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full">
        {user.avatar ? (
          <Image
            src={user.avatar.startsWith('/') ? user.avatar : `/${user.avatar}`}
            alt={`${user.first_name} ${user.last_name}`}
            fill
            className="rounded-t-lg object-cover"
          />
        ) : (
          <div className="h-full w-full bg-blue-50 flex items-center justify-center rounded-t-lg">
            <span className="text-3xl text-blue-500">
              {user.first_name[0]}{user.last_name[0]}
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
            <span className="font-medium">User id:</span> {user.id}
          </p>
        </CardContent>

        <div className="mt-4 flex justify-end space-x-3">
          <Link
            href={`/users/edit/${user.id}`}
            className="hover:text-blue-800"
            title="edit"
          >
            <CiEdit className="h-5 w-5" />
          </Link>
          <Link
            href={`/users/delete/${user.id}`}
            className="hover:text-red-800"
            title="delete"
          >
            <AiFillDelete className="h-5 w-5 text-black" />
            {session?.user?.name && (
              <span className="sr-only">User: {session.user.name}</span>
            )}
          </Link>
        </div>
      </div>
    </Card>
  );
}
