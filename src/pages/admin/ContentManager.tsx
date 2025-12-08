import { useState } from 'react';
import { storage, SiteConfig, Service } from '../../lib/storage';
import { toast } from 'sonner';
import { Save } from 'lucide-react';

export default function ContentManager() {
  const [config, setConfig] = useState<SiteConfig>(storage.getConfig());

  const handleSave = () => {
    storage.saveConfig(config);
    toast.success('Alterações salvas com sucesso!');
    // Trigger storage event so other tabs/components update if listening
    window.dispatchEvent(new Event('storage'));
  };

  const handleServiceChange = (id: string, field: keyof Service, value: string) => {
    setConfig(prev => ({
      ...prev,
      services: prev.services.map(s => s.id === id ? { ...s, [field]: value } : s)
    }));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Gerenciar Conteúdo do Site</h1>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
        >
          <Save size={18} />
          Salvar Alterações
        </button>
      </div>

      <div className="space-y-8">
        {/* Hero Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold mb-4 border-b pb-2">Cabeçalho (Hero)</h2>
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Título Principal</label>
              <input
                type="text"
                value={config.heroTitle}
                onChange={e => setConfig({ ...config, heroTitle: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Subtítulo</label>
              <textarea
                value={config.heroSubtitle}
                onChange={e => setConfig({ ...config, heroSubtitle: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
                rows={2}
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold mb-4 border-b pb-2">Informações de Contato</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nome do Consultor</label>
              <input
                type="text"
                value={config.consultantName}
                onChange={e => setConfig({ ...config, consultantName: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Telefone (Exibição)</label>
              <input
                type="text"
                value={config.phoneNumber}
                onChange={e => setConfig({ ...config, phoneNumber: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Número WhatsApp (Link)</label>
              <input
                type="text"
                value={config.whatsappNumber}
                onChange={e => setConfig({ ...config, whatsappNumber: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="55219..."
              />
              <p className="text-xs text-slate-500 mt-1">Somente números, com código do país (55) e DDD.</p>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold mb-4 border-b pb-2">Serviços / Coberturas</h2>
          <div className="space-y-4">
            {config.services.map((service, index) => (
              <div key={service.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-sm text-slate-500">Serviço #{index + 1}</span>
                  <span className="text-xs text-slate-400">Ícone: {service.icon}</span>
                </div>
                <div className="grid gap-3">
                  <input
                    type="text"
                    value={service.title}
                    onChange={e => handleServiceChange(service.id, 'title', e.target.value)}
                    className="w-full px-3 py-2 border rounded-md font-medium"
                    placeholder="Título do Serviço"
                  />
                  <textarea
                    value={service.description}
                    onChange={e => handleServiceChange(service.id, 'description', e.target.value)}
                    className="w-full px-3 py-2 border rounded-md text-sm"
                    rows={2}
                    placeholder="Descrição"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
