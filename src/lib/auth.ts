// import { jwtDecode } from 'jwt-decode';

// // Dynamically imported components
// export const login = async (email: string, password: string) => {
//   const response = await fetch('/api/auth/login', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ email, password }),
//   });

//   if (!response.ok) {
//     const error = await response.json();
//     throw new Error(error.message || 'ورود ناموفق بود');
//   }

//   return response.json();
// };

// export const loadUserProfile = async () => {
//   const module = await import('@/lib/user');
//   return module.getUserProfile();
// };