import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// API endpoint to retrieve OAuth token from cookie
// Used as fallback when hash fragment is lost
export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('github_token')?.value
    
    if (!token) {
      return NextResponse.json(
        { error: 'No token found' },
        { status: 404 }
      )
    }
    
    // Return token and delete cookie (one-time use)
    const response = NextResponse.json({ token })
    
    // Delete the cookie after reading
    response.cookies.set('github_token', '', {
      expires: new Date(0),
      path: '/',
      sameSite: 'lax',
      secure: true,
    })
    
    return response
  } catch (error) {
    console.error('Token retrieval error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve token' },
      { status: 500 }
    )
  }
}

