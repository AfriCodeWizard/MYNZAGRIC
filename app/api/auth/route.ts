import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const state = searchParams.get('state')

  if (!code) {
    // Redirect to GitHub OAuth
    const baseUrl = request.nextUrl.origin
    const params = new URLSearchParams({
      client_id: process.env.GITHUB_CLIENT_ID || 'Ov23liMog49BcJaN6uzJ',
      redirect_uri: `${baseUrl}/api/auth`,
      scope: 'repo',
      state: state || Math.random().toString(36).substring(7),
    })

    return NextResponse.redirect(
      `https://github.com/login/oauth/authorize?${params.toString()}`
    )
  }

  // Exchange code for token
  try {
    const baseUrl = request.nextUrl.origin
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID || 'Ov23liMog49BcJaN6uzJ',
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: `${baseUrl}/api/auth`,
      }),
    })

    const tokenData = await tokenResponse.json()

    if (tokenData.error) {
      return NextResponse.json(
        { error: tokenData.error_description || tokenData.error },
        { status: 400 }
      )
    }

    // Redirect back to admin with token in hash
    const redirectUrl = `${baseUrl}/admin#token=${tokenData.access_token}`
    return NextResponse.redirect(redirectUrl)
  } catch (error) {
    console.error('OAuth error:', error)
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
}

