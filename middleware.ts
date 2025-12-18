import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Redirect /admin to /admin/index.html to serve static HTML directly
  if (request.nextUrl.pathname === '/admin') {
    return NextResponse.redirect(new URL('/admin/index.html', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/admin',
}

