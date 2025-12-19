import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Don't interfere with API routes - they must work for OAuth
  if (pathname.startsWith('/api/')) {
    return NextResponse.next()
  }
  
  // Redirect /admin to /admin/index.html to serve static HTML directly
  // Preserve hash fragment if present (for OAuth token)
  if (pathname === '/admin') {
    const url = new URL('/admin/index.html', request.url)
    // Preserve hash fragment from original URL
    if (request.url.includes('#')) {
      const hash = request.url.split('#')[1]
      url.hash = hash
    }
    return NextResponse.redirect(url)
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/admin',
}

