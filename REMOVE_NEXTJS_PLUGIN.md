# ✅ Solution: Skip Next.js Plugin with Environment Variable

## The Problem
The `@netlify/plugin-nextjs` plugin is auto-installed by Netlify when it detects a Next.js project. Even if you can't see it in the UI, it runs during builds and causes errors.

## The Solution: Set Environment Variable

Instead of trying to remove the plugin (which may not be visible), set an environment variable to skip it:

### Step 1: Go to Environment Variables
1. Open [https://app.netlify.com](https://app.netlify.com)
2. Click on your site
3. Go to **"Site settings"** (gear icon)
4. Click **"Build & deploy"** in the left menu
5. Click **"Environment"**

### Step 2: Add the Variable
1. Click **"Add variable"** button
2. **Key**: `NETLIFY_NEXT_PLUGIN_SKIP`
3. **Value**: `true`
4. Click **"Save"**

### Step 3: Trigger New Deploy
1. Go to **"Deploys"** tab
2. Click **"Trigger deploy"** → **"Deploy site"**
3. The build should now succeed - the plugin will be skipped

## Why This Works

The `NETLIFY_NEXT_PLUGIN_SKIP` environment variable tells Netlify to skip the Next.js plugin even though it's auto-installed. This is much easier than trying to remove a plugin that may not be visible in the UI.

## Also in netlify.toml

The `netlify.toml` file in your repo also includes this setting:
```toml
[build.environment]
  NETLIFY_NEXT_PLUGIN_SKIP = "true"
```

But setting it in the UI ensures it works reliably across all deployments.

## After Setting the Variable

- ✅ Builds will no longer fail due to the Next.js plugin
- ✅ Identity and Git Gateway will work (they don't need the build to succeed)
- ✅ Future deployments should work smoothly
