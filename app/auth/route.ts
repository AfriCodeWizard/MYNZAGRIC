import { NextRequest, NextResponse } from 'next/server'

// Decap CMS requests /auth - handle OAuth flow directly here
export async function GET(request: NextRequest) {
  return handleAuth(request)
}

export async function POST(request: NextRequest) {
  return handleAuth(request)
}

export async function OPTIONS(request: NextRequest) {
  // Handle CORS preflight
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
  const state = searchParams.get('state')
  const baseUrl = request.nextUrl.origin
  
  console.log('=== /auth OAuth Handler Called ===')
  console.log('URL:', request.url)
  console.log('Method:', request.method)
  console.log('Code:', code ? 'present' : 'missing')
  console.log('State:', state)
  
  // If no code, redirect to GitHub OAuth (initial auth request)
  if (!code) {
    console.log('→ No code found, redirecting to GitHub OAuth')
    const params = new URLSearchParams({
      client_id: process.env.GITHUB_CLIENT_ID || 'Ov23liMog49BcJaN6uzJ',
      redirect_uri: `${baseUrl}/auth`, // Use /auth as callback
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
        redirect_uri: `${baseUrl}/auth`, // Use /auth as callback
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
    
    // Check if this is a browser redirect (from GitHub callback) or AJAX request
    const acceptHeader = request.headers.get('accept') || ''
    const isAjaxRequest = acceptHeader.includes('application/json') || 
                         request.headers.get('x-requested-with') === 'XMLHttpRequest'
    
    console.log('→ Request type detection:')
    console.log('  - Accept header:', acceptHeader)
    console.log('  - Is AJAX:', isAjaxRequest)
    
    if (isAjaxRequest) {
      // AJAX request from Decap CMS - return JSON
      console.log('→ Returning JSON token for Decap CMS (AJAX)')
      return NextResponse.json({
        token: token,
        provider: 'github',
      }, {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      })
    } else {
      // Browser redirect from GitHub - return HTML that posts message to opener
      // Decap CMS opens auth_endpoint in a popup, so we need to send token to parent
      console.log('→ Browser redirect detected - returning HTML with postMessage')
      const escapedToken = token
        .replace(/\\/g, '\\\\')
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/\t/g, '\\t')
      
      const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Authenticating...</title><script>
(function(){
  var token = '${escapedToken}';
  var provider = 'github';
  
  console.log('OAuth callback page loaded');
  console.log('Token length:', token.length);
  
  // If we're in a popup (opened by Decap CMS), send token to parent
  if (window.opener && !window.opener.closed) {
    console.log('Sending token to parent window via postMessage...');
    try {
      // Send token to parent window - Decap CMS listens for this
      window.opener.postMessage({
        type: 'authorization',
        token: token,
        provider: provider
      }, '*');
      
      // Also try the format Decap CMS might expect
      window.opener.postMessage({
        token: token,
        provider: provider
      }, '*');
      
      console.log('Token sent, closing popup...');
      setTimeout(function() {
        window.close();
      }, 100);
    } catch(e) {
      console.error('Error sending token:', e);
      // Fallback: try to redirect parent (may not work due to CORS)
      try {
        window.opener.location.href = window.opener.location.href;
      } catch(e2) {
        console.error('Could not redirect parent:', e2);
      }
      window.close();
    }
  } else {
    // Not in popup - this shouldn't happen with auth_endpoint
    console.log('Not in popup - redirecting to admin page');
    window.location.href = '/admin';
  }
})();
</script></head><body><p>Authenticating... Please wait.</p></body></html>`
      
      return new NextResponse(html, {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      })
    }
  } catch (error) {
    console.error('OAuth error:', error)
    return NextResponse.json(
      { error: 'Authentication failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

