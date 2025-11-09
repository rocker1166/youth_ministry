-- Supabase Migration: Complete Government Portal Schema
-- UX4G Compliant Schema for Institute of Youth Affairs Portal

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "http";

-- Users Table
CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  date_of_birth DATE,
  gender VARCHAR(50),
  state VARCHAR(100),
  city VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Events Table
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  location VARCHAR(255),
  category VARCHAR(100),
  image_url VARCHAR(500),
  capacity INTEGER,
  registered_count INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'upcoming',
  created_by UUID REFERENCES public.users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Event Registrations Table
CREATE TABLE public.event_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) DEFAULT 'confirmed',
  confirmation_pdf_url VARCHAR(500),
  is_attended BOOLEAN DEFAULT FALSE,
  feedback TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  UNIQUE(event_id, user_id)
);

-- News/Articles Table
CREATE TABLE public.news (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt VARCHAR(500),
  featured_image VARCHAR(500),
  category VARCHAR(100),
  author_id UUID REFERENCES public.users(id),
  status VARCHAR(50) DEFAULT 'draft',
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Gallery Table
CREATE TABLE public.gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(500) NOT NULL,
  video_url VARCHAR(500),
  category VARCHAR(100),
  event_id UUID REFERENCES public.events(id) ON DELETE SET NULL,
  uploaded_by UUID REFERENCES public.users(id),
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Programs/Schemes Table
CREATE TABLE public.programs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  objectives TEXT,
  duration VARCHAR(100),
  eligibility TEXT,
  benefits TEXT,
  application_link VARCHAR(500),
  category VARCHAR(100),
  image_url VARCHAR(500),
  status VARCHAR(50) DEFAULT 'active',
  created_by UUID REFERENCES public.users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact Submissions Table
CREATE TABLE public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) DEFAULT 'new',
  assigned_to UUID REFERENCES public.users(id),
  response TEXT,
  responded_at TIMESTAMP
);

-- Grievance Table
CREATE TABLE public.grievances (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reference_number VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  grievance_type VARCHAR(100),
  description TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new',
  priority VARCHAR(50) DEFAULT 'medium',
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  assigned_to UUID REFERENCES public.users(id),
  resolution TEXT,
  resolved_at TIMESTAMP
);

-- Chatbot FAQ Table
CREATE TABLE public.faq (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_en VARCHAR(500) NOT NULL,
  question_hi VARCHAR(500),
  answer_en TEXT NOT NULL,
  answer_hi TEXT,
  category VARCHAR(100),
  keywords VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admin Users Table
CREATE TABLE public.admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
  role VARCHAR(50) DEFAULT 'moderator',
  permissions JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Search Index Table
CREATE TABLE public.search_index (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_type VARCHAR(100),
  content_id UUID,
  title VARCHAR(255),
  description TEXT,
  keywords VARCHAR(500),
  language VARCHAR(10) DEFAULT 'en',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Site Settings/Metadata
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key VARCHAR(255) UNIQUE NOT NULL,
  value TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Indexes for Performance
CREATE INDEX idx_events_status ON public.events(status);
CREATE INDEX idx_events_start_date ON public.events(start_date);
CREATE INDEX idx_news_status ON public.news(status);
CREATE INDEX idx_news_published_at ON public.news(published_at);
CREATE INDEX idx_registrations_user ON public.event_registrations(user_id);
CREATE INDEX idx_registrations_event ON public.event_registrations(event_id);
CREATE INDEX idx_gallery_category ON public.gallery(category);
CREATE INDEX idx_programs_status ON public.programs(status);
CREATE INDEX idx_search_language ON public.search_index(language);
CREATE INDEX idx_grievance_status ON public.grievances(status);

-- Enable RLS (Row Level Security)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grievances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faq ENABLE ROW LEVEL SECURITY;

-- RLS Policies (Public Read, Auth Write)
CREATE POLICY "Enable read access for all users" ON public.events
  FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON public.news
  FOR SELECT USING (status = 'published' OR true);

CREATE POLICY "Enable read access for all users" ON public.programs
  FOR SELECT USING (status = 'active' OR true);

CREATE POLICY "Enable read access for all users" ON public.gallery
  FOR SELECT USING (true);

-- Insert sample data
INSERT INTO public.faq (question_en, question_hi, answer_en, answer_hi, category, keywords)
VALUES
  ('What is the registration process?', 'पंजीकरण प्रक्रिया क्या है?', 'Visit our events page, select an event, and click register.', 'हमारे इवेंट पेज पर जाएं, एक इवेंट चुनें, और पंजीकरण बटन दबाएं।', 'events', 'registration, events, process'),
  ('How do I contact support?', 'मैं सहायता से संपर्क कैसे करूं?', 'Use our contact form or email us at support@example.com', 'हमारे संपर्क फॉर्म का उपयोग करें या हमें support@example.com पर ईमेल करें', 'support', 'contact, email, support');

INSERT INTO public.site_settings (key, value)
VALUES
  ('last_updated', NOW()::text),
  ('organization_name', 'Institute of Youth Affairs'),
  ('social_twitter', 'https://twitter.com/example'),
  ('social_facebook', 'https://facebook.com/example'),
  ('social_instagram', 'https://instagram.com/example'),
  ('social_linkedin', 'https://linkedin.com/company/example'),
  ('phone', '+91-XX-XXXX-XXXX'),
  ('email', 'info@example.com'),
  ('address', 'New Delhi, India');
