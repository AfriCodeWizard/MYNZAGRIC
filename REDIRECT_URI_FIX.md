# Fix "Invalid Redirect URL" Error

## The Problem

GitHub OAuth is saying "invalid redirect URL" because the callback URL in your GitHub OAuth App doesn't match what the code is sending.

## Exact Fix Required

### Step 1: Check Current GitHub OAuth App Settings

1. Go to: https://github.com/settings/developers
2. Click on your OAuth App (Client ID: `Ov23liMog49BcJaN6uzJ`)
3. Look at "Authorization callback URL"
4. **Note what it currently says**

### Step 2: Update to Match Exactly

The callback URL **MUST BE EXACTLY**:
```
https://mynzagric.com/api/auth
```

**Critical Requirements:**
- ✅ Must start with `https://` (not `http://`)
- ✅ Must be `mynzagric.com` (not `www.mynzagric.com` or any subdomain)
- ✅ Must be `/api/auth` (not `/api/auth/` with trailing slash)
- ✅ No spaces or extra characters
- ✅ Case sensitive (all lowercase)

### Step 3: Save and Test

1. Update the callback URL in GitHub
2. **Save changes**
3. Wait 1-2 minutes for changes to propagate
4. Try logging in again

## What the Code Sends

The API route sends:
- `redirect_uri: https://mynzagric.com/api/auth`

This **MUST MATCH EXACTLY** what's in your GitHub OAuth App settings.

## Common Mistakes

❌ `http://mynzagric.com/api/auth` (wrong protocol)
❌ `https://www.mynzagric.com/api/auth` (wrong domain)
❌ `https://mynzagric.com/api/auth/` (trailing slash)
❌ `https://mynzagric.com/admin` (wrong path)
❌ `https://mynzagric.com/api/auth/callback` (wrong path)

✅ `https://mynzagric.com/api/auth` (CORRECT)

## Verification

After updating, test:
1. Go to `https://mynzagric.com/admin`
2. Click "Login with GitHub"
3. Should redirect to GitHub (not show error)
4. After authorizing, should redirect back successfully

## If Still Not Working

1. **Double-check the exact URL** in GitHub OAuth App
2. **Copy-paste** the URL from the error message (if shown)
3. **Clear browser cache** and try again
4. **Wait 2-3 minutes** after changing GitHub settings (propagation delay)

