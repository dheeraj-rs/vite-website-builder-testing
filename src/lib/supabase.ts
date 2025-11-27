import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
  updated_at: string;
};

export type Template = {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnail_url: string;
  html_content: string;
  css_content: string;
  is_public: boolean;
  created_at: string;
};

export type Project = {
  id: string;
  user_id: string;
  name: string;
  description: string;
  template_id: string | null;
  html_content: string;
  css_content: string;
  js_content: string;
  created_at: string;
  updated_at: string;
};

export type Deployment = {
  id: string;
  project_id: string;
  vercel_deployment_id: string;
  vercel_url: string;
  status: string;
  deployed_at: string;
};
