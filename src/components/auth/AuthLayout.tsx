// "use client";
// import dynamic from 'next/dynamic';
// import { ReactNode } from 'react';

// // Lazy-load heavy components
// const Logo = dynamic(() => import('@/components/ui/Logo'));
// const Footer = dynamic(() => import('@/components/ui/Footer'));

// type AuthLayoutProps = {
//   children: ReactNode;
//   title: string;
// };

// export default function AuthLayout({ children, title }: AuthLayoutProps) {
//   return (
//     <div className="min-h-screen flex flex-col">
//       <header className="p-4">
//         <Suspense fallback={<div className="h-12 w-32 bg-gray-200 rounded" />}>
//           <Logo />
//         </Suspense>
//       </header>
      
//       <main className="flex-grow flex items-center justify-center p-4">
//         <div className="w-full max-w-md">
//           <h1 className="text-2xl font-bold text-center mb-6">{title}</h1>
//           {children}
//         </div>
//       </main>
      
//       <Suspense fallback={<div className="h-20 bg-gray-100" />}>
//         <Footer />
//       </Suspense>
//     </div>
//   );
// }