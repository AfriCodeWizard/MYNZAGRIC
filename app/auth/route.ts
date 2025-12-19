import { NextRequest, NextResponse } from 'next/server'

// Decap CMS is requesting /auth instead of /api/auth
// This route forwards the request to /api/auth
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const baseUrl = request.nextUrl.origin
  
  // Forward all query parameters to /api/auth
  const params = new URLSearchParams(searchParams)
  const redirectUrl = `${baseUrl}/api/auth?${params.toString()}`
  
  return NextResponse.redirect(redirectUrl)
}

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const baseUrl = request.nextUrl.origin
  
  // Forward all query parameters to /api/auth
  const params = new URLSearchParams(searchParams)
  const redirectUrl = `${baseUrl}/api/auth?${params.toString()}`
  
  return NextResponse.redirect(redirectUrl)
}

