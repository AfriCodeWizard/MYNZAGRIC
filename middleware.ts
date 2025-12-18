import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Don't interfere with API routes
  if (pathname.startsWith('/api/')) {
    return NextResponse.next()
  }
  
  // Redirect /admin to /admin/index.html to serve static HTML directly
  if (pathname === '/admin') {
    return NextResponse.redirect(new URL('/admin/index.html', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/admin',
}

