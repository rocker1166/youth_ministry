-- Fix RLS Policies to Allow Admin Operations
-- This migration adds policies for INSERT, UPDATE, and DELETE operations

-- ============================================
-- EVENTS TABLE POLICIES
-- ============================================

-- Allow anyone to insert events (for admin operations using service role key)
CREATE POLICY "Enable insert for service role" ON public.events
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for service role" ON public.events
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for service role" ON public.events
  FOR DELETE USING (true);

-- ============================================
-- NEWS TABLE POLICIES
-- ============================================

CREATE POLICY "Enable insert for service role" ON public.news
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for service role" ON public.news
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for service role" ON public.news
  FOR DELETE USING (true);

-- ============================================
-- GALLERY TABLE POLICIES
-- ============================================

CREATE POLICY "Enable insert for service role" ON public.gallery
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for service role" ON public.gallery
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for service role" ON public.gallery
  FOR DELETE USING (true);

-- ============================================
-- USERS TABLE POLICIES
-- ============================================

CREATE POLICY "Enable read access for all users" ON public.users
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for service role" ON public.users
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for service role" ON public.users
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for service role" ON public.users
  FOR DELETE USING (true);

-- ============================================
-- EVENT REGISTRATIONS TABLE POLICIES
-- ============================================

CREATE POLICY "Enable read access for all users" ON public.event_registrations
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for service role" ON public.event_registrations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for service role" ON public.event_registrations
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for service role" ON public.event_registrations
  FOR DELETE USING (true);

-- ============================================
-- PROGRAMS TABLE POLICIES
-- ============================================

CREATE POLICY "Enable insert for service role" ON public.programs
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for service role" ON public.programs
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for service role" ON public.programs
  FOR DELETE USING (true);

-- ============================================
-- CONTACT SUBMISSIONS TABLE POLICIES
-- ============================================

CREATE POLICY "Enable read access for all users" ON public.contact_submissions
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON public.contact_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for service role" ON public.contact_submissions
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for service role" ON public.contact_submissions
  FOR DELETE USING (true);

-- ============================================
-- GRIEVANCES TABLE POLICIES
-- ============================================

CREATE POLICY "Enable read access for all users" ON public.grievances
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON public.grievances
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for service role" ON public.grievances
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for service role" ON public.grievances
  FOR DELETE USING (true);

-- ============================================
-- FAQ TABLE POLICIES
-- ============================================

CREATE POLICY "Enable read access for all users" ON public.faq
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for service role" ON public.faq
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for service role" ON public.faq
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for service role" ON public.faq
  FOR DELETE USING (true);

-- ============================================
-- ADMIN USERS TABLE POLICIES
-- ============================================

CREATE POLICY "Enable read access for all users" ON public.admin_users
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for service role" ON public.admin_users
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for service role" ON public.admin_users
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for service role" ON public.admin_users
  FOR DELETE USING (true);

-- ============================================
-- ANALYTICS TABLE POLICIES (if exists)
-- ============================================

CREATE POLICY "Enable insert for service role" ON public.analytics
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for service role" ON public.analytics
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for service role" ON public.analytics
  FOR DELETE USING (true);

-- ============================================
-- ADMIN AUDIT LOGS TABLE POLICIES (if exists)
-- ============================================

CREATE POLICY "Enable insert for service role" ON public.admin_audit_logs
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for service role" ON public.admin_audit_logs
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for service role" ON public.admin_audit_logs
  FOR DELETE USING (true);

-- ============================================
-- REGISTRATIONS ANALYTICS TABLE POLICIES (if exists)
-- ============================================

CREATE POLICY "Enable read access for all users" ON public.registrations_analytics
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for service role" ON public.registrations_analytics
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for service role" ON public.registrations_analytics
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for service role" ON public.registrations_analytics
  FOR DELETE USING (true);

-- ============================================
-- SITE SETTINGS TABLE POLICIES
-- ============================================

CREATE POLICY "Enable read access for all users" ON public.site_settings
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for service role" ON public.site_settings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for service role" ON public.site_settings
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for service role" ON public.site_settings
  FOR DELETE USING (true);

-- ============================================
-- SEARCH INDEX TABLE POLICIES
-- ============================================

CREATE POLICY "Enable read access for all users" ON public.search_index
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for service role" ON public.search_index
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for service role" ON public.search_index
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for service role" ON public.search_index
  FOR DELETE USING (true);
