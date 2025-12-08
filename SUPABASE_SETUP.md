# Configuração do Banco de Dados (Supabase)

Para que o site funcione corretamente com o armazenamento de dados real, você precisa criar as tabelas no seu projeto do Supabase.

1. Acesse o painel do seu projeto no Supabase: https://supabase.com/dashboard/project/klycqdbotwctfjigyhqi
2. No menu lateral esquerdo, clique em **SQL Editor** (ícone que parece um terminal `>_`).
3. Clique no botão **New Query** (ou "Nova Consulta").
4. Copie **todo o código abaixo** e cole na área de edição.
5. Clique no botão **Run** (ou "Executar") no canto inferior direito.

---

```sql
-- Habilita extensão para gerar IDs únicos
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. TABELA DE LEADS (Clientes que entraram em contato)
CREATE TABLE public.leads_pipeline (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Dados do Cliente
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  vehicle_model TEXT,

  -- Status do Lead
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed'))
);

-- Habilita segurança (RLS)
ALTER TABLE public.leads_pipeline ENABLE ROW LEVEL SECURITY;

-- Permite que qualquer pessoa (pública) insira um novo lead (Formulário do site)
CREATE POLICY "Public insert leads" ON public.leads_pipeline
  FOR INSERT WITH CHECK (true);

-- Permite que apenas usuários logados (Admin) vejam os leads
CREATE POLICY "Admins view leads" ON public.leads_pipeline
  FOR SELECT USING (auth.role() = 'authenticated');

-- Permite que apenas usuários logados (Admin) alterem o status
CREATE POLICY "Admins update leads" ON public.leads_pipeline
  FOR UPDATE USING (auth.role() = 'authenticated');


-- 2. TABELA DE CONFIGURAÇÕES DO SITE (Textos e Serviços)
CREATE TABLE public.site_sections (
  id TEXT PRIMARY KEY, -- ex: 'main_config'
  content JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilita segurança (RLS)
ALTER TABLE public.site_sections ENABLE ROW LEVEL SECURITY;

-- Permite leitura pública (para o site carregar os textos)
CREATE POLICY "Public read config" ON public.site_sections
  FOR SELECT USING (true);

-- Permite escrita apenas para Admins logados
CREATE POLICY "Admins update config" ON public.site_sections
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admins update config update" ON public.site_sections
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Inserir configuração padrão inicial (para o site não ficar vazio)
INSERT INTO public.site_sections (id, content)
VALUES (
  'main_config',
  '{
    "heroTitle": "Proteção Veicular Completa para Você",
    "heroSubtitle": "Tranquilidade e segurança para seu patrimônio com quem entende do assunto.",
    "consultantName": "Consultor de Seguros",
    "phoneNumber": "(21) 97111-8142",
    "whatsappNumber": "5521971118142",
    "services": [
      { "id": "1", "title": "Roubo e Furto", "description": "Cobertura completa contra roubo e furto qualificado.", "icon": "shield" },
      { "id": "2", "title": "Colisão", "description": "Reparo garantido em caso de acidentes e colisões.", "icon": "car" },
      { "id": "3", "title": "Assistência 24h", "description": "Guincho, chaveiro e auxílio mecânico a qualquer hora.", "icon": "clock" },
      { "id": "4", "title": "Terceiros", "description": "Cobertura para danos materiais e corporais a terceiros.", "icon": "users" },
      { "id": "5", "title": "Fenômenos da Natureza", "description": "Proteção contra enchentes, quedas de árvores e granizo.", "icon": "cloud" },
      { "id": "6", "title": "Carro Reserva", "description": "Não fique a pé em caso de sinistro com seu veículo.", "icon": "calendar" }
    ]
  }'::jsonb
) ON CONFLICT (id) DO NOTHING;
```
