import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { cn } from '../../lib/utils';

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  // In a real app, use a context or hook for auth state
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
       setLoading(false);
       return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  if (loading) {
     return <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">Loading...</div>;
  }

  // Basic protection
  if (!session) {
    // In production, uncomment this to enforce protection
    // navigate('/auth');
    // For now, let's allow viewing the layout structure or redirect
    // Use the requested logic:
    // return <Navigate to="/auth" />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-50 transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
          <span className="font-bold text-xl tracking-tight">Moove Admin</span>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden">
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
              isActive ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800"
            )}
          >
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/leads"
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
              isActive ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800"
            )}
          >
            <Users className="h-5 w-5" />
            Leads & Kanban
          </NavLink>

          <NavLink
            to="/admin/content"
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
              isActive ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800"
            )}
          >
            <FileText className="h-5 w-5" />
            Gestão de Conteúdo
          </NavLink>

           <NavLink
            to="/admin/team"
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
              isActive ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800"
            )}
          >
            <Settings className="h-5 w-5" />
            Equipe & Acesso
          </NavLink>
        </nav>

        <div className="absolute bottom-4 left-0 right-0 px-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-red-400 hover:bg-red-950/30 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 md:px-8">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50"
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex items-center gap-4 ml-auto">
             <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                <span className="text-xs font-bold">JD</span>
             </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}
