# Decap CMS OAuth Authentication Fix - Production Ready

## Root Cause Analysis

### The Problem
Decap CMS was configured with `backend: name: github` **without** `auth_endpoint` or `proxy_url`. This configuration expects Decap CMS to handle OAuth directly, but:

1. **Direct OAuth requires the callback URL to be the admin page itself** (`/admin/index.html`)
2. **Decap CMS must exchange the OAuth code for a token client-side**
3. **This requires exposing the GitHub Client Secret**, which is a security risk

### Why It Failed
- Custom `/auth` endpoint was intercepting the OAuth flow
- Token was being passed via hash fragments and postMessage (hacky workaround)
- Decap CMS never received the token in its expected format
- The flow didn't match Decap CMS's official authentication mechanism

## The Solution: Use `auth_endpoint`

For static hosting (Vercel), Decap CMS requires an **OAuth proxy** via `auth_endpoint`. This is the official, production-ready approach.

### How `auth_endpoint` Works

1. User clicks "Login with GitHub" in Decap CMS
2. Decap CMS makes an AJAX request to `auth_endpoint` (`/auth`)
3. `/auth` redirects to GitHub OAuth
4. GitHub redirects back to `/auth?code=...`
5. `/auth` exchanges code for token (server-side, secure)
6. `/auth` returns JSON: `{ token: "...", provider: "github" }`
7. Decap CMS receives token and authenticates automatically

## Configuration Changes

### 1. Updated `public/admin/config.yml`

```yaml
backend:
  name: github
  repo: AfriCodeWizard/MYNZAGRIC
  branch: main
  base_url: https://mynzagric.com
  auth_scope: repo
  auth_endpoint: https://mynzagric.com/auth  # ← Added this
```

**Removed:**
- `app_id` (not needed with `auth_endpoint`)

### 2. Updated `app/auth/route.ts`

**Key Changes:**
- Always returns JSON (not HTML redirects)
- Removed browser redirect detection logic
- Added CORS headers for cross-origin requests
- Added OPTIONS handler for CORS preflight

**The endpoint now:**
- Accepts initial OAuth request → redirects to GitHub
- Accepts OAuth callback with code → exchanges for token
- Returns JSON: `{ token: "...", provider: "github" }`

### 3. Simplified `public/admin/index.html`

**Removed all custom token handling:**
- No postMessage listeners
- No hash monitoring
- No sessionStorage backups
- No manual token injection

**Now just:**
- Loads Decap CMS script
- Decap CMS handles everything automatically

## GitHub OAuth App Configuration

**Update your GitHub OAuth App callback URL to:**
```
https://mynzagric.com/auth
```

**Steps:**
1. Go to: https://github.com/settings/developers
2. Click your OAuth App (Client ID: `Ov23liMog49BcJaN6uzJ`)
3. Edit the app
4. Set "Authorization callback URL" to: `https://mynzagric.com/auth`
5. Save changes

## Vercel Environment Variables

Ensure these are set in Vercel Dashboard → Settings → Environment Variables:

- `GITHUB_CLIENT_ID` = `Ov23liMog49BcJaN6uzJ`
- `GITHUB_CLIENT_SECRET` = (your client secret)

## Files Changed

### Modified:
- ✅ `public/admin/config.yml` - Added `auth_endpoint`
- ✅ `app/auth/route.ts` - Simplified to return JSON only
- ✅ `public/admin/index.html` - Removed all custom token handling

### No Changes Needed:
- `app/api/auth/route.ts` - Can be removed (not used)
- `middleware.ts` - Already configured correctly
- `next.config.mjs` - Already configured correctly

## Verification Checklist

After deployment, verify:

- [ ] `auth_endpoint` is set in `config.yml`
- [ ] GitHub OAuth App callback URL is `https://mynzagric.com/auth`
- [ ] Vercel environment variables are set
- [ ] `/auth` endpoint returns JSON (not HTML)
- [ ] `index.html` is minimal (no custom token handling)
- [ ] User can click "Login with GitHub"
- [ ] OAuth popup opens and redirects to GitHub
- [ ] After authorization, popup closes
- [ ] Decap CMS dashboard appears (not login screen)

## How to Test

1. Go to `https://mynzagric.com/admin`
2. Click "Login with GitHub"
3. Authorize the app on GitHub
4. Popup should close automatically
5. Decap CMS dashboard should appear

## Troubleshooting

### Still seeing login screen?
- Check browser console for errors
- Verify `/auth` endpoint returns JSON (not HTML)
- Check Vercel function logs for `/auth`
- Verify GitHub OAuth App callback URL matches exactly

### CORS errors?
- Verify OPTIONS handler is working
- Check CORS headers in `/auth` response

### Token not received?
- Check Network tab for `/auth` request
- Verify response is JSON: `{ token: "...", provider: "github" }`
- Check Vercel logs for token exchange errors

## Why This Works

✅ **Official Decap CMS flow** - Uses `auth_endpoint` as documented  
✅ **Secure** - Client secret stays server-side  
✅ **No hacks** - No hash parsing, no postMessage, no manual injection  
✅ **Production-ready** - Standard approach for static hosting  
✅ **Maintainable** - Follows Decap CMS best practices  

## Summary

The fix was to:
1. Add `auth_endpoint` to config (tells Decap CMS to use OAuth proxy)
2. Simplify `/auth` to return JSON only (Decap CMS expects JSON)
3. Remove all custom token handling from `index.html` (Decap CMS handles it)

This is the **correct, production-ready solution** for Decap CMS on static hosting platforms like Vercel.

