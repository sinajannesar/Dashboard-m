import Sidebar from "@/components/sidebar/sidebar";

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
