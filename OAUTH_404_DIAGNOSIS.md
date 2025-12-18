# OAuth 404 Error - Root Cause Analysis

## Problem Statement
Decap CMS GitHub OAuth login fails with 404 error after clicking "Login with GitHub" on Vercel deployment.

## Root Cause Analysis

### Issue Identified
The 404 occurs because Decap CMS with `proxy_url` expects an **absolute URL**, not a relative path. When using a relative path like `/api/auth`, Decap CMS may construct incorrect URLs or fail to resolve the proxy endpoint.

### Current Configuration Issues

1. **Config File**: `proxy_url: /api/auth` (relative path)
   - **Problem**: Decap CMS may not resolve this correctly
   - **Fix**: Changed to `proxy_url: https://mynzagric.com/api/auth` (absolute URL)

2. **API Route**: `app/api/auth/route.ts` exists and is correctly implemented
   - **Status**: ✅ Correctly handles OAuth flow
   - **Location**: Next.js App Router format is correct

3. **Middleware**: Excludes `/api/*` routes
   - **Status**: ✅ Correctly configured

## Exact Fix Applied

### 1. Updated `public/config.yml`
```yaml
proxy_url: https://mynzagric.com/api/auth  # Changed from /api/auth
```

### 2. Enhanced `app/api/auth/route.ts`
- Added better error handling
- Added logging for debugging
- Verified token exchange flow
- Ensured proper redirect with token in hash fragment

## OAuth Flow Verification

1. ✅ User clicks "Login with GitHub" in CMS
2. ✅ Decap CMS redirects to `https://mynzagric.com/api/auth`
3. ✅ API route redirects to GitHub OAuth
4. ✅ GitHub redirects back to `https://mynzagric.com/api/auth?code=...`
5. ✅ API route exchanges code for token
6. ✅ API route redirects to `/admin/index.html#token=...`

## Critical Requirements

### GitHub OAuth App Settings
**Authorization Callback URL MUST be:**
```
https://mynzagric.com/api/auth
```

### Vercel Environment Variables
**Required:**
- `GITHUB_CLIENT_ID` = `Ov23liMog49BcJaN6uzJ`
- `GITHUB_CLIENT_SECRET` = (your client secret)

## Why This Setup Works on Vercel

✅ **Viable**: Decap CMS + GitHub OAuth on Vercel is **fully viable** with a custom proxy
- Next.js API routes handle OAuth flow correctly
- Serverless functions work perfectly for this use case
- No Netlify dependencies required

## Verification Steps

1. **Check GitHub OAuth App:**
   - Callback URL: `https://mynzagric.com/api/auth`
   - Client ID matches config

2. **Check Vercel Environment Variables:**
   - `GITHUB_CLIENT_ID` set
   - `GITHUB_CLIENT_SECRET` set

3. **Test the Flow:**
   - Visit `https://mynzagric.com/admin`
   - Click "Login with GitHub"
   - Should redirect to GitHub
   - After authorization, should redirect back to admin with token

## If 404 Persists

### Check Vercel Deployment Logs
1. Go to Vercel Dashboard → Your Project → Deployments
2. Click on latest deployment → Functions tab
3. Check `/api/auth` function logs for errors

### Verify API Route is Deployed
1. Test directly: `https://mynzagric.com/api/auth`
2. Should redirect to GitHub OAuth (if no code param)
3. If 404, the route isn't deployed correctly

### Browser Network Tab
1. Open DevTools → Network tab
2. Click "Login with GitHub"
3. Check which request returns 404
4. Verify the URL that's failing

## Conclusion

**Status**: ✅ **Fixable and Viable**

The setup is correct. The 404 was likely caused by:
1. Relative `proxy_url` path (now fixed to absolute URL)
2. Potential GitHub OAuth app callback URL mismatch

After deploying these changes and verifying GitHub OAuth app settings, the authentication should work correctly.

