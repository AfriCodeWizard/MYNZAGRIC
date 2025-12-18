# GitHub OAuth 404 Error - Troubleshooting Guide

## Common Cause: Callback URL Mismatch

The 404 error when clicking "Login with GitHub" is almost always caused by the **Authorization callback URL** not matching exactly.

## Step-by-Step Fix

### 1. Verify GitHub OAuth App Settings

Go to: **GitHub → Settings → Developer settings → OAuth Apps → Your App**

**Critical Settings:**

1. **Application name**: `Mynzagric CMS` (or any name)
2. **Homepage URL**: `https://mynzagric.com`
3. **Authorization callback URL**: **MUST BE EXACTLY:**
   ```
   https://mynzagric.com/admin/index.html
   ```
   ⚠️ **Important**: 
   - Must include `https://`
   - Must include `/admin/index.html` (not just `/admin`)
   - No trailing slash
   - Exact match required

### 2. Verify Your Config File

Check `public/admin/config.yml`:

```yaml
backend:
  name: github
  repo: AfriCodeWizard/MYNZAGRIC
  branch: main
  base_url: https://mynzagric.com
  auth_scope: repo
  app_id: Ov23liMog49BcJaN6uzJ
```

### 3. Test the OAuth Flow

1. Visit: `https://mynzagric.com/admin`
2. Click "Login with GitHub"
3. You should be redirected to: `https://github.com/login/oauth/authorize?...`
4. After authorizing, you should be redirected back to: `https://mynzagric.com/admin/index.html`

### 4. Common Issues and Solutions

#### Issue: 404 on GitHub redirect
**Solution**: The callback URL in GitHub OAuth app is wrong
- Check it matches exactly: `https://mynzagric.com/admin/index.html`
- Update and save in GitHub

#### Issue: "No backend defined" error
**Solution**: Config file not loading
- Verify `public/admin/config.yml` exists
- Check file is committed and deployed
- Clear browser cache

#### Issue: "Repository not found"
**Solution**: Repository name or access issue
- Verify `repo: AfriCodeWizard/MYNZAGRIC` is correct
- Ensure repository exists and is accessible
- Check if repository is private (needs proper permissions)

#### Issue: "Invalid client_id"
**Solution**: Client ID mismatch
- Verify `app_id: Ov23liMog49BcJaN6uzJ` matches your GitHub OAuth app
- Check for typos or extra spaces

### 5. Verify Deployment

After making changes:

1. **Commit and push** your changes
2. **Wait for Vercel deployment** to complete
3. **Clear browser cache** (Ctrl+Shift+Delete)
4. **Test again** at `https://mynzagric.com/admin`

### 6. Alternative: Check Browser Console

Open browser Developer Tools (F12) and check:

1. **Console tab**: Look for JavaScript errors
2. **Network tab**: Check which request returns 404
3. **Application tab**: Check if cookies/localStorage are blocking

### 7. Test OAuth URL Directly

Try accessing the OAuth URL directly (replace with your actual values):

```
https://github.com/login/oauth/authorize?client_id=Ov23liMog49BcJaN6uzJ&redirect_uri=https://mynzagric.com/admin/index.html&scope=repo
```

If this works, the issue is in the CMS configuration.
If this fails, the issue is in your GitHub OAuth app settings.

## Quick Checklist

- [ ] GitHub OAuth App callback URL is exactly: `https://mynzagric.com/admin/index.html`
- [ ] Config file has correct `app_id`: `Ov23liMog49BcJaN6uzJ`
- [ ] Config file has correct `repo`: `AfriCodeWizard/MYNZAGRIC`
- [ ] Config file has correct `base_url`: `https://mynzagric.com`
- [ ] Changes are committed and deployed
- [ ] Browser cache is cleared
- [ ] Testing on the actual domain (not localhost)

## Still Not Working?

1. **Double-check the callback URL** - This is the #1 cause
2. **Verify the OAuth app is active** in GitHub
3. **Check Vercel deployment logs** for any errors
4. **Try in incognito/private browser window**
5. **Check if your domain has any redirects** that might interfere

## Contact Points

If still having issues, check:
- GitHub OAuth App settings page
- Vercel deployment logs
- Browser console errors
- Network tab in browser DevTools

