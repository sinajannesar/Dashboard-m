// "use client";
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import dynamic from 'next/dynamic';

// // Lazy-load heavy components
// const PasswordInput = dynamic(
//   () => import('@/components/ui/PasswordInput'),
//   { 
//     loading: () => <input type="password" className="..." />,
//     ssr: false 
//   }
// );

// export default function LoginForm() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       const authModule = await import('@/lib/auth');
//       const { login } = authModule;
      
//       await login(email, password);
//       router.push('/dashboard');
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'خطای ناشناخته');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       {/* Email Input */}
//       <input
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         type="email"
//         placeholder="ایمیل"
//         required
//         className="w-full p-2 border rounded"
//       />
      
//       {/* Lazy-loaded Password Input */}
//       <PasswordInput
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />
      
//       {error && <div className="text-red-500">{error}</div>}
      
//       <button 
//         type="submit" 
//         disabled={loading}
//         className="w-full bg-blue-500 text-white p-2 rounded disabled:opacity-50"
//       >
//         {loading ? 'در حال ورود...' : 'ورود'}
//       </button>
//     </form>
//   );
// }