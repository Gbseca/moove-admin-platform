
// Mock Supabase Client for Demo Mode
// We are replacing the real client with a dummy one that always returns success for auth
// so the Admin panel works without a real backend.

export const supabase = {
  auth: {
    getSession: async () => {
      return { data: { session: { user: { email: 'demo@example.com' } } } };
    },
    onAuthStateChange: (callback: any) => {
      // Immediately trigger logged in state
      callback('SIGNED_IN', { user: { email: 'demo@example.com' } });
      return { data: { subscription: { unsubscribe: () => {} } } };
    },
    signOut: async () => {
      window.location.href = '/auth';
    },
    signInWithPassword: async () => {
      return { data: { user: { email: 'demo@example.com' } }, error: null };
    }
  }
};

export const isSupabaseConfigured = () => true;
