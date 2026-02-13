# Avatar Upload Setup

For the artist avatar photo upload to work, create a Supabase Storage bucket:

## 1. Create the bucket

1. Go to [Supabase Dashboard](https://supabase.com/dashboard) → your project
2. **Storage** → **New bucket**
3. Name: `artist-avatars`
4. **Public bucket**: Yes (so avatars display on the site)
5. **File size limit**: 5 MB
6. **Allowed MIME types**: `image/jpeg`, `image/png`, `image/webp`
7. Click **Create bucket**

## 2. Run the storage policies migration

Run the SQL in `supabase/migrations/002_storage_avatars.sql` in the Supabase SQL Editor to add RLS policies for authenticated uploads.
