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
    
    // Escape token for use in JavaScript string (handle all special characters)
    const escapedToken = token
      .replace(/\\/g, '\\\\')  // Escape backslashes first
      .replace(/'/g, "\\'")      // Escape single quotes
      .replace(/"/g, '\\"')      // Escape double quotes
      .replace(/\n/g, '\\n')     // Escape newlines
      .replace(/\r/g, '\\r')     // Escape carriage returns
      .replace(/\t/g, '\\t')     // Escape tabs
    
    // Build the target URL with token in hash
    const targetUrl = `${baseUrl}/admin/index.html#token=${encodeURIComponent(token)}`
    
    // Set token in cookie as backup (expires in 5 minutes)
    const cookieExpiry = new Date(Date.now() + 5 * 60 * 1000).toUTCString()
    const cookieValue = `github_token=${encodeURIComponent(token)}; Path=/; Expires=${cookieExpiry}; SameSite=Lax; Secure`
    
    // Return minimal HTML that redirects IMMEDIATELY, before any other scripts can run
    // Use inline script in head that executes synchronously
    // Store token in multiple places: cookie, localStorage, sessionStorage
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><script>
(function(){
  var t='${escapedToken}';
  var u='${baseUrl}/admin/index.html#token='+encodeURIComponent(t);
  
  // Store token in multiple storage mechanisms as backup
  try{
    localStorage.setItem('github_token',t);
    sessionStorage.setItem('github_token',t);
  }catch(e){}
  
  // Set cookie via document.cookie (since we can't set httpOnly from client)
  document.cookie='github_token='+encodeURIComponent(t)+'; path=/; max-age=300; SameSite=Lax';
  
  // Immediate redirect
  window.location.replace(u);
})();
</script><noscript><meta http-equiv="refresh" content="0;url=${targetUrl}"></noscript></head><body><p>Redirecting...<a href="${targetUrl}">Click here if not redirected</a></p></body></html>`
    
    // Create response with cookie header
    const response = new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0',
        'X-Frame-Options': 'SAMEORIGIN',
        'Set-Cookie': cookieValue,
      },
    })
    
    return response
  } catch (error) {
    console.error('OAuth error:', error)
    return NextResponse.json(
      { error: 'Authentication failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

