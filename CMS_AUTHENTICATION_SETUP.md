# CMS Authentication Setup Guide

This guide explains how to set up authentication for Decap CMS so you and your clients can manage blog content.

## Current Setup

The CMS is configured to use **GitHub OAuth authentication**. This means users log in with their GitHub accounts and must have access to your repository.

## Authentication Options

### Option 1: GitHub OAuth (Recommended for Vercel)

**How it works:**
- Users log in with their GitHub account
- They must be collaborators on your GitHub repository
- Changes are committed directly to your repo

**Setup Steps:**

1. **Create a GitHub OAuth App:**
   - Go to GitHub → Settings → Developer settings → OAuth Apps
   - Click "New OAuth App"
   - Application name: `Mynzagric CMS`
   - Homepage URL: `https://mynzagric.com`
   - Authorization callback URL: `https://mynzagric.com/admin/index.html`
   - Click "Register application"
   - **Copy the Client ID** (you'll need this)

2. **Update CMS Config:**
   - Open `public/admin/config.yml`
   - Add your Client ID:
   ```yaml
   backend:
     name: github
     repo: AfriCodeWizard/MYNZAGRIC
     branch: main
     base_url: https://mynzagric.com
   ```

3. **Add Environment Variable:**
   - In Vercel, go to your project settings
   - Add environment variable: `GITHUB_CLIENT_ID` = (your Client ID from step 1)
   - For local development, add to `.env.local`:
     ```
     GITHUB_CLIENT_ID=your_client_id_here
     ```

4. **Add Repository Collaborators:**
   - Go to your GitHub repository
   - Settings → Collaborators → Add people
   - Invite users by their GitHub username or email
   - They'll receive an invitation email
   - Once they accept, they can log in to the CMS

### Option 2: Netlify Identity (If you switch to Netlify)

If you deploy to Netlify instead of Vercel:

1. Enable Netlify Identity in your Netlify dashboard
2. Enable Git Gateway
3. Users can sign up/login with email
4. No GitHub account required

### Option 3: Proxy Authentication (Advanced)

For custom authentication, you can set up a proxy server. This requires more technical setup.

## How Users Log In

1. Navigate to `https://mynzagric.com/admin`
2. Click "Login with GitHub"
3. Authorize the application
4. If they're a collaborator, they'll see the CMS interface
5. If not, they'll see an error (they need to be added as a collaborator first)

## Adding Multiple Users

### For GitHub OAuth:

1. **Add as GitHub Collaborator:**
   - Repository → Settings → Collaborators
   - Add their GitHub username
   - Choose permission level (usually "Write" for content editors)

2. **They Log In:**
   - They visit `/admin`
   - Click "Login with GitHub"
   - Authorize the app
   - They can now create/edit posts

### Permission Levels:

- **Read**: Can view but not edit (not useful for CMS)
- **Write**: Can create, edit, and delete content (recommended for content editors)
- **Admin**: Full repository access (use carefully)

## Security Considerations

1. **Repository Access**: Only add trusted users as collaborators
2. **Branch Protection**: Consider protecting the `main` branch and requiring pull requests
3. **Content Review**: Set up a workflow where drafts require approval before publishing

## Troubleshooting

### "No backend defined" error:
- Check that `public/admin/config.yml` has the correct backend configuration
- Verify the GitHub Client ID is set

### "Repository not found" error:
- Check the `repo` field matches your GitHub username/repo-name exactly
- Ensure the repository is public or the user has access

### "Authentication failed":
- Verify the OAuth callback URL matches exactly
- Check that the user is a collaborator on the repository
- Ensure the GitHub OAuth app is properly configured

### Users can't log in:
- They must accept the GitHub collaboration invitation first
- Check their GitHub account has access to the repository
- Verify the OAuth app is active and configured correctly

## Alternative: Email-Based Authentication

If you want users to log in without GitHub accounts, consider:

1. **Switch to Netlify** and use Netlify Identity
2. **Use a different CMS** like Sanity, Contentful, or Strapi
3. **Build custom authentication** (more complex)

## Quick Setup Checklist

- [ ] Create GitHub OAuth App
- [ ] Add Client ID to Vercel environment variables
- [ ] Update `public/admin/config.yml` with correct repo name
- [ ] Test login with your GitHub account
- [ ] Add collaborators to GitHub repository
- [ ] Test login with collaborator accounts
- [ ] Document login process for your team

## For Your Clients

**Simple Instructions to Share:**

1. Go to `https://mynzagric.com/admin`
2. Click "Login with GitHub"
3. If you don't have a GitHub account, create one at github.com
4. Once logged in, you'll see the blog management interface
5. Click "New Blog Post" to create content

**Note:** They must be added as collaborators first. Contact you to be added to the repository.

