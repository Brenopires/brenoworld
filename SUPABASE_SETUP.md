# Supabase Migration Setup Guide

## Project Information
- **Project ID**: gfuwvebmbulhhbtkhwje
- **Project URL**: https://gfuwvebmbulhhbtkhwje.supabase.co
- **Dashboard**: https://supabase.com/dashboard/project/gfuwvebmbulhhbtkhwje

---

## Step 1: Run Database Migration

1. Open Supabase Dashboard: https://supabase.com/dashboard/project/gfuwvebmbulhhbtkhwje
2. Navigate to **SQL Editor** (left sidebar)
3. Click **New Query**
4. Copy and paste the contents of `supabase-migration.sql` into the editor
5. Click **Run** to execute the migration
6. Verify that all tables were created successfully

---

## Step 2: Get API Keys

1. In Supabase Dashboard, go to **Settings** > **API**
2. Copy the following values:
   - **Project URL**: `https://gfuwvebmbulhhbtkhwje.supabase.co`
   - **anon/public key**: This is the public key (starts with `eyJ...`)
   - **service_role key**: This is the secret key (also starts with `eyJ...`)

---

## Step 3: Update Environment Variables

Update your `.env` file with the API keys:

```bash
# Supabase Configuration
SUPABASE_URL=https://gfuwvebmbulhhbtkhwje.supabase.co
SUPABASE_ANON_KEY=<paste your anon key here>
SUPABASE_SERVICE_ROLE_KEY=<paste your service_role key here>

# Vite Environment Variables (for frontend)
VITE_SUPABASE_URL=https://gfuwvebmbulhhbtkhwje.supabase.co
VITE_SUPABASE_ANON_KEY=<paste your anon key here>

# Google Maps API (already configured)
VITE_GOOGLE_MAPS_API_KEY=AIzaSyDxXkFEWpeKZTNowwBXbKPJ8EIFZWyzUAw
```

---

## Step 4: Create Admin User

1. In Supabase Dashboard, go to **Authentication** > **Users**
2. Click **Add User**
3. Create a user with:
   - **Email**: `breno@familiapires.com.br`
   - **Password**: Choose a secure password
   - **Auto-confirm**: Check this box
4. Click **Create User**

This user will have admin access to the application.

---

## Step 5: Install Dependencies and Run

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

---

## Step 6: Deploy to Vercel

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Migrate to Supabase"
   git push
   ```

2. In Vercel Dashboard:
   - Go to your project settings
   - Navigate to **Environment Variables**
   - Add all variables from your `.env` file
   - Redeploy the application

---

## Testing the Migration

1. **Test Database Connection**:
   - Visit `/api/posts` - Should return empty array or existing posts
   - Visit `/api/media` - Should return empty array or existing media

2. **Test Authentication**:
   - Visit `/login`
   - Login with admin credentials
   - Verify you can access `/admin` dashboard

3. **Test CRUD Operations**:
   - In admin dashboard, try creating a new post
   - Verify it appears in the feed
   - Try editing and deleting content

---

## Database Schema

The migration creates the following tables:
- `posts` - Blog posts and thoughts
- `media_items` - Images and videos
- `tools` - Tool recommendations
- `playbooks` - Step-by-step guides
- `cases` - Case studies
- `trips` - Travel history for map visualization

All tables have:
- Row Level Security (RLS) enabled
- Public read access
- Admin-only write access
- Automatic timestamps

---

## Troubleshooting

### API Keys Not Working
- Make sure you copied the full key (they're very long)
- Don't include any quotes or extra spaces
- Restart your dev server after changing `.env`

### Authentication Failing
- Verify admin user exists in Supabase Auth
- Check that email matches exactly: `breno@familiapires.com.br`
- Clear browser cookies and try again

### Database Queries Failing
- Check that migration ran successfully
- Verify all tables exist in Supabase Table Editor
- Check RLS policies are enabled

### Vercel Deployment Issues
- Ensure all environment variables are set
- Check Vercel logs for specific errors
- Verify Supabase project is not paused

---

## Changes Made

### Removed
- Better Auth (replaced with Supabase Auth)
- Neon Database (replaced with Supabase PostgreSQL)
- `pg` package (replaced with `@supabase/supabase-js`)
- `lib/auth-server.js` (replaced with `lib/supabase-server.js`)
- `src/lib/auth-client.js` (replaced with `src/lib/supabase-client.js`)

### Added
- `@supabase/supabase-js` package
- `lib/supabase-server.js` - Server-side Supabase client
- `src/lib/supabase-client.js` - Client-side Supabase client
- `supabase-migration.sql` - Database schema migration
- This setup guide

### Updated
- All API endpoints (`/api/*.js`) to use Supabase client
- Login page to use Supabase Auth
- Admin page to use Supabase Auth session management
- Environment variables configuration

---

## Next Steps

After completing the setup:
1. Test all features thoroughly
2. Migrate existing data if needed
3. Update any documentation
4. Deploy to production
5. Monitor for any issues

For support, check:
- Supabase Docs: https://supabase.com/docs
- Supabase Community: https://github.com/supabase/supabase/discussions
