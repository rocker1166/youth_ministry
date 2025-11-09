-- Add analytics, admin audit logs, and expanded admin permissions
CREATE TABLE IF NOT EXISTS public.analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  metric_type VARCHAR(100) NOT NULL,
  metric_value INTEGER,
  event_id UUID REFERENCES public.events(id),
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.admin_audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID NOT NULL REFERENCES public.admin_users(id),
  action VARCHAR(255) NOT NULL,
  entity_type VARCHAR(100),
  entity_id UUID,
  changes JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.registrations_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES public.events(id),
  total_registrations INTEGER DEFAULT 0,
  confirmed INTEGER DEFAULT 0,
  attended INTEGER DEFAULT 0,
  date DATE DEFAULT CURRENT_DATE
);

-- Create indexes
CREATE INDEX idx_analytics_metric ON public.analytics(metric_type);
CREATE INDEX idx_analytics_event ON public.analytics(event_id);
CREATE INDEX idx_audit_admin ON public.admin_audit_logs(admin_id);
CREATE INDEX idx_registrations_analytics_event ON public.registrations_analytics(event_id);

-- Update events table with more admin fields
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS agenda TEXT;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS speakers TEXT;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS registration_deadline TIMESTAMP;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT FALSE;

-- Update news table with publishing workflow
ALTER TABLE public.news ADD COLUMN IF NOT EXISTS scheduled_for TIMESTAMP;
ALTER TABLE public.news ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;

-- Update gallery with approval workflow
ALTER TABLE public.gallery ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'pending';
ALTER TABLE public.gallery ADD COLUMN IF NOT EXISTS approved_by UUID REFERENCES public.admin_users(id);
ALTER TABLE public.gallery ADD COLUMN IF NOT EXISTS approved_at TIMESTAMP;

-- RLS Policies for admin tables
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations_analytics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view analytics" ON public.analytics
  FOR SELECT USING (true);

CREATE POLICY "Admins can view audit logs" ON public.admin_audit_logs
  FOR SELECT USING (true);
