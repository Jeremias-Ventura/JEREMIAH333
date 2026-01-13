# 🔐 Authentication Not Working - Diagnosis & Fix

## Problem

Authentication doesn't work in production:
- Google Sign In doesn't work
- Email/password login doesn't work
- Sign up doesn't work

## Root Cause

Your **Supabase environment variables are NOT configured in Vercel** (your hosting platform).

The app works locally because you have `.env.local` with Supabase credentials, but in production (https://jeremiah33-3.app), those variables are missing.

## How to Fix

### Step 1: Get Your Supabase Credentials

From your local `.env.local` file, you need:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
```

To view them:
```bash
cat .env.local
```

### Step 2: Add Environment Variables to Vercel

1. Go to https://vercel.com/dashboard
2. Click on your `pomodor-bible-app` project
3. Click **Settings** tab
4. Click **Environment Variables** in left sidebar
5. Add these three variables:

   **Variable 1:**
   - Name: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: Your Supabase project URL (from .env.local)
   - Environment: Select **Production**, **Preview**, and **Development**

   **Variable 2:**
   - Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Value: Your Supabase anon key (from .env.local)
   - Environment: Select **Production**, **Preview**, and **Development**

   **Variable 3:**
   - Name: `NEXT_PUBLIC_SITE_URL`
   - Value: `https://jeremiah33-3.app`
   - Environment: Select **Production**, **Preview**, and **Development**

6. Click **Save** for each variable

### Step 3: Redeploy

After adding environment variables, you MUST redeploy:

**Option A: Trigger Redeploy in Vercel**
1. Go to **Deployments** tab
2. Click the ⋯ menu on the latest deployment
3. Click **Redeploy**

**Option B: Push a new commit**
```bash
git add .
git commit -m "Fix server-side Supabase mock client"
git push
```

### Step 4: Configure Google OAuth in Supabase

If Google Sign In still doesn't work after adding env vars:

1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to **Authentication** → **Providers**
4. Find **Google** provider
5. Make sure these are set:
   - **Enabled:** ON
   - **Authorized Client IDs:** Add your Google OAuth client ID
   - **Redirect URL:** Copy this URL and add it to your Google Cloud Console

6. In **Google Cloud Console** (https://console.cloud.google.com):
   - Go to **APIs & Services** → **Credentials**
   - Click your OAuth 2.0 Client ID
   - Under **Authorized redirect URIs**, add:
     ```
     https://xxxxx.supabase.co/auth/v1/callback
     ```
   - Replace `xxxxx` with your actual Supabase project ID

### Step 5: Verify

After redeployment:

1. Go to https://jeremiah33-3.app/login
2. Open browser DevTools (F12) → Console tab
3. Try signing in
4. Should work now!

## Secondary Issue Fixed

I also fixed the incomplete mock Supabase server client in [lib/supabase/server.ts](lib/supabase/server.ts). This was causing errors when environment variables were missing, but it's not the main issue.

## Quick Verification Command

To check if your production site has env vars set:

```bash
# Open your production site console and type:
console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)
```

If it shows `undefined`, environment variables are not set in Vercel.

## Common Mistakes

❌ **Don't** add environment variables to `.env.production` - this file is NOT deployed to Vercel
✅ **Do** add them in Vercel dashboard under Settings → Environment Variables

❌ **Don't** forget to redeploy after adding env vars
✅ **Do** redeploy immediately after saving env vars

❌ **Don't** forget to enable all three environments (Production, Preview, Development)
✅ **Do** check all three boxes when adding each variable

## Alternative: Check Vercel CLI

If using Vercel CLI:

```bash
# View environment variables
vercel env ls

# Pull environment variables to local
vercel env pull

# Add environment variable
vercel env add NEXT_PUBLIC_SUPABASE_URL
```

---

**TL;DR:** Your Supabase credentials are missing in Vercel. Add them in Vercel Dashboard → Settings → Environment Variables, then redeploy.
