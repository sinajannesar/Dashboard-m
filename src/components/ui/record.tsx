
'use client';

import { Session } from 'next-auth';

export default function Sidebar({ session }: { session: Session | null }) {
  return (
    <aside className="w-64 bg-white border-r p-6">
      <h2 className="text-lg font-semibold mb-4">Dashboard</h2>
      {session ? (
        <div>
          <p className="text-sm text-gray-700">
            Logged in as <strong>{session.user?.name || session.user?.email}</strong>
          </p>
        </div>
      ) : (
        <p className="text-sm text-gray-500">Not logged in</p>
      )}
    </aside>
  );
}
