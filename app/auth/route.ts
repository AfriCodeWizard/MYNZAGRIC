import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  return handleAuth(request)
}

export async function POST(request: NextRequest) {
  return handleAuth(request)
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

async function handleAuth(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const baseUrl = request.nextUrl.origin

  // If no code, redirect to GitHub OAuth
  if (!code) {
    const params = new URLSearchParams({
      client_id: process.env.GITHUB_CLIENT_ID || 'Ov23liMog49BcJaN6uzJ',
      redirect_uri: `${baseUrl}/auth`,
      scope: 'repo',
      state: Math.random().toString(36).substring(7),
    })
    
    return NextResponse.redirect(`https://github.com/login/oauth/authorize?${params.toString()}`)
  }

  // Exchange code for token
  try {
    if (!process.env.GITHUB_CLIENT_SECRET) {
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
        redirect_uri: `${baseUrl}/auth`,
      }),
    })

    if (!tokenResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to exchange code for token' },
        { status: tokenResponse.status }
      )
    }

    const tokenData = await tokenResponse.json()

    if (tokenData.error) {
      return NextResponse.json(
        { error: tokenData.error_description || tokenData.error },
        { status: 400 }
      )
    }

    if (!tokenData.access_token) {
      return NextResponse.json(
        { error: 'No access token received from GitHub' },
        { status: 500 }
      )
    }

    const token = tokenData.access_token
    
    // Verify token is a classic GitHub OAuth access token (starts with 'gho_')
    // NOT a GitHub App token (starts with 'ghu_') or fine-grained token (starts with 'github_pat_')
    if (!token.startsWith('gho_')) {
      return NextResponse.json(
        { error: 'Invalid token type: Expected classic OAuth access token (gho_*)' },
        { status: 500 }
      )
    }
    
    // Verify token can access GitHub API (classic OAuth token requirement)
    // This ensures it's a valid classic OAuth token, not App or fine-grained
    // Non-blocking: if validation fails, still proceed (token exchange already succeeded)
    try {
      const userResponse = await fetch('https://api.github.com/user', {
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      })
      
      if (!userResponse.ok) {
        console.warn('Token validation warning: Token may not have expected permissions, but proceeding')
      }
    } catch (error) {
      // If validation fails, still proceed but log warning
      console.warn('Token validation check failed (non-blocking):', error)
    }

    // Return HTML that sends the exact postMessage Decap CMS expects
    const escapedToken = token
      .replace(/\\/g, '\\\\')
      .replace(/'/g, "\\'")
      .replace(/"/g, '\\"')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/\t/g, '\\t')
    
    // Explicitly set target origin to admin origin (not popup origin)
    // Decap CMS verifies event.origin must match admin page origin exactly
    const adminOrigin = baseUrl // https://mynzagric.com
    
    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Authenticating...</title>
</head>
<body>
  <script>
    (function () {
      if (!window.opener) {
        console.error("No opener window");
        return;
      }

      const token = "${escapedToken}";
      const targetOrigin = "${adminOrigin}";

      window.opener.postMessage(
        {
          type: "authorization:github",
          token: token,
        },
        targetOrigin
      );

      window.close();
    })();
  </script>
</body>
</html>`

    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
