import Sidebar from '@/components/sidebar/sidebar';
import Record from '@/components/ui/record';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { SessionProvider } from 'next-auth/react';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        {/* Provide session to client-side components too */}
        <SessionProvider session={session}>
          <div className="h-screen flex flex-col">
            <div className="flex flex-1 overflow-hidden">
              {/* Show session in a debug/info component */}
              <Record session={session} />
              {/* Sidebar can receive session as prop */}
              <Sidebar />

              {/* Main content */}
              <main className="flex-1 overflow-auto">
                {children}
              </main>
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
