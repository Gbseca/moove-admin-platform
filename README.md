# Moove Platform

Aplicacao web para gestao comercial da Moove, com area publica, painel administrativo, gestao de leads e conteudo. O projeto combina React, Supabase e um modo de demonstracao local para facilitar apresentacoes sem depender sempre de backend configurado.

## Funcionalidades

- Site publico com paginas de apresentacao e contato.
- Area administrativa protegida por sessao do Supabase.
- Dashboard para acompanhamento comercial.
- Gestao de leads em formato operacional.
- Gerenciamento de conteudo para alterar informacoes do site.
- Modo local de demonstracao com armazenamento alternativo.

## Stack

- React
- TypeScript
- Vite
- Supabase
- TanStack Query
- Tailwind CSS
- Radix UI

## Como Rodar

```bash
npm install
npm run dev
```

Configure as variaveis seguindo `.env.example` quando for usar Supabase.

## Estrutura

```text
src/
  components/   Layouts e componentes reutilizaveis
  lib/          Supabase, storage e utilitarios
  pages/        Paginas publicas e administrativas
supabase/       Migracoes e configuracoes de banco
```

## Pontos De Engenharia

- Separacao entre layout publico e administrativo.
- Autenticacao integrada ao Supabase.
- Estrutura preparada para evoluir como painel interno ou MVP de CRM.

