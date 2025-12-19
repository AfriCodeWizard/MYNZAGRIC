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
    
    // Escape token for use in JavaScript string
    const escapedToken = token.replace(/'/g, "\\'").replace(/"/g, '\\"')
    
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Redirecting...</title>
  <meta http-equiv="refresh" content="0;url=${baseUrl}/admin/index.html#token=${encodeURIComponent(token)}">
  <script>
    // Store token in sessionStorage as backup in case hash is lost
    try {
      sessionStorage.setItem('github_token', '${escapedToken}');
      console.log('Token stored in sessionStorage as backup');
    } catch (e) {
      console.error('Failed to store token in sessionStorage:', e);
    }
    
    // Immediate redirect - CRITICAL: Use #token= not #/token=
    // Execute immediately, before any other scripts
    (function() {
      var token = '${escapedToken}';
      var targetUrl = '${baseUrl}/admin/index.html#token=' + encodeURIComponent(token);
      
      console.log('OAuth redirect: Setting hash to #token=' + token.substring(0, 10) + '...');
      
      // Try multiple methods to ensure redirect works
      try {
        // Method 1: location.replace (preferred - doesn't add to history)
        if (window.location.replace) {
          window.location.replace(targetUrl);
          return;
        }
      } catch (e) {
        console.error('location.replace failed:', e);
      }
      
      try {
        // Method 2: location.href
        window.location.href = targetUrl;
      } catch (e) {
        console.error('location.href failed:', e);
        // Method 3: Direct hash assignment as last resort
        window.location.hash = '#token=' + encodeURIComponent(token);
        window.location.pathname = '/admin/index.html';
      }
    })();
  </script>
</head>
<body>
  <p>Redirecting to admin...</p>
  <p>If you are not redirected, <a href="${baseUrl}/admin/index.html#token=${encodeURIComponent(token)}">click here</a>.</p>
  <script>
    // Backup redirect after page loads
    setTimeout(function() {
      var token = '${escapedToken}';
      if (!window.location.hash || !window.location.hash.includes('token=')) {
        console.warn('Token not in hash, attempting backup redirect');
        window.location.href = '${baseUrl}/admin/index.html#token=' + encodeURIComponent(token);
      }
    }, 100);
  </script>
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

