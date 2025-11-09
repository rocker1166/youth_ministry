-- Analytics Functions and Indexes Migration
-- Adds database functions and indexes for efficient analytics queries

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_event_registrations_registration_date 
  ON public.event_registrations(registration_date);

CREATE INDEX IF NOT EXISTS idx_event_registrations_event_id 
  ON public.event_registrations(event_id);

CREATE INDEX IF NOT EXISTS idx_events_created_at 
  ON public.events(created_at);

CREATE INDEX IF NOT EXISTS idx_events_category 
  ON public.events(category);

CREATE INDEX IF NOT EXISTS idx_users_created_at 
  ON public.users(created_at);

CREATE INDEX IF NOT EXISTS idx_news_category 
  ON public.news(category);

CREATE INDEX IF NOT EXISTS idx_news_status 
  ON public.news(status);

-- Function to get monthly registrations for the last 11 months
CREATE OR REPLACE FUNCTION get_monthly_registrations()
RETURNS TABLE (
  month TEXT,
  registrations BIGINT,
  events BIGINT
) AS $$
BEGIN
  RETURN QUERY
  WITH months AS (
    SELECT 
      TO_CHAR(DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month' * generate_series(0, 10)), 'Mon') AS month,
      DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month' * generate_series(0, 10)) AS month_date
    ORDER BY month_date
  ),
  registration_counts AS (
    SELECT 
      TO_CHAR(DATE_TRUNC('month', registration_date), 'Mon') AS month,
      COUNT(*) AS reg_count
    FROM public.event_registrations
    WHERE registration_date >= DATE_TRUNC('month', CURRENT_DATE - INTERVAL '10 months')
    GROUP BY DATE_TRUNC('month', registration_date)
  ),
  event_counts AS (
    SELECT 
      TO_CHAR(DATE_TRUNC('month', created_at), 'Mon') AS month,
      COUNT(*) AS event_count
    FROM public.events
    WHERE created_at >= DATE_TRUNC('month', CURRENT_DATE - INTERVAL '10 months')
    GROUP BY DATE_TRUNC('month', created_at)
  )
  SELECT 
    m.month,
    COALESCE(rc.reg_count, 0) AS registrations,
    COALESCE(ec.event_count, 0) AS events
  FROM months m
  LEFT JOIN registration_counts rc ON m.month = rc.month
  LEFT JOIN event_counts ec ON m.month = ec.month
  ORDER BY m.month_date;
END;
$$ LANGUAGE plpgsql;

-- Function to get weekly activity for the last 7 days
CREATE OR REPLACE FUNCTION get_weekly_activity()
RETURNS TABLE (
  day TEXT,
  users BIGINT,
  registrations BIGINT
) AS $$
BEGIN
  RETURN QUERY
  WITH days AS (
    SELECT 
      TO_CHAR(CURRENT_DATE - INTERVAL '1 day' * generate_series(6, 0, -1), 'Dy') AS day,
      DATE_TRUNC('day', CURRENT_DATE - INTERVAL '1 day' * generate_series(6, 0, -1)) AS day_date
  ),
  user_counts AS (
    SELECT 
      TO_CHAR(DATE_TRUNC('day', created_at), 'Dy') AS day,
      COUNT(*) AS user_count
    FROM public.users
    WHERE created_at >= DATE_TRUNC('day', CURRENT_DATE - INTERVAL '6 days')
    GROUP BY DATE_TRUNC('day', created_at)
  ),
  registration_counts AS (
    SELECT 
      TO_CHAR(DATE_TRUNC('day', registration_date), 'Dy') AS day,
      COUNT(*) AS reg_count
    FROM public.event_registrations
    WHERE registration_date >= DATE_TRUNC('day', CURRENT_DATE - INTERVAL '6 days')
    GROUP BY DATE_TRUNC('day', registration_date)
  )
  SELECT 
    d.day,
    COALESCE(uc.user_count, 0) AS users,
    COALESCE(rc.reg_count, 0) AS registrations
  FROM days d
  LEFT JOIN user_counts uc ON d.day = uc.day
  LEFT JOIN registration_counts rc ON d.day = rc.day
  ORDER BY d.day_date;
END;
$$ LANGUAGE plpgsql;

-- Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION get_monthly_registrations() TO authenticated;
GRANT EXECUTE ON FUNCTION get_weekly_activity() TO authenticated;

-- Add comments for documentation
COMMENT ON FUNCTION get_monthly_registrations() IS 'Returns registration and event counts for the last 11 months';
COMMENT ON FUNCTION get_weekly_activity() IS 'Returns user sign-ups and registrations for the last 7 days';
COMMENT ON INDEX idx_event_registrations_registration_date IS 'Speeds up queries filtering by registration date';
COMMENT ON INDEX idx_events_created_at IS 'Speeds up queries filtering by event creation date';
COMMENT ON INDEX idx_users_created_at IS 'Speeds up queries filtering by user creation date';
