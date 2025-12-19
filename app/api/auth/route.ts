import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  return handleAuth(request)
}

export async function POST(request: NextRequest) {
  return handleAuth(request)
}

async function handleAuth(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const baseUrl = request.nextUrl.origin

  // If no code, redirect to GitHub OAuth (initial auth request)
  // This handles both Decap CMS initial request and direct browser requests
  if (!code) {
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

  // Exchange code for token (OAuth callback)
  try {
    if (!process.env.GITHUB_CLIENT_SECRET) {
      console.error('GITHUB_CLIENT_SECRET is not set')
      return NextResponse.json(
        { error: 'OAuth configuration error: Client secret missing' },
        { status: 500 }
      )
    }

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

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text()
      console.error('GitHub token exchange failed:', errorText)
      return NextResponse.json(
        { error: 'Failed to exchange code for token' },
        { status: tokenResponse.status }
      )
    }

    const tokenData = await tokenResponse.json()

    if (tokenData.error) {
      console.error('GitHub OAuth error:', tokenData)
      return NextResponse.json(
        { error: tokenData.error_description || tokenData.error },
        { status: 400 }
      )
    }

    if (!tokenData.access_token) {
      console.error('No access token in response:', tokenData)
      return NextResponse.json(
        { error: 'No access token received from GitHub' },
        { status: 500 }
      )
    }

    // Redirect back to admin with token in hash fragment
    // CRITICAL: Use #token= not #/token= (Decap CMS expects #token=)
    // Next.js redirect() doesn't preserve hash fragments, so we use an HTML page with JS redirect
    const token = tokenData.access_token
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Redirecting...</title>
  <meta http-equiv="refresh" content="0;url=${baseUrl}/admin/index.html#token=${token}">
</head>
<body>
  <script>
    // Immediate redirect - CRITICAL: Use #token= not #/token=
    (function() {
      try {
        // Primary method: location.replace (doesn't add to history)
        window.location.replace('${baseUrl}/admin/index.html#token=${token}');
      } catch (e) {
        // Fallback: location.href
        window.location.href = '${baseUrl}/admin/index.html#token=${token}';
      }
    })();
  </script>
  <noscript>
    <p>Redirecting to admin... <a href="${baseUrl}/admin/index.html#token=${token}">Click here</a> if you are not redirected.</p>
  </noscript>
</body>
</html>
    `.trim()
    
    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0',
        'X-Frame-Options': 'SAMEORIGIN',
      },
    })
  } catch (error) {
    console.error('OAuth error:', error)
    return NextResponse.json(
      { error: 'Authentication failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

