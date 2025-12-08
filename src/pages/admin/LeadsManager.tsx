import { useState, useEffect } from 'react';
import { storage, Lead } from '../../lib/storage';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Phone, MessageCircle, Car, Search } from 'lucide-react';

export default function LeadsManager() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Load initial leads
    storage.getLeads().then(setLeads);
  }, []);

  const handleStatusChange = async (id: string, newStatus: Lead['status']) => {
    await storage.updateLeadStatus(id, newStatus);
    const updatedLeads = await storage.getLeads();
    setLeads(updatedLeads);
  };

  const filteredLeads = leads.filter(lead =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.phone.includes(searchTerm)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'new': return 'Novo';
      case 'contacted': return 'Em Atendimento';
      case 'closed': return 'Fechado';
      default: return status;
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
            <h1 className="text-2xl font-bold text-slate-900">Gerenciar Leads</h1>
            <p className="text-slate-500">Acompanhe os contatos recebidos pelo site.</p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Buscar por nome ou telefone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {filteredLeads.length === 0 ? (
          <div className="p-10 text-center text-slate-500">
            Nenhum lead encontrado.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold">
                  <th className="p-4">Data</th>
                  <th className="p-4">Nome</th>
                  <th className="p-4">Contato</th>
                  <th className="p-4">Veículo</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50 transition">
                    <td className="p-4 text-sm text-slate-600">
                      {format(new Date(lead.createdAt), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                    </td>
                    <td className="p-4 font-medium text-slate-900">
                      {lead.name}
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col text-sm">
                        <span className="flex items-center gap-2 text-slate-700">
                           <Phone size={14} className="text-slate-400" /> {lead.phone}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                       {lead.vehicleModel ? (
                           <span className="flex items-center gap-2 text-slate-700 text-sm">
                               <Car size={14} className="text-slate-400" /> {lead.vehicleModel}
                           </span>
                       ) : (
                           <span className="text-slate-400 text-sm">-</span>
                       )}
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                        {getStatusLabel(lead.status)}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                             <a
                                href={`https://wa.me/55${lead.phone.replace(/\D/g, '')}`}
                                target="_blank"
                                rel="noreferrer"
                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                                title="Chamar no WhatsApp"
                             >
                                 <MessageCircle size={18} />
                             </a>
                             <select
                                value={lead.status}
                                onChange={(e) => handleStatusChange(lead.id, e.target.value as any)}
                                className="text-sm border-slate-200 rounded-md py-1 pl-2 pr-6 bg-white focus:ring-1 focus:ring-blue-500"
                             >
                                 <option value="new">Novo</option>
                                 <option value="contacted">Atendido</option>
                                 <option value="closed">Fechado</option>
                             </select>
                        </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
