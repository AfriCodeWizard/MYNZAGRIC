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
  console.log('Accept header:', request.headers.get('accept'))
  console.log('Referer:', request.headers.get('referer'))
  
  // Check if this is a follow-up request from Decap CMS after popup closes
  // Decap CMS might make an AJAX request to get the token after the popup redirects
  const acceptHeader = request.headers.get('accept') || ''
  const isFollowUpRequest = !code && acceptHeader.includes('application/json')
  
  // Check for stored token in cookie (from previous OAuth callback)
  const storedTokenCookie = request.cookies.get('decap_oauth_token')
  
  if (isFollowUpRequest && storedTokenCookie) {
    console.log('→ Follow-up request detected with stored token (Decap CMS checking for token)')
    const token = storedTokenCookie.value
    // Clear the cookie after reading
    const response = NextResponse.json({
      token: token,
      provider: 'github',
    }, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
    // Clear the cookie
    response.cookies.delete('decap_oauth_token')
    return response
  }
  
  if (isFollowUpRequest) {
    console.log('→ Follow-up request detected but no stored token (Decap CMS checking for token)')
    // Decap CMS is checking if authentication completed
    // Return empty response - token should have been sent via postMessage from the popup
    return NextResponse.json({
      error: 'No authorization code provided. Please complete OAuth flow.',
    }, {
      status: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    })
  }
  
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
    
    // Helper function to set cookie on response
    const setTokenCookie = (response: NextResponse) => {
      response.cookies.set('decap_oauth_token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 300, // 5 minutes
        path: '/',
      })
      return response
    }
    
    // Check if this is a browser redirect (from GitHub callback) or AJAX request
    const acceptHeader = request.headers.get('accept') || ''
    const isAjaxRequest = acceptHeader.includes('application/json') || 
                         request.headers.get('x-requested-with') === 'XMLHttpRequest'
    
    console.log('→ Request type detection:')
    console.log('  - Accept header:', acceptHeader)
    console.log('  - Is AJAX:', isAjaxRequest)
    console.log('  - Token stored in cookie for follow-up requests')
    
    if (isAjaxRequest) {
      // AJAX request from Decap CMS - return JSON
      console.log('→ Returning JSON token for Decap CMS (AJAX)')
      const responseData = {
        token: token,
        provider: 'github',
      }
      console.log('→ Response data:', JSON.stringify(responseData))
      
      // Use the response with cookie
      const jsonResponse = NextResponse.json(responseData, {
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
      
      // Set cookie on response
      setTokenCookie(jsonResponse)
      
      return jsonResponse
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
      
      const provider = 'github'
      const escapedProvider = provider.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '\\"')
      
      // Create JSON response that Decap CMS can read
      const authResponse = {
        token: token,
        provider: provider
      }
      const jsonResponse = JSON.stringify(authResponse)
      
      const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Authenticating...</title>
<!-- Decap CMS reads this JSON from the popup -->
<script type="application/json" id="netlify-cms-auth">
${jsonResponse}
</script>
<script>
(function(){
  var authData = ${jsonResponse};
  var token = authData.token;
  var provider = authData.provider;
  
  console.log('OAuth callback page loaded');
  console.log('Token length:', token ? token.length : 'missing');
  console.log('Provider:', provider);
  console.log('Full auth data:', authData);
  
  // Make token available in multiple ways for Decap CMS to read
  window.netlifyAuth = authData;
  window.decapAuth = authData;
  
  // Also set individual properties
  window.decapAuthToken = token;
  window.decapAuthProvider = provider;
  
  // If we're in a popup (opened by Decap CMS), try multiple methods to send token
  if (window.opener && !window.opener.closed) {
    console.log('In popup, sending token to parent window...');
    
    // Method 1: postMessage with authorization type
    try {
      window.opener.postMessage({
        type: 'authorization',
        token: token,
        provider: provider
      }, '*');
      console.log('✓ Sent postMessage with type: authorization');
    } catch(e) {
      console.error('Error sending postMessage (method 1):', e);
    }
    
    // Method 2: postMessage with just token and provider
    try {
      window.opener.postMessage({
        token: token,
        provider: provider
      }, '*');
      console.log('✓ Sent postMessage with token and provider');
    } catch(e) {
      console.error('Error sending postMessage (method 2):', e);
    }
    
    // Method 3: Try to set in parent window directly (same origin only)
    try {
      window.opener.netlifyAuth = authData;
      window.opener.decapAuth = authData;
      window.opener.decapAuthToken = token;
      window.opener.decapAuthProvider = provider;
      console.log('✓ Set token in parent window object');
    } catch(e) {
      console.log('Could not set token in parent window (CORS):', e.message);
    }
    
    // Method 4: Try to trigger a custom event in parent
    try {
      if (window.opener.dispatchEvent) {
        window.opener.dispatchEvent(new CustomEvent('netlify-auth', { detail: authData }));
        window.opener.dispatchEvent(new CustomEvent('decap-auth', { detail: authData }));
        console.log('✓ Dispatched custom events in parent');
      }
    } catch(e) {
      console.log('Could not dispatch events in parent:', e.message);
    }
    
    console.log('All methods attempted, closing popup in 1 second...');
    setTimeout(function() {
      window.close();
    }, 1000);
  } else {
    // Not in popup - redirect to admin with token in hash
    console.log('Not in popup - redirecting to admin page with token');
    window.location.href = '/admin#/access_token=' + encodeURIComponent(token) + '&token_type=bearer';
  }
})();
</script></head><body><p>Authenticating... Please wait.</p></body></html>`
      
      // Return HTML response with cookie set
      const htmlResponse = new NextResponse(html, {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      })
      
      // Set cookie for follow-up requests
      setTokenCookie(htmlResponse)
      
      return htmlResponse
    }
  } catch (error) {
    console.error('OAuth error:', error)
    return NextResponse.json(
      { error: 'Authentication failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

