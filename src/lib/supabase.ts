// Mock Supabase Client for Demo Mode
// This allows the app to run without a real backend connection

// Define basic types to satisfy usage
type AuthStateChangeCallback = (event: string, session: any) => void;

const listeners = new Set<AuthStateChangeCallback>();

export const supabase = {
  auth: {
    getSession: async () => {
      const storedSession = localStorage.getItem('moove_demo_session');
      return { data: { session: storedSession ? JSON.parse(storedSession) : null } };
    },
    onAuthStateChange: (callback: AuthStateChangeCallback) => {
      listeners.add(callback);
      // The real Supabase client returns { data: { subscription: { unsubscribe: () => void } } }
      // But in React useEffect, we often use the returned unsubscribe function directly if the library supported it differently.
      // However, AdminLayout expects: const { data: { subscription } } = ...; return () => subscription.unsubscribe();
      // So our structure below is correct for usage.
      return {
        data: {
          subscription: {
            unsubscribe: () => {
                listeners.delete(callback);
            }
          }
        }
      };
    },
    signInWithPassword: async ({ email, password }: {email: string, password: string}) => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));

      if (email === 'admin@moove.com' && password === 'admin') {
        const session = {
          user: { email, id: 'demo-user-id', user_metadata: { full_name: 'Admin Demo' } },
          access_token: 'demo-token-123'
        };
        localStorage.setItem('moove_demo_session', JSON.stringify(session));
        listeners.forEach(cb => cb('SIGNED_IN', session));
        return { data: { session }, error: null };
      }
      return { data: null, error: { message: 'Credenciais inválidas. Tente admin@moove.com / admin' } };
    },
    signOut: async () => {
      localStorage.removeItem('moove_demo_session');
      listeners.forEach(cb => cb('SIGNED_OUT', null));
      return { error: null };
    }
  },
  from: (_table: string) => {
    return {
      select: () => Promise.resolve({ data: [], error: null }),
      insert: () => Promise.resolve({ data: [], error: null }),
      update: () => Promise.resolve({ data: [], error: null }),
      delete: () => Promise.resolve({ data: [], error: null }),
      upload: () => Promise.resolve({ data: null, error: null }),
      getPublicUrl: () => ({ data: { publicUrl: '' } })
    };
  }
};

export const isSupabaseConfigured = () => false;
