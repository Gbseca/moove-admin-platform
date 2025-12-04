export type UserRole = 'owner' | 'admin' | 'sales_agent';
export type LeadStatus = 'novo' | 'em_negociacao' | 'aguardando_vistoria' | 'fechado' | 'perdido';

export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  created_at: string;
}

export interface Lead {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  customer_city?: string;
  vehicle_type?: string;
  vehicle_model?: string;
  vehicle_year?: number;
  usage_type?: string;
  fipe_value?: number;
  status: LeadStatus;
  assigned_to?: string;
  notes?: string;
  created_at: string;
}
