-- ============================================
-- Supabase Storage: booking-references bucket policies
-- ============================================
-- Create the bucket first in Dashboard: Storage > New bucket > "booking-references"
-- Set to Public, allow image/jpeg, image/png, image/webp, image/gif, max 5MB

-- Allow anyone (anon) to upload - booking form is used by unauthenticated users
CREATE POLICY "Anyone can upload booking references"
ON storage.objects FOR INSERT
TO anon
WITH CHECK (bucket_id = 'booking-references');

-- Public read
CREATE POLICY "Public read for booking references"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'booking-references');
