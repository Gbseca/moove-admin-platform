import React, { useState, useEffect } from 'react';
import { Shield, CheckCircle, Car, Clock, Users, Cloud, Calendar, MessageCircle } from 'lucide-react';
import { storage, SiteConfig } from '../lib/storage';
import { toast } from 'sonner';

export default function HomePage() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    vehicleModel: '',
  });

  useEffect(() => {
    const loadConfig = async () => {
      const data = await storage.getConfig();
      setConfig(data);
    };
    loadConfig();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast.error('Por favor, preencha nome e telefone.');
      return;
    }

    try {
      await storage.addLead(formData);
      toast.success('Solicitação enviada com sucesso! Entraremos em contato em breve.');
      setFormData({ name: '', phone: '', vehicleModel: '' });
    } catch (error) {
      toast.error('Erro ao enviar solicitação. Tente novamente.');
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'shield': return <Shield className="w-10 h-10 text-blue-600" />;
      case 'car': return <Car className="w-10 h-10 text-blue-600" />;
      case 'clock': return <Clock className="w-10 h-10 text-blue-600" />;
      case 'users': return <Users className="w-10 h-10 text-blue-600" />;
      case 'cloud': return <Cloud className="w-10 h-10 text-blue-600" />;
      case 'calendar': return <Calendar className="w-10 h-10 text-blue-600" />;
      default: return <Shield className="w-10 h-10 text-blue-600" />;
    }
  };

  if (!config) return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;

  return (
    <div className="font-sans text-slate-900 bg-white">
      {/* Hero Section */}
      <header className="relative bg-slate-900 text-white pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80')] bg-cover bg-center" />
        <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {config.heroTitle}
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-lg">
              {config.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contato"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition shadow-lg text-center"
              >
                Solicitar Cotação
              </a>
              <a
                href={`https://wa.me/${config.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition shadow-lg flex items-center justify-center gap-2"
              >
                <MessageCircle size={20} />
                Falar no WhatsApp
              </a>
            </div>
          </div>

          {/* Simple Form in Hero */}
          <div className="md:w-1/2 w-full max-w-md bg-white text-slate-900 p-8 rounded-2xl shadow-2xl">
            <h3 className="text-2xl font-bold mb-4 text-center">Proteja seu veículo hoje</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nome Completo</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Seu nome"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">WhatsApp / Telefone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="(00) 00000-0000"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Modelo do Veículo</label>
                <input
                  type="text"
                  name="vehicleModel"
                  value={formData.vehicleModel}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Ex: Honda Civic 2020"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
              >
                Receber Contato
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section id="servicos" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-slate-900">Nossas Coberturas</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Oferecemos proteção completa para que você dirija com tranquilidade. Confira nossos principais serviços.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {config.services.map((service) => (
              <div key={service.id} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition border border-slate-100">
                <div className="mb-4 bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center">
                  {getIcon(service.icon)}
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1605218427368-ade63dd814bd?auto=format&fit=crop&q=80"
              alt="Consultor de seguros"
              className="rounded-2xl shadow-2xl w-full object-cover h-[400px]"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6 text-slate-900">Por que escolher nossa consultoria?</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg mb-1">Atendimento Personalizado</h4>
                  <p className="text-slate-600">Entendemos sua necessidade para oferecer o melhor plano.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg mb-1">Sem Burocracia</h4>
                  <p className="text-slate-600">Processo rápido e ágil para você não perder tempo.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg mb-1">Melhor Custo-Benefício</h4>
                  <p className="text-slate-600">Proteção de qualidade com preços que cabem no seu bolso.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA / Contact Section */}
      <section id="contato" className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Pronto para proteger seu veículo?</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Fale agora mesmo com nosso consultor e tire todas as suas dúvidas pelo WhatsApp.
          </p>
          <a
            href={`https://wa.me/${config.whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-10 rounded-full transition text-lg shadow-lg"
          >
            <MessageCircle size={24} />
            Conversar no WhatsApp
          </a>
          <p className="mt-6 text-slate-400">
            Ou ligue para: <span className="text-white font-bold">{config.phoneNumber}</span>
          </p>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${config.whatsappNumber}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition hover:scale-110 flex items-center justify-center"
        aria-label="Falar no WhatsApp"
      >
        <MessageCircle size={32} />
      </a>

      {/* Footer */}
      <footer className="py-8 bg-slate-950 text-slate-400 text-center">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} {config.consultantName}. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
