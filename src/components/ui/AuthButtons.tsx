// components/AuthButtons.tsx
import Link from 'next/link';

export default function AuthButtons() {
  return (
    <div className="flex gap-4">
      <Link href="/api/auth/login" className="bg-blue-500 text-white px-4 py-2 rounded">
        ورود
      </Link>
      <Link href="/api/auth/logout" className="bg-red-500 text-white px-4 py-2 rounded">
        خروج
      </Link>
    </div>
  );
}