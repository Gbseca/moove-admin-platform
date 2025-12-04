-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES & RBAC
CREATE TYPE user_role AS ENUM ('owner', 'admin', 'sales_agent');

CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  role user_role DEFAULT 'sales_agent',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Secure profiles:
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own profile.
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- Policy: Owners and Admins can view all profiles.
CREATE POLICY "Admins and Owners view all profiles" ON public.profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('owner', 'admin')
    )
  );

-- Policy: Only Owners can update roles or manage users.
CREATE POLICY "Owners can update profiles" ON public.profiles
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'owner'
    )
  );


-- 2. CRM (LEADS PIPELINE)
CREATE TYPE lead_status AS ENUM ('novo', 'em_negociacao', 'aguardando_vistoria', 'fechado', 'perdido');

CREATE TABLE public.leads_pipeline (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Customer Data
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  customer_city TEXT,

  -- Vehicle Data
  vehicle_type TEXT, -- 'car', 'motorcycle', 'truck'
  vehicle_model TEXT,
  vehicle_year INTEGER,
  usage_type TEXT, -- 'particular', 'app'
  fipe_value NUMERIC,

  -- CRM Fields
  status lead_status DEFAULT 'novo',
  assigned_to UUID REFERENCES public.profiles(id), -- Nullable initially (unassigned)
  notes TEXT
);

-- RLS for Leads
ALTER TABLE public.leads_pipeline ENABLE ROW LEVEL SECURITY;

-- Policy: Sales Agents see only their assigned leads OR unassigned leads (optional, usually admins assign).
-- Let's stick to strict: Agents see assigned. Admins/Owners see all.
-- Special case: Creating a lead (public form) -> usage of Service Role usually or "Insert allowed for anon" if we want direct insert.
-- However, typically public forms hit an Edge Function or we allow INSERT for anon but SELECT only for auth.

-- Allow Anon Insert (for the Public Smart Quoter)
CREATE POLICY "Public can insert leads" ON public.leads_pipeline
  FOR INSERT WITH CHECK (true);

-- Policy: Sales Agents view assigned leads
CREATE POLICY "Agents view assigned leads" ON public.leads_pipeline
  FOR SELECT USING (
    auth.uid() = assigned_to
  );

-- Policy: Admins and Owners view all leads
CREATE POLICY "Admins and Owners view all leads" ON public.leads_pipeline
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('owner', 'admin')
    )
  );

-- Policy: Agents can update their assigned leads
CREATE POLICY "Agents update assigned leads" ON public.leads_pipeline
  FOR UPDATE USING (
    auth.uid() = assigned_to
  );

-- Policy: Admins/Owners update all leads
CREATE POLICY "Admins update all leads" ON public.leads_pipeline
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('owner', 'admin')
    )
  );


-- 3. CMS (SITE SECTIONS)
CREATE TABLE public.site_sections (
  id TEXT PRIMARY KEY, -- e.g. 'hero', 'about', 'testimonials'
  content JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES public.profiles(id)
);

ALTER TABLE public.site_sections ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read site sections" ON public.site_sections
  FOR SELECT USING (true);

-- Admin/Owner write access
CREATE POLICY "Admins update site sections" ON public.site_sections
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('owner', 'admin')
    )
  );

-- Storage Buckets (Logical setup - actual bucket creation is done in Supabase UI usually, but policies can be SQL)
-- Bucket: 'site-images'
-- INSERT INTO storage.buckets (id, name, public) VALUES ('site-images', 'site-images', true);
-- CREATE POLICY "Public Access Images" ON storage.objects FOR SELECT USING ( bucket_id = 'site-images' );
-- CREATE POLICY "Admin Upload Images" ON storage.objects FOR INSERT WITH CHECK ( bucket_id = 'site-images' AND ... check admin role ... );

-- TRIGGER: Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, role)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', 'sales_agent');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
