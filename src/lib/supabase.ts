import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// If environment variables are missing, we create a client with dummy values to prevent crash
// The app will check for session/connection and handle errors gracefully in the UI
// instead of crashing on module load.
const isConfigured = supabaseUrl && supabaseAnonKey;

if (!isConfigured) {
  console.warn('Missing Supabase environment variables. App will run in limited mode.')
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder'
)

export const isSupabaseConfigured = () => isConfigured;
