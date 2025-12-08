import { useEffect, useState } from 'react';
import { storage } from '../../lib/storage';
import { Users, CheckCircle, Clock } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    closed: 0
  });

  useEffect(() => {
    storage.getLeads().then(leads => {
      setStats({
        total: leads.length,
        new: leads.filter(l => l.status === 'new').length,
        contacted: leads.filter(l => l.status === 'contacted').length,
        closed: leads.filter(l => l.status === 'closed').length,
      });
    });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-slate-900">Visão Geral</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4 mb-2">
             <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <Users size={20} />
             </div>
             <h3 className="text-sm font-medium text-slate-500">Total de Leads</h3>
          </div>
          <p className="text-3xl font-bold text-slate-900">{stats.total}</p>
        </div>

        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4 mb-2">
             <div className="p-2 bg-blue-100 text-blue-800 rounded-lg">
                <Users size={20} />
             </div>
             <h3 className="text-sm font-medium text-slate-500">Novos</h3>
          </div>
          <p className="text-3xl font-bold text-slate-900">{stats.new}</p>
        </div>

        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
           <div className="flex items-center gap-4 mb-2">
             <div className="p-2 bg-yellow-100 text-yellow-800 rounded-lg">
                <Clock size={20} />
             </div>
             <h3 className="text-sm font-medium text-slate-500">Em Atendimento</h3>
          </div>
          <p className="text-3xl font-bold text-slate-900">{stats.contacted}</p>
        </div>

        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
           <div className="flex items-center gap-4 mb-2">
             <div className="p-2 bg-green-100 text-green-800 rounded-lg">
                <CheckCircle size={20} />
             </div>
             <h3 className="text-sm font-medium text-slate-500">Fechados</h3>
          </div>
          <p className="text-3xl font-bold text-slate-900">{stats.closed}</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm text-center">
        <h2 className="text-lg font-semibold mb-2">Bem-vindo ao Painel Administrativo</h2>
        <p className="text-slate-500">
           Utilize o menu lateral para gerenciar os leads recebidos ou alterar o conteúdo do site.
        </p>
      </div>
    </div>
  )
}
