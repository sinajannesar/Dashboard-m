import Sidebar from '@/components/sidebar/sidebar';
// import Record from '@/components/ui/record';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/lib/auth';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await getServerSession(authOptions);

  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        {/* <Record session={session} /> */}
        <Sidebar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
