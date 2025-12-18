# Vercel OAuth Proxy Setup

## The Problem

Decap CMS was designed for Netlify, which provides built-in OAuth handling. On Vercel, we need a proxy server to handle the OAuth flow.

## Solution: Serverless Function Proxy

I've created a serverless function at `api/auth.js` that handles the GitHub OAuth flow for Vercel.

## Setup Steps

### 1. Get GitHub Client Secret

1. Go to GitHub → Settings → Developer settings → OAuth Apps
2. Find your app (Client ID: `Ov23liMog49BcJaN6uzJ`)
3. Click on it
4. **Generate a new client secret** (if you don't have one)
5. **Copy the Client Secret** (you'll only see it once!)

### 2. Add Environment Variables to Vercel

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add these variables:

   **For Production:**
   - `GITHUB_CLIENT_ID` = `Ov23liMog49BcJaN6uzJ`
   - `GITHUB_CLIENT_SECRET` = (your client secret from step 1)

   **For Preview/Development (optional):**
   - Add the same variables for preview and development environments

### 3. Update GitHub OAuth App Callback URL

1. Go to GitHub → Settings → Developer settings → OAuth Apps
2. Edit your app
3. **Update Authorization callback URL** to:
   ```
   https://mynzagric.com/api/auth
   ```
   (This points to the OAuth proxy function)

### 4. Deploy

1. Commit and push the changes
2. Wait for Vercel to deploy
3. Test at `https://mynzagric.com/admin`

## How It Works

1. User clicks "Login with GitHub" in CMS
2. CMS redirects to `/api/auth` (our proxy function)
3. Proxy redirects to GitHub OAuth
4. User authorizes on GitHub
5. GitHub redirects back to `/api/auth` with code
6. Proxy exchanges code for access token
7. Proxy redirects to `/admin` with token
8. CMS uses token to access GitHub API

## Security Notes

- **Never commit the Client Secret** to your repository
- Always use environment variables
- The secret is only used server-side in the proxy function
- Tokens are passed securely via URL hash (not query params)

## Troubleshooting

### "Invalid client_secret"
- Verify `GITHUB_CLIENT_SECRET` is set in Vercel
- Check for typos or extra spaces
- Regenerate the secret in GitHub if needed

### "Redirect URI mismatch"
- Verify callback URL in GitHub OAuth app is: `https://mynzagric.com/api/auth`
- Must match exactly (including https://)

### Still getting 404
- Check that `api/auth.js` file exists and is committed
- Verify Vercel deployment succeeded
- Check Vercel function logs for errors

## Alternative: Switch to Netlify

If the proxy approach is too complex, you can:

1. **Deploy to Netlify instead of Vercel**
2. Use Netlify's built-in Git Gateway
3. No proxy needed - works out of the box

## Alternative: Use Different CMS

If OAuth continues to be problematic, consider:

1. **Sanity CMS** - Headless CMS with great Next.js integration
2. **Contentful** - Popular headless CMS
3. **Strapi** - Self-hosted or cloud options
4. **Forestry/TinaCMS** - Git-based like Decap but better Vercel support

