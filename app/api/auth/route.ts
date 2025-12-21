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
  
  console.log('=== OAuth Handler Called ===')
  console.log('URL:', request.url)
  console.log('Method:', request.method)
  console.log('Code:', code ? 'present' : 'missing')
  console.log('State:', state)
  console.log('Accept header:', request.headers.get('accept'))
  console.log('X-Requested-With:', request.headers.get('x-requested-with'))
  console.log('Referer:', request.headers.get('referer'))

  // If no code, redirect to GitHub OAuth (initial auth request)
  // This handles both Decap CMS initial request and direct browser requests
  if (!code) {
    console.log('→ No code found, redirecting to GitHub OAuth')
    const params = new URLSearchParams({
      client_id: process.env.GITHUB_CLIENT_ID || 'Ov23liMog49BcJaN6uzJ',
      redirect_uri: `${baseUrl}/api/auth`,
      scope: 'repo',
      state: state || Math.random().toString(36).substring(7),
    })
    
    const githubUrl = `https://github.com/login/oauth/authorize?${params.toString()}`
    console.log('→ Redirecting to:', githubUrl)
    return NextResponse.redirect(githubUrl)
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

    const token = tokenData.access_token
    console.log('✓ Token received from GitHub, length:', token.length)
    
    // Check if this is a browser redirect (not AJAX)
    const acceptHeader = request.headers.get('accept') || ''
    const xRequestedWith = request.headers.get('x-requested-with')
    const isBrowserRedirect = !acceptHeader.includes('application/json') && !xRequestedWith
    
    console.log('→ Request type detection:')
    console.log('  - Accept header:', acceptHeader)
    console.log('  - X-Requested-With:', xRequestedWith)
    console.log('  - Is browser redirect:', isBrowserRedirect)
    
    if (isBrowserRedirect) {
      console.log('→ Detected browser redirect - returning HTML redirect page')
      // Browser was redirected from GitHub - return HTML that redirects to admin with token
      const escapedToken = token
        .replace(/\\/g, '\\\\')
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/\t/g, '\\t')
      
      // CRITICAL: Decap CMS requires BOTH access_token AND token_type=bearer
      const targetUrl = `${baseUrl}/admin#/access_token=${encodeURIComponent(token)}&token_type=bearer`
      console.log('→ Target URL:', targetUrl)
      
      const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Authenticating...</title><script>
(function(){
  var t='${escapedToken}';
  var u='${targetUrl}';
  
  // Check if we're in a popup (Decap CMS opens OAuth in popup when using proxy_url)
  if (window.opener) {
    // We're in a popup - send token to parent window
    console.log('In popup, sending token to parent...');
    try {
      window.opener.postMessage({ access_token: t, token_type: 'bearer', provider: 'github' }, '*');
      window.close();
    } catch(e) {
      console.error('Error posting message:', e);
      // Fallback: redirect parent
      window.opener.location.href = u;
      window.close();
    }
  } else {
    // We're in main window - redirect with token in hash
    console.log('In main window, redirecting with token in hash...');
    window.location.replace(u);
  }
})();
</script><noscript><meta http-equiv="refresh" content="0;url=${targetUrl}"></noscript></head><body><p>Authenticating...</p></body></html>`
      
      console.log('→ Returning HTML redirect page')
      return new NextResponse(html, {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      })
    }
    
    console.log('→ Detected AJAX request - returning JSON')
    // AJAX request from Decap CMS - return JSON
    return NextResponse.json({
      token: token,
      provider: 'github',
    }, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Content-Type': 'application/json',
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

