import Link from 'next/link';
import dynamic from 'next/dynamic';
import { fetchUsers } from '@/services/useerservis';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
// import UserCard from '@/components/ui/formusears/UsearCard';
const UserCard = dynamic(() => import('@/components/ui/formusears/UsearCard'));

export default async function UsersList() {
  const session = await getServerSession(authOptions);
  const users = await fetchUsers();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">User List</h1>

        <Link
          href="/dashboard/users/addprofile"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-semibold"
        >
          Add user
        </Link>
      </div>

      {users.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Not Found User</p>

          <Link
            href="/users/addprofile"
            className="text-blue-600 hover:underline mt-2 inline-block"
          >
            Add New Users
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              session={session!}
            />
          ))}
        </div>
      )}
    </div>
  );
}