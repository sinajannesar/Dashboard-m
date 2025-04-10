import Image from 'next/image';
import Link from 'next/link';
import { CiEdit } from 'react-icons/ci';
import { AiFillDelete } from 'react-icons/ai';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { fetchUsers } from '@/services/useerservis';
import { Suspense } from 'react';


export default async function UsersList() {
  const users = await fetchUsers();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800"> User List</h1>
        <Link 
          href="/users/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-semibold"
        >
          Add usear
        </Link>
      </div>

      {users.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg"> Not Found Usear</p>
          <Link 
            href="/users/add"
            className="text-blue-600 hover:underline mt-2 inline-block"
          >
            Add New Users
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {users.map((user) => (
            <Card key={user.id} className="hover:shadow-lg transition-shadow">
              <div className="relative h-48 w-full">
                <Suspense>
                <Image
                  src={typeof user.avatar === 'string' && user.avatar ? user.avatar : '/default-avatar.jpg'}
                  alt={`${user.first_name} ${user.last_name}`}
                  fill
                  className="rounded-t-lg object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  priority={user.id <= 3}
                />
                </Suspense>
                
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
                    <span className="font-medium">Usear id:</span> {user.id}
                  </p>
                </CardContent>

                <div className="mt-4 flex justify-end space-x-3">
                  <Link
                    href={`/users/edit/${user.id}`}
                    className=" hover:text-blue-800"
                    title="cheng"
                  >
                    <CiEdit className="h-5 w-5" />
                  </Link>
                  <Link
                    href={`/users/delete/${user.id}`}
                    className=" hover:text-red-800"
                    title="delet"
                  >
                    <AiFillDelete className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}