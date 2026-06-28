import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

// Initialize the next-intl middleware with your routing configuration
const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const locale = pathname.split('/')[1] || routing.defaultLocale;

  // Extract authentication tokens and user type from cookies
  const token = request.cookies.get('tkn')?.value;
  const userType = request.cookies.get('userType')?.value; // 'student' or 'patient'

  // 1. Auto-redirect logic: If logged-in user visits the root, redirect to their dashboard
  if (pathname === `/${locale}` && token && userType) {
    return NextResponse.redirect(new URL(`/${locale}/${userType}/dashboard`, request.url));
  }

  // 2. Prevent logged-in users from accessing Auth pages (Login/Register/Forget)
  const isAuthPath = pathname.includes('/login') || pathname.includes('/register') || pathname.includes('/forget-password');
  if (isAuthPath && token && userType) {
    return NextResponse.redirect(new URL(`/${locale}/${userType}/dashboard`, request.url));
  }

  // 3. Route Guard: Protect dashboard routes based on user type
  const isStudentPath = pathname.includes('/student/dashboard');
  const isPatientPath = pathname.includes('/patient/dashboard');

  // If student dashboard is accessed without student token
  if (isStudentPath && (!token || userType !== 'student')) {
    return NextResponse.redirect(new URL(`/${locale}/student/login`, request.url));
  }
  
  // If patient dashboard is accessed without patient token
  if (isPatientPath && (!token || userType !== 'patient')) {
    return NextResponse.redirect(new URL(`/${locale}/patient/login`, request.url));
  }

  // 4. Pass the request to the i18n middleware if all checks pass
  return intlMiddleware(request);
}

// Configuration to ignore static files and API routes
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};