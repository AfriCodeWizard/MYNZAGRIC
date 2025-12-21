import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Don't interfere with API routes or /admin - let them pass through
  // /admin/ is served as static file via Next.js rewrites (see next.config.mjs)
  if (pathname.startsWith('/api/') || pathname.startsWith('/admin')) {
    return NextResponse.next()
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/api/:path*',
    '/admin/:path*'
  ],
}

