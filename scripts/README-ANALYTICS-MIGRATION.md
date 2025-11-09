# Analytics Migration Guide

## Migration: 005-analytics-functions-indexes.sql

This migration adds database functions and indexes to support dynamic analytics dashboards.

### What it includes:

1. **Performance Indexes:**
   - `idx_event_registrations_registration_date` - Speeds up date-based queries
   - `idx_event_registrations_event_id` - Optimizes event-specific lookups
   - `idx_events_created_at` - Faster event creation date queries
   - `idx_events_category` - Quick category filtering
   - `idx_users_created_at` - User sign-up date queries
   - `idx_news_category` - News category filtering
   - `idx_news_status` - Published status queries

2. **Database Functions:**
   - `get_monthly_registrations()` - Returns registration and event counts for the last 11 months
   - `get_weekly_activity()` - Returns user sign-ups and registrations for the last 7 days

### How to run:

#### Option 1: Supabase Dashboard (Recommended)
1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `005-analytics-functions-indexes.sql`
4. Click "Run" or press Ctrl+Enter

#### Option 2: Supabase CLI
```bash
# If you have Supabase CLI installed
supabase db push
```

#### Option 3: psql Command Line
```bash
psql "your-connection-string" -f scripts/005-analytics-functions-indexes.sql
```

### Verify Installation:

After running the migration, verify it worked:

```sql
-- Check if functions exist
SELECT routine_name 
FROM information_schema.routines 
WHERE routine_name IN ('get_monthly_registrations', 'get_weekly_activity');

-- Test the functions
SELECT * FROM get_monthly_registrations();
SELECT * FROM get_weekly_activity();

-- Check indexes
SELECT indexname 
FROM pg_indexes 
WHERE tablename IN ('event_registrations', 'events', 'users', 'news');
```

### What changes in the app:

After running this migration, the Analytics Dashboard will display:
- ✅ Real monthly registration trends
- ✅ Actual event category distribution
- ✅ Live weekly user activity
- ✅ Dynamic news engagement metrics

All charts will automatically use real data from your database instead of dummy data!
