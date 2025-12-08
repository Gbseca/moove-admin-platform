import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Shield } from 'lucide-react';

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="container mx-auto px-4 flex h-20 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-2xl tracking-tight text-blue-900">
            <Shield className="w-8 h-8 text-blue-600" />
            <span>Consultoria Seguros</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="/" className="transition-colors hover:text-blue-600">Início</a>
            <a href="#servicos" className="transition-colors hover:text-blue-600">Serviços</a>
            <a href="#contato" className="transition-colors hover:text-blue-600">Contato</a>
          </nav>
          <div className="flex items-center gap-4">
            <a href="/admin" className="text-sm font-medium text-slate-500 hover:text-slate-900">
              Área Administrativa
            </a>
            <a
              href="#contato"
              className="hidden sm:block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-bold text-sm transition shadow-md"
            >
              Fazer Cotação
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <Toaster position="top-right" />
    </div>
  );
}
