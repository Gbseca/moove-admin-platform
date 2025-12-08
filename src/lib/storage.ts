import { supabase } from './supabase';

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
  phoneNumber: string;
  whatsappNumber: string;
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
  getConfig: async (): Promise<SiteConfig> => {
    try {
      const { data, error } = await supabase
        .from('site_sections')
        .select('content')
        .eq('id', 'main_config')
        .single();

      if (error || !data) {
        // Return default if not found or error (e.g. table not created yet)
        console.log('Config not found or error, using default:', error);
        return DEFAULT_CONFIG;
      }

      return data.content as SiteConfig;
    } catch (e) {
      console.error('Exception fetching config:', e);
      return DEFAULT_CONFIG;
    }
  },

  saveConfig: async (config: SiteConfig): Promise<void> => {
    const { error } = await supabase
      .from('site_sections')
      .upsert({
        id: 'main_config',
        content: config,
        updated_at: new Date().toISOString()
      });

    if (error) {
      console.error('Error saving config:', error);
      throw error;
    }
  },

  // Leads
  getLeads: async (): Promise<Lead[]> => {
    const { data, error } = await supabase
      .from('leads_pipeline')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching leads:', error);
      return [];
    }

    return data.map((item: any) => ({
      id: item.id,
      name: item.customer_name,
      phone: item.customer_phone,
      vehicleModel: item.vehicle_model || '',
      createdAt: item.created_at,
      status: item.status as Lead['status'],
    }));
  },

  addLead: async (lead: Omit<Lead, 'id' | 'createdAt' | 'status'>): Promise<void> => {
    const { error } = await supabase
      .from('leads_pipeline')
      .insert({
        customer_name: lead.name,
        customer_phone: lead.phone,
        vehicle_model: lead.vehicleModel,
        status: 'new'
      });

    if (error) {
      console.error('Error adding lead:', error);
      throw error;
    }
  },

  updateLeadStatus: async (id: string, status: Lead['status']): Promise<void> => {
    const { error } = await supabase
      .from('leads_pipeline')
      .update({ status })
      .eq('id', id);

    if (error) {
      console.error('Error updating lead status:', error);
      throw error;
    }
  }
};
