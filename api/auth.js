// Vercel serverless function to handle GitHub OAuth proxy
// This is required because Decap CMS needs a proxy for OAuth on non-Netlify platforms

export default async function handler(req, res) {
  const { code, state } = req.query;

  if (!code) {
    // Redirect to GitHub OAuth
    const params = new URLSearchParams({
      client_id: process.env.GITHUB_CLIENT_ID || 'Ov23liMog49BcJaN6uzJ',
      redirect_uri: `${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host}/api/auth`,
      scope: 'repo',
      state: state || Math.random().toString(36).substring(7),
    });

    return res.redirect(`https://github.com/login/oauth/authorize?${params.toString()}`);
  }

  // Exchange code for token
  try {
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
        redirect_uri: `${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host}/api/auth`,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      return res.status(400).json({ error: tokenData.error_description || tokenData.error });
    }

    // Redirect back to admin with token in hash
    const redirectUrl = `${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host}/admin/index.html#token=${tokenData.access_token}`;
    return res.redirect(redirectUrl);
  } catch (error) {
    console.error('OAuth error:', error);
    return res.status(500).json({ error: 'Authentication failed' });
  }
}

