# 🗄️ Supabase Setup Guide

## The Problem

You're getting 500 errors because:
1. Your Supabase environment variables aren't set in Vercel
2. You may need to configure your Supabase project properly

## Complete Setup Checklist

### Part 1: Add Environment Variables to Vercel

1. **Get your credentials:**
   ```bash
   cat .env.local
   ```
   Copy the values for:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

2. **Add to Vercel:**
   - Go to https://vercel.com/dashboard
   - Click your project
   - Go to **Settings** → **Environment Variables**
   - Add these 3 variables:

   | Name | Value | Environment |
   |------|-------|-------------|
   | `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase URL | ✅ Production, Preview, Development |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your anon key | ✅ Production, Preview, Development |
   | `NEXT_PUBLIC_SITE_URL` | `https://jeremiah33-3.app` | ✅ Production, Preview, Development |

3. **Save** each variable

### Part 2: Configure Supabase Project

#### A. Run Database Migrations

Your database needs the tables and policies. In Supabase dashboard:

1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to **SQL Editor**
4. Run each migration file in order:

**Migration 1:** [001_create_focus_sessions.sql](supabase/migrations/001_create_focus_sessions.sql)
```sql
-- Copy and paste the entire content of this file and click "Run"
```

**Migration 2:** [002_create_user_profiles.sql](supabase/migrations/002_create_user_profiles.sql)
```sql
-- Copy and paste the entire content of this file and click "Run"
```

**Migration 3:** [003_add_user_settings.sql](supabase/migrations/003_add_user_settings.sql)
```sql
-- Copy and paste the entire content of this file and click "Run"
```

**Migration 4:** [004_deny_session_modifications.sql](supabase/migrations/004_deny_session_modifications.sql)
```sql
-- Copy and paste the entire content of this file and click "Run"
```

**Migration 5:** [005_add_data_constraints.sql](supabase/migrations/005_add_data_constraints.sql)
```sql
-- Copy and paste the entire content of this file and click "Run"
```

#### B. Verify Tables Were Created

In Supabase dashboard:
1. Go to **Table Editor**
2. You should see:
   - ✅ `focus_sessions`
   - ✅ `user_profiles`
   - ✅ `user_settings` (if migration 3 has settings table)

#### C. Configure Authentication

**Email/Password Auth:**
1. Go to **Authentication** → **Providers**
2. Find **Email**
3. Make sure:
   - **Enable Email provider:** ON
   - **Confirm email:** Your choice (ON = users must verify email, OFF = instant signup)
   - **Secure email change:** ON (recommended)

**Google OAuth (Optional):**
1. Still in **Authentication** → **Providers**
2. Find **Google**
3. Click **Enable**
4. You'll need:
   - **Client ID** from Google Cloud Console
   - **Client Secret** from Google Cloud Console

   To get these:
   - Go to https://console.cloud.google.com
   - Create a new project or select existing
   - Go to **APIs & Services** → **Credentials**
   - Click **Create Credentials** → **OAuth 2.0 Client ID**
   - Application type: **Web application**
   - **Authorized redirect URIs:** Add:
     ```
     https://YOUR-PROJECT-ID.supabase.co/auth/v1/callback
     ```
     (Get YOUR-PROJECT-ID from your Supabase project URL)

5. Copy Client ID and Secret to Supabase
6. Click **Save**

#### D. Configure Site URL

1. Go to **Authentication** → **URL Configuration**
2. Set **Site URL:** `https://jeremiah33-3.app`
3. Add **Redirect URLs:**
   - `https://jeremiah33-3.app/auth/callback`
   - `https://jeremiah33-3.app/dashboard`
   - `http://localhost:3000/auth/callback` (for local development)
   - `http://localhost:3000/dashboard` (for local development)

### Part 3: Deploy

Now redeploy your app:

```bash
git add .
git commit -m "Fix auth callback and complete Supabase mocks"
git push
```

Or in Vercel dashboard:
- Go to **Deployments**
- Click ⋯ on latest deployment
- Click **Redeploy**

### Part 4: Test

After deployment completes:

1. **Go to your site:** https://jeremiah33-3.app/login
2. **Open DevTools:** Press F12, go to Console tab
3. **Try signing up:**
   - Click "Sign Up"
   - Enter email and password
   - Should work now (or ask you to verify email if you enabled that)

4. **Check for errors:**
   - Should see NO 500 errors
   - Should see NO "Supabase not configured" messages

### Part 5: Verify Everything Works

Test each feature:

- [ ] Sign up with email/password
- [ ] Verify email (if enabled)
- [ ] Log in with email/password
- [ ] Start a timer session
- [ ] Complete a timer session
- [ ] Go to dashboard
- [ ] See your completed session
- [ ] Log out
- [ ] Log back in
- [ ] Data persists

## Troubleshooting

### Still Getting 500 Errors?

**Check Vercel Logs:**
1. Go to Vercel dashboard → your project
2. Click **Deployments** → Latest deployment
3. Click **Runtime Logs**
4. Look for error messages

**Check Vercel Environment Variables:**
1. Settings → Environment Variables
2. Verify all 3 variables are set
3. Make sure they're enabled for **Production**

**Check Supabase RLS:**
1. Supabase dashboard → **Table Editor**
2. Click `focus_sessions` table
3. Click **RLS** (Row Level Security) tab
4. Should see:
   - ✅ "Users can view their own sessions"
   - ✅ "Users can insert their own sessions"
   - ✅ "Users cannot update their sessions"
   - ✅ "Users cannot delete their sessions"

### "Invalid JWT" or "JWT expired" Errors?

This means your anon key is wrong. Double-check:
1. Copy the key from Supabase dashboard → **Settings** → **API**
2. Look for **anon public** key
3. Re-add to Vercel with exact value

### Google Sign In Not Working?

1. Check Google Cloud Console redirect URIs match Supabase
2. Make sure Google OAuth is enabled in Supabase
3. Check browser console for specific error message

## Quick Verification Script

To verify env vars are set in production, add this temporarily to your page:

```typescript
// Add to app/(auth)/login/page.tsx temporarily
useEffect(() => {
  console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
  console.log('Site URL:', process.env.NEXT_PUBLIC_SITE_URL)
}, [])
```

If it logs `undefined`, environment variables aren't set in Vercel.

## Summary

Your checklist:
1. ✅ Add 3 environment variables to Vercel
2. ✅ Run all 5 database migrations in Supabase SQL Editor
3. ✅ Configure authentication providers in Supabase
4. ✅ Set Site URL and Redirect URLs in Supabase
5. ✅ Redeploy from Vercel or git push
6. ✅ Test signup/login on production site

After completing these steps, authentication should work perfectly! 🎉
