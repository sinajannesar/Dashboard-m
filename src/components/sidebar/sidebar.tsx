'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Sidebar() {
  const pathname = usePathname();
  const [isUsersOpen, setIsUsersOpen] = useState(false);

  return (
    <div className="flex h-screen left-0 top-0">
      <div className="relative flex w-64 flex-col bg-gradient-to-b from-blue-600 to-blue-800 p-6 shadow-2xl">
        <header className="mb-10">
          <h2 className="text-2xl font-bold tracking-wide text-white">
            Dashboard
          </h2>
          <div className="mt-4 h-0.5 bg-blue-400/50" />
        </header>

        <nav className="flex-1">
          <ul className="flex flex-col space-y-2">
            <li>
              <Link
                href="/dashboard/home"
                className={`flex items-center gap-3 rounded-lg px-4 py-2.5 transition-all duration-200 ${
                  pathname === '/dashboard/home'
                    ? 'bg-blue-500/50 text-white shadow-lg'
                    : 'text-blue-100/90 hover:bg-blue-500/30 hover:text-white'
                }`}
              >
                <span className="font-medium">Home</span>
              </Link>
            </li>

            <li>
              <button
                onClick={() => setIsUsersOpen(!isUsersOpen)}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-left transition-all duration-400 ${
                  pathname.startsWith('/dashboard/users')
                    ? 'bg-blue-500/50 text-white shadow-lg'
                    : 'text-blue-100/90 hover:bg-blue-500/30 hover:text-white'
                }`}
              >
                <span className="font-medium">Users</span>
              </button>

              {isUsersOpen && (
                <ul className="ml-6 mt-1 space-y-1">
                  <li>
                    <Link
                      href="/dashboard/users/addprofile"
                      className="block rounded-lg px-4 py-2 text-blue-200 hover:bg-blue-500/30 hover:text-white"
                    >
                      Add profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/users/editprofile"
                      className="block rounded-lg px-4 py-2 text-blue-200 hover:bg-blue-500/30 hover:text-white"
                    >
                      Edit profile
                    </Link>
                  </li>
              
                </ul>
              )}
            </li>
          </ul>
        </nav>

        <div className="sticky bottom-0 left-0 right-0 mt-auto pt-6">
          <Link
            href="/"
            className={`flex items-center gap-3 rounded-lg px-4 py-2.5 transition-all duration-200 ${
              pathname === '/'
                ? 'bg-blue-500/50 text-white shadow-lg'
                : 'text-blue-100/90 hover:bg-blue-500/30 hover:text-white'
            }`}
          >
            <span className="font-medium">Return to the first page</span>
          </Link>
        </div>
      </div>
    </div>
  );
}