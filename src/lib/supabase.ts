// Mock Supabase Client for Demo Mode
// This allows the app to run without a real backend connection

// Define basic types to satisfy usage
type AuthStateChangeCallback = (event: string, session: any) => void;

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
