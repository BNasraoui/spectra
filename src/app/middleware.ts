// Temporary middleware without real authentication, allows all requests during POC stage
import { NextResponse } from 'next/server';

// Allow all requests to pass through temporarily
export function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: ['/'], // Apply middleware to the home page for now
};
