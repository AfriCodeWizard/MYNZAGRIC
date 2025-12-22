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
  const acceptHeader = request.headers.get('accept') || ''
  const isAjaxRequest = acceptHeader.includes('application/json') || 
                       request.headers.get('x-requested-with') === 'XMLHttpRequest'

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

    // If this is a browser redirect (popup window), return HTML that closes popup and sends token
    // If this is an AJAX request, return JSON
    if (isAjaxRequest) {
      // AJAX request - return JSON
      return NextResponse.json(
        {
          token: token,
          provider: 'github',
        },
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
          },
        }
      )
    } else {
      // Browser redirect (popup) - return HTML that sends token via postMessage
      const escapedToken = token
        .replace(/\\/g, '\\\\')
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/\t/g, '\\t')
      
      const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Authenticating...</title>
</head>
<body>
  <script>
    (function() {
      if (window.opener) {
        // We're in a popup - send token to parent window
        window.opener.postMessage(
          {
            type: 'authorization:github',
            token: '${escapedToken}',
            provider: 'github'
          },
          '${baseUrl}'
        );
        window.close();
      } else {
        // Not in popup - redirect to admin with token
        window.location.href = '${baseUrl}/admin#access_token=${encodeURIComponent(token)}&token_type=bearer';
      }
    })();
  </script>
  <p>Authenticating...</p>
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
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
