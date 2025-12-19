import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Don't interfere with API routes - they must work for OAuth
  if (pathname.startsWith('/api/')) {
    return NextResponse.next()
  }
  
  // Redirect /admin to /admin/index.html to serve static HTML directly
  // Note: Hash fragments are client-side only and cannot be preserved in server-side redirects
  // The OAuth redirect should go directly to /admin/index.html#token=... to avoid this redirect
  if (pathname === '/admin') {
    return NextResponse.redirect(new URL('/admin/index.html', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/admin',
}

