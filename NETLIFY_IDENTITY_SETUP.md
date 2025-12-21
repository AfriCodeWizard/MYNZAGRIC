# Netlify Identity & Git Gateway Setup Instructions

This guide will help you set up Netlify Identity and Git Gateway so your Vercel-hosted site can authenticate users for Netlify CMS.

## Overview

Your site is hosted on Vercel, but you'll use Netlify's free Identity and Git Gateway services for authentication. This requires creating a minimal Netlify site that connects to your GitHub repository.

## Step-by-Step Setup

### Step 1: Create a Netlify Account (if needed)

1. Go to [https://app.netlify.com](https://app.netlify.com)
2. Sign up or log in with your GitHub account (recommended)

### Step 2: Create a New Netlify Site

1. In Netlify dashboard, click **"Add new site"** → **"Import an existing project"**
2. Choose **"Deploy with GitHub"**
3. Authorize Netlify to access your GitHub account if prompted
4. Select the repository: **`AfriCodeWizard/MYNZAGRIC`**
5. **IMPORTANT - Configure build settings to avoid Next.js plugin:**
   - Click **"Show advanced"** to expand build settings
   - **Build command**: `echo "Static site for Identity/Git Gateway only"`
   - **Publish directory**: `public/admin` (this directory exists and contains static files)
   - **OR** if that doesn't work, use:
     - **Build command**: Leave empty
     - **Publish directory**: `public`
6. Click **"Deploy site"**
7. **After deployment, disable the Next.js plugin:**
   - Go to **"Site settings"** → **"Build & deploy"** → **"Build plugins"**
   - If you see **"@netlify/plugin-nextjs"**, click on it and **"Remove plugin"**
   - This prevents Netlify from trying to build your Next.js app

> **Note**: This Netlify site doesn't need to actually serve your site - it's just for Identity/Git Gateway. You can keep using Vercel for hosting. If the deployment fails, that's okay - you can still enable Identity and Git Gateway.

### Step 2.5: Fix Next.js Plugin Error (if you see it)

If you get an error about `@netlify/plugin-nextjs` or "publish directory does not contain expected Next.js build output":

1. **Quick Fix - Remove the plugin:**
   - In your Netlify site dashboard, go to **"Site settings"** → **"Build & deploy"** → **"Build plugins"**
   - Find **"@netlify/plugin-nextjs"** and click **"Remove plugin"**
   - The `netlify.toml` file in your repo will prevent it from being added again

2. **Update build settings:**
   - Go to **"Site settings"** → **"Build & deploy"** → **"Build & deploy"**
   - Click **"Edit settings"**
   - Set **Publish directory** to: `public/admin`
   - Set **Build command** to: `echo "Identity/Git Gateway only"`
   - Click **"Save"**

3. **Redeploy or trigger a new build** (optional - Identity/Git Gateway works even if build fails)

> **Note**: The `netlify.toml` file in your repository root will prevent this error in future deployments.

### Step 3: Enable Netlify Identity

1. In your Netlify site dashboard, go to **"Identity"** in the left sidebar
2. Click **"Enable Identity"**
3. Wait a few seconds for Identity to initialize

### Step 4: Configure Identity Settings

1. Still in the Identity section, click **"Settings and usage"**
2. Scroll down to **"Registration preferences"**
3. Choose one of these options:
   - **"Open"** - Anyone can sign up (good for team use)
   - **"Invite only"** - Only invited users can access (more secure)
4. Scroll to **"External providers"** (optional):
   - You can enable GitHub, Google, etc. for easier login
   - This is optional - email/password works fine
5. Scroll to **"Services"** section:
   - Make sure **"Git Gateway"** is enabled (should be automatic)
6. Click **"Save"** at the bottom

### Step 5: Enable Git Gateway

1. In the Identity section, click **"Services"** tab
2. Find **"Git Gateway"** and click **"Enable Git Gateway"**
3. You'll be prompted to authorize Netlify to access your GitHub repository
4. Click **"Authorize"** and grant the necessary permissions
5. Wait for Git Gateway to initialize (may take 30-60 seconds)

### Step 6: Configure Git Gateway Repository

1. After Git Gateway is enabled, you should see repository settings
2. Verify it's connected to: **`AfriCodeWizard/MYNZAGRIC`**
3. Verify the branch is set to: **`main`**
4. If anything is incorrect, click **"Edit settings"** to update

### Step 7: Create Your First Admin User

1. In the Identity section, click **"Invite users"**
2. Enter your email address
3. Click **"Send invite"**
4. Check your email for the invitation
5. Click the invitation link to set your password
6. Complete the registration

> **Alternative**: If you set registration to "Open", you can sign up directly at `https://mynzagric.com/admin` without an invite.

### Step 8: Add Identity Widget Script to Your Site

The `index.html` file already includes the Netlify Identity widget script. However, you need to ensure your site's main HTML (usually in `app/layout.tsx` or similar) includes this script as well for the redirect to work properly.

Add this script tag to your main layout file (before closing `</head>` or in `<body>`):

```html
<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
```

If you're using Next.js, add it to your root layout or `_document.tsx`:

```tsx
// In app/layout.tsx or pages/_document.tsx
<Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
```

### Step 9: Configure Netlify Site URL

1. In Netlify dashboard, go to **"Site settings"** → **"Identity"**
2. Scroll to **"Site URL"**
3. Set it to: **`https://mynzagric.com`** (your Vercel domain)
4. This ensures redirects work correctly after login
5. Click **"Save"**

### Step 10: Test the Setup

1. Go to `https://mynzagric.com/admin`
2. You should see the Netlify Identity login screen
3. Log in with the email/password you created
4. You should now see the Netlify CMS interface
5. Try creating or editing a blog post to verify Git Gateway is working

## Troubleshooting

### "Plugin @netlify/plugin-nextjs failed" or "publish directory does not contain expected Next.js build output"

This happens because Netlify auto-detects Next.js projects. To fix:

1. **Disable the Next.js plugin:**
   - Go to **"Site settings"** → **"Build & deploy"** → **"Build plugins"**
   - Find **"@netlify/plugin-nextjs"** and click **"Remove plugin"**

2. **Update build settings:**
   - Go to **"Site settings"** → **"Build & deploy"** → **"Build & deploy"**
   - Under **"Build settings"**, click **"Edit settings"**
   - Set **Build command** to: `echo "Identity/Git Gateway only"`
   - Set **Publish directory** to: `public/admin` or `public`
   - Click **"Save"**

3. **Create a netlify.toml file** (optional, but recommended):
   - Create a file named `netlify.toml` in your repo root with:
   ```toml
   [build]
     publish = "public/admin"
     command = "echo 'Identity/Git Gateway only'"
   
   [[plugins]]
     package = "@netlify/plugin-nextjs"
     enabled = false
   ```
   - Commit and push this file to disable the plugin permanently

4. **Alternative: Disable auto-deployments:**
   - Go to **"Site settings"** → **"Build & deploy"** → **"Continuous Deployment"**
   - Click **"Stop auto publishing"** or **"Deploy only on merge to production branch"**
   - This way, the site won't try to build, but Identity/Git Gateway will still work

> **Important**: Even if the deployment fails, you can still enable Identity and Git Gateway. The deployment is not required for these services to work.

### "Git Gateway is not enabled" error

- Go to Netlify Identity → Services → Git Gateway
- Make sure it's enabled and authorized
- Try disabling and re-enabling Git Gateway

### Login redirects don't work

- Verify the Site URL in Netlify Identity settings is set to `https://mynzagric.com`
- Make sure the Identity widget script is loaded on your main site pages
- Check browser console for errors

### "Repository not found" or permission errors

- In Netlify, go to Site settings → Build & deploy → Environment
- Verify the repository connection
- Re-authorize Git Gateway if needed

### Users can't access the CMS

- Check Identity → Settings → Registration preferences
- Make sure users are invited (if using invite-only)
- Verify Git Gateway has access to the repository

## Important Notes

1. **Free Tier Limits**: Netlify Identity free tier includes:
   - 1,000 monthly active users
   - Unlimited API calls
   - Email/password authentication
   - Git Gateway included

2. **Netlify Site**: The Netlify site you create doesn't need to be your main hosting. It's just for Identity/Git Gateway services. You can:
   - Keep it as a minimal deployment
   - Or disable automatic deployments if you only use Vercel

3. **Security**: For production, consider:
   - Using "Invite only" registration
   - Enabling 2FA for admin users
   - Regularly reviewing Identity user list

4. **Backup**: Your content is still in GitHub, so you have full backup and version control.

## Verification Checklist

- [ ] Netlify site created and connected to GitHub repo
- [ ] Netlify Identity enabled
- [ ] Git Gateway enabled and authorized
- [ ] Repository and branch configured correctly
- [ ] First admin user created/invited
- [ ] Site URL set to `https://mynzagric.com`
- [ ] Identity widget script added to main site pages
- [ ] Can log in at `https://mynzagric.com/admin`
- [ ] Can create/edit blog posts in CMS
- [ ] Changes commit to GitHub successfully

Once all items are checked, your Netlify CMS with Git Gateway should be fully functional on your Vercel-hosted site!

