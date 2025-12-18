# Final OAuth Solution - Step by Step

## What Changed

1. **Config**: Changed from `proxy_url` to `auth_endpoint: /api/auth`
2. **API Route**: Now returns JSON token instead of redirecting
3. **GitHub OAuth App**: Callback URL must be `/api/auth`

## Critical Steps to Complete

### 1. Update GitHub OAuth App Callback URL

**MUST DO THIS:**

1. Go to: https://github.com/settings/developers
2. Click on your OAuth App (Client ID: `Ov23liMog49BcJaN6uzJ`)
3. Edit the app
4. **Change "Authorization callback URL" to:**
   ```
   https://mynzagric.com/api/auth
   ```
5. **Save changes**

### 2. Verify Vercel Environment Variables

In Vercel Dashboard → Settings → Environment Variables, ensure:
- `GITHUB_CLIENT_ID` = `Ov23liMog49BcJaN6uzJ`
- `GITHUB_CLIENT_SECRET` = (your client secret)

### 3. Deploy Changes

After committing, Vercel will auto-deploy. Wait for deployment to complete.

### 4. Test the Flow

1. Go to: `https://mynzagric.com/admin`
2. Click "Login with GitHub"
3. Should redirect to GitHub
4. Authorize the app
5. Should redirect back and authenticate

## How It Works Now

1. User clicks "Login with GitHub"
2. Decap CMS calls `/api/auth` (via `auth_endpoint`)
3. `/api/auth` redirects to GitHub OAuth
4. GitHub redirects back to `/api/auth?code=...`
5. `/api/auth` exchanges code for token
6. `/api/auth` returns JSON: `{ token: "...", provider: "github" }`
7. Decap CMS receives token and authenticates

## If Still Not Working

### Check Browser Console
Open DevTools → Console, look for errors

### Check Network Tab
1. Open DevTools → Network
2. Click "Login with GitHub"
3. Find the request to `/api/auth`
4. Check:
   - Status code (should be 200 or 302)
   - Response body
   - Request URL

### Check Vercel Logs
1. Go to Vercel Dashboard
2. Your Project → Deployments → Latest
3. Click "Functions" tab
4. Check `/api/auth` function logs
5. Look for errors or warnings

### Common Issues

**Issue**: Still getting 404
- **Fix**: Verify GitHub OAuth app callback URL is exactly `https://mynzagric.com/api/auth`

**Issue**: "Invalid client_secret"
- **Fix**: Check `GITHUB_CLIENT_SECRET` is set in Vercel

**Issue**: "Redirect URI mismatch"
- **Fix**: GitHub OAuth app callback URL must match exactly

**Issue**: Token not received
- **Fix**: Check Vercel function logs for token exchange errors

## Configuration Files

- `public/admin/config.yml` - Uses `auth_endpoint: /api/auth`
- `public/config.yml` - Same config (backup)
- `app/api/auth/route.ts` - Handles OAuth flow and returns JSON token

## Next Steps After Success

Once authentication works:
1. Test creating a blog post
2. Test editing a post
3. Test image uploads
4. Verify changes commit to GitHub

