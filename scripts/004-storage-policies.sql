-- Storage Bucket Policies for file_store
-- This migration sets up RLS policies for the file_store bucket to allow uploads

-- ============================================
-- FILE_STORE BUCKET POLICIES
-- ============================================

-- First, ensure the bucket exists (this is safe to run even if it exists)
INSERT INTO storage.buckets (id, name, public)
VALUES ('file_store', 'file_store', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Drop existing policies if any (to avoid conflicts)
DROP POLICY IF EXISTS "Allow public uploads to file_store" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read access to file_store" ON storage.objects;
DROP POLICY IF EXISTS "Allow public delete from file_store" ON storage.objects;
DROP POLICY IF EXISTS "Allow public update to file_store" ON storage.objects;

-- Allow anyone to upload files to file_store bucket
CREATE POLICY "Allow public uploads to file_store"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'file_store');

-- Allow anyone to read files from file_store bucket
CREATE POLICY "Allow public read access to file_store"
ON storage.objects FOR SELECT
USING (bucket_id = 'file_store');

-- Allow anyone to delete files from file_store bucket
CREATE POLICY "Allow public delete from file_store"
ON storage.objects FOR DELETE
USING (bucket_id = 'file_store');

-- Allow anyone to update files in file_store bucket
CREATE POLICY "Allow public update to file_store"
ON storage.objects FOR UPDATE
USING (bucket_id = 'file_store');

-- ============================================
-- ALTERNATIVE: More secure policies (commented out)
-- Uncomment these if you want to restrict access
-- ============================================

-- Only allow authenticated users to upload
-- CREATE POLICY "Allow authenticated uploads to file_store"
-- ON storage.objects FOR INSERT
-- WITH CHECK (
--   bucket_id = 'file_store' 
--   AND auth.role() = 'authenticated'
-- );

-- Only allow owners to delete their own files
-- CREATE POLICY "Allow users to delete own files"
-- ON storage.objects FOR DELETE
-- USING (
--   bucket_id = 'file_store'
--   AND auth.uid() = owner
-- );
