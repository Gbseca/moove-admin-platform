
// Mock Storage Service using LocalStorage
// This replaces Supabase for the "Demo Mode" requirement

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface SiteConfig {
  heroTitle: string;
  heroSubtitle: string;
  consultantName: string;
  phoneNumber: string; // Display format
  whatsappNumber: string; // Raw format for link (e.g., 5521971118142)
  services: Service[];
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  vehicleModel: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'closed';
}

const STORAGE_KEYS = {
  CONFIG: 'moove_site_config',
  LEADS: 'moove_leads',
};

const DEFAULT_CONFIG: SiteConfig = {
  heroTitle: 'Proteção Veicular Completa para Você',
  heroSubtitle: 'Tranquilidade e segurança para seu patrimônio com quem entende do assunto.',
  consultantName: 'Consultor de Seguros',
  phoneNumber: '(21) 97111-8142',
  whatsappNumber: '5521971118142',
  services: [
    { id: '1', title: 'Roubo e Furto', description: 'Cobertura completa contra roubo e furto qualificado.', icon: 'shield' },
    { id: '2', title: 'Colisão', description: 'Reparo garantido em caso de acidentes e colisões.', icon: 'car' },
    { id: '3', title: 'Assistência 24h', description: 'Guincho, chaveiro e auxílio mecânico a qualquer hora.', icon: 'clock' },
    { id: '4', title: 'Terceiros', description: 'Cobertura para danos materiais e corporais a terceiros.', icon: 'users' },
    { id: '5', title: 'Fenômenos da Natureza', description: 'Proteção contra enchentes, quedas de árvores e granizo.', icon: 'cloud' },
    { id: '6', title: 'Carro Reserva', description: 'Não fique a pé em caso de sinistro com seu veículo.', icon: 'calendar' },
  ],
};

export const storage = {
  // Config
  getConfig: (): SiteConfig => {
    const data = localStorage.getItem(STORAGE_KEYS.CONFIG);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(DEFAULT_CONFIG));
      return DEFAULT_CONFIG;
    }
    return JSON.parse(data);
  },

  saveConfig: (config: SiteConfig): void => {
    localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
  },

  // Leads
  getLeads: (): Lead[] => {
    const data = localStorage.getItem(STORAGE_KEYS.LEADS);
    return data ? JSON.parse(data) : [];
  },

  addLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'status'>): void => {
    const leads = storage.getLeads();
    const newLead: Lead = {
      ...lead,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      status: 'new',
    };
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify([newLead, ...leads]));
  },

  updateLeadStatus: (id: string, status: Lead['status']): void => {
      const leads = storage.getLeads();
      const updatedLeads = leads.map(l => l.id === id ? { ...l, status } : l);
      localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(updatedLeads));
  }
};
