import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-50 flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-blue-600 dark:text-blue-500">
            {/* Placeholder Logo */}
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              M
            </div>
            <span>Moove</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="/" className="transition-colors hover:text-blue-600">Home</a>
            <a href="/sobre" className="transition-colors hover:text-blue-600">Sobre</a>
            <a href="/unidades" className="transition-colors hover:text-blue-600">Unidades</a>
            <a href="/depoimentos" className="transition-colors hover:text-blue-600">Depoimentos</a>
          </nav>
          <div className="flex items-center gap-4">
            <a href="/admin" className="text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-slate-50">
              Area do Corretor
            </a>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors">
              Simular Agora
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800 py-12 bg-white dark:bg-slate-950">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-blue-600 dark:text-blue-500 mb-4">
                <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                  M
                </div>
                <span>Moove</span>
              </div>
              <p className="text-sm text-slate-500 max-w-xs">
                Proteção veicular completa e acessível para você rodar tranquilo.
              </p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500">
            © {new Date().getFullYear()} Moove Proteção Veicular. Todos os direitos reservados.
          </div>
        </div>
      </footer>
      <Toaster position="top-center" />
    </div>
  );
}
