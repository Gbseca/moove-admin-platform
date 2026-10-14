# Moove Platform | Site e gestão comercial

A presença pública e a rotina administrativa da Moove no mesmo projeto. O site apresenta a operação; o painel permite acompanhar leads e atualizar conteúdo. A aplicação também conta com um modo local de demonstração, útil para explorar a interface antes de configurar a integração com Supabase.

## O que você encontra

- Separação entre páginas públicas e ambiente administrativo.
- Gestão de leads e conteúdo com integração de dados.
- Modo de demonstração para apresentar o fluxo da aplicação.

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

Configure as variáveis seguindo `.env.example` quando for usar Supabase.

## Estrutura

```text
src/
  components/   Layouts e componentes reutilizaveis
  lib/          Supabase, storage e utilitarios
  pages/        Paginas publicas e administrativas
supabase/       Migracoes e configuracoes de banco
```
