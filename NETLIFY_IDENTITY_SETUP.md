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
5. **IMPORTANT - Configure build settings:**
   - Click **"Show advanced"** to expand build settings
   - **Build command**: `echo "Identity/Git Gateway only - site hosted on Vercel"`
   - **Publish directory**: `public/admin` (this directory exists and contains static files)
6. Click **"Deploy site"**
7. **CRITICAL - Set environment variable to skip Next.js plugin:**
   - Go to **"Site settings"** → **"Build & deploy"** → **"Environment"**
   - Click **"Add variable"**
   - **Key**: `NETLIFY_NEXT_PLUGIN_SKIP`
   - **Value**: `true`
   - Click **"Save"**
   - This prevents the Next.js plugin from running (it's auto-installed but hidden)
8. **Trigger a new deploy:**
   - Go to **"Deploys"** tab
   - Click **"Trigger deploy"** → **"Deploy site"**
   - The build should now succeed (the plugin will be skipped)

> **Note**: This Netlify site doesn't need to actually serve your site - it's just for Identity/Git Gateway. You can keep using Vercel for hosting. Even if the deployment fails, you can still enable Identity and Git Gateway - they work independently of the build.

### Step 2.5: Fix Next.js Plugin Error (REQUIRED - You will see this error)

**You WILL get an error about `@netlify/plugin-nextjs` - this is expected and must be fixed:**

The error message will say: *"Plugin @netlify/plugin-nextjs failed - Your publish directory does not contain expected Next.js build output"*

**Fix it by setting an environment variable (EASIEST METHOD):**

1. **Set environment variable to skip the plugin:**
   - In your Netlify site dashboard, go to **"Site settings"** → **"Build & deploy"** → **"Environment"**
   - Click **"Add variable"**
   - **Key**: `NETLIFY_NEXT_PLUGIN_SKIP`
   - **Value**: `true`
   - Click **"Save"**
   - This tells Netlify to skip the auto-installed Next.js plugin

2. **Verify build settings are correct:**
   - Go to **"Site settings"** → **"Build & deploy"** → **"Build & deploy"**
   - Click **"Edit settings"**
   - Verify **Publish directory** is: `public/admin`
   - Verify **Build command** is: `echo "Identity/Git Gateway only - site hosted on Vercel"`
   - Click **"Save"** if you made changes

3. **Trigger a new deploy:**
   - Go to **"Deploys"** tab
   - Click **"Trigger deploy"** → **"Deploy site"**
   - The build should now succeed (the plugin will be skipped)

> **Note**: The `netlify.toml` file also includes this environment variable, but setting it in the UI ensures it works. The plugin is auto-installed by Netlify when it detects a Next.js project, but this environment variable prevents it from running.

### Step 3: Enable Netlify Identity

**Finding the Identity feature (if it's NOT in your left sidebar):**

If your left sidebar shows: **Project overview**, **Project configuration**, **Deploys**, etc. (but no Identity):

1. **BEST METHOD - Use Direct URL:**
   - Find your site name (it's in your Netlify dashboard URL, like `https://app.netlify.com/sites/amazing-site-12345`)
   - Go directly to: `https://app.netlify.com/sites/[YOUR-SITE-NAME]/identity`
   - Replace `[YOUR-SITE-NAME]` with your actual site name
   - Example: If your site is `mynzagric`, go to: `https://app.netlify.com/sites/mynzagric/identity`

2. **Alternative - Check Project Configuration:**
   - Click **"Project configuration"** in the left sidebar
   - Look for **"Identity"**, **"Add-ons"**, or **"Integrations"** section
   - Identity might be listed there as an add-on to enable

3. **Alternative - Check Site Settings:**
   - Look for a **"Site settings"** or gear icon (might be in top right or bottom of sidebar)
   - Click it, then look for **"Identity"** in the settings menu

4. **Once you're in the Identity section:**
   - You should see a button that says **"Enable Identity"** or **"Enable Netlify Identity"**
   - Click it
   - Wait a few seconds for Identity to initialize

> **Note**: If you can't find Identity anywhere, try the direct URL method - it's the most reliable way to access it.

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

1. **Make sure you're still in the Identity section** (left sidebar → Identity)
2. **Find the Services section:**
   - Look for tabs at the top: **"Overview"**, **"Users"**, **"Services"**, **"Settings and usage"**
   - Click on the **"Services"** tab
   - OR scroll down if you see a **"Services"** section on the same page
3. **Enable Git Gateway:**
   - You should see **"Git Gateway"** listed in the Services section
   - Click **"Enable Git Gateway"** button
   - You'll be prompted to authorize Netlify to access your GitHub repository
   - Click **"Authorize"** and grant the necessary permissions
   - Wait for Git Gateway to initialize (may take 30-60 seconds)

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

This happens because Netlify auto-detects Next.js projects and auto-installs the plugin. To fix:

1. **Set environment variable to skip the plugin (RECOMMENDED):**
   - Go to **"Site settings"** → **"Build & deploy"** → **"Environment"**
   - Click **"Add variable"**
   - **Key**: `NETLIFY_NEXT_PLUGIN_SKIP`
   - **Value**: `true`
   - Click **"Save"**
   - This prevents the plugin from running even though it's auto-installed

2. **Update build settings:**
   - Go to **"Site settings"** → **"Build & deploy"** → **"Build & deploy"**
   - Under **"Build settings"**, click **"Edit settings"**
   - Set **Build command** to: `echo "Identity/Git Gateway only - site hosted on Vercel"`
   - Set **Publish directory** to: `public/admin`
   - Click **"Save"**

3. **The netlify.toml file** (already in your repo):
   - The `netlify.toml` file includes the `NETLIFY_NEXT_PLUGIN_SKIP` environment variable
   - Setting it in the UI as well ensures it works reliably

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

### GitHub OAuth completes but doesn't log in / Stuck at admin page

If GitHub OAuth goes through but you're stuck at `https://mynzagric.com/admin#/`:

1. **Verify Site URL in Netlify Identity:**
   - Go to Netlify dashboard → Your site → Identity → Settings and usage
   - Scroll to **"Site URL"**
   - Make sure it's set to: `https://mynzagric.com` (your Vercel domain, not the Netlify domain)
   - Click **"Save"**

2. **Check OAuth Callback URL:**
   - In Netlify Identity → Settings → External providers → GitHub
   - Verify the callback URL is: `https://mynzagric.com/admin/`
   - If it shows a Netlify domain, update it to your Vercel domain

3. **Clear browser cache and cookies:**
   - Clear cookies for `mynzagric.com`
   - Try in an incognito/private window

4. **Verify Identity widget initialization:**
   - The `public/admin/index.html` file should have proper OAuth callback handling
   - Check browser console (F12) for any JavaScript errors

5. **Check if email login is visible:**
   - If you only see GitHub login, email/password might be disabled
   - Go to Netlify Identity → Settings → Registration preferences
   - Make sure email/password authentication is enabled
   - If using "Invite only", make sure you've invited your email address

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

