'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  
  let errorMessage = 'An error occurred during authentication';
  
  if (error === 'OAuthSignin') {
    errorMessage = 'Error connecting to Auth0. Please try again later.';
  } else if (error === 'Configuration') {
    errorMessage = 'There is a problem with the server configuration.';
  } else if (error === 'AccessDenied') {
    errorMessage = 'Access was denied to this resource.';
  }
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-red-600 mb-4">Authentication Error</h2>
        <p className="text-gray-600 mb-6">{errorMessage}</p>
        <Link 
          href="/auth/login"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          Return to Login
        </Link>
      </div>
    </div>
  );
}