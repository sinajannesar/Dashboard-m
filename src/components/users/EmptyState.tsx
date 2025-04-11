// src/components/users/EmptyState.tsx
import Link from 'next/link';

export default function EmptyState() {
  return (
    <div className="text-center py-8 sm:py-12">
      <p className="text-gray-500 text-base sm:text-lg">Not Found User</p>
      <Link
        href="/dashboard/users/addprofile"
        className="text-blue-600 hover:underline mt-2 inline-block text-sm sm:text-base"
      >
        Add New Users
      </Link>
    </div>
  );
}