import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  
  if (pathname.startsWith('/dashboard')) {
    const token = await getToken({ 
      req, 
      secret: process.env.NEXTAUTH_SECRET 
    });
    
    if (!token) {
      console.log('دسترسی رد شد: توکن یا سشن نامعتبر است');
      
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('callbackUrl', encodeURI(pathname));
      
      return NextResponse.redirect(loginUrl);
    }
    
    if (!token.email || !token.id) {
      console.log('دسترسی رد شد: اطلاعات کاربر در توکن ناقص است');
      
      const response = NextResponse.redirect(new URL('/login', req.url));
      
      response.cookies.delete('next-auth.session-token');
      response.cookies.delete('next-auth.csrf-token');
      response.cookies.delete('next-auth.callback-url');
      
      return response;
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard',
    '/dashboard/:path*',
  ],
};