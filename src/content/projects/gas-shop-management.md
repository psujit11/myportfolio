---
title: Gas Shop Management
summary: Multi-tenant SaaS for LPG cylinder distributors in Nepal. Orders, partial deliveries, separate gas and delivery invoices, VAT, stock (full, empty, damaged), cylinder balances, commissions, receivables and reports. A frozen OpenAPI contract generates the typed web client, and Playwright tests cover full journeys and tenant isolation on desktop and phone.
tags: [".NET 10", "PostgreSQL", "React", "TanStack Query", "Playwright", "Docker"]
private: true
featured: true
order: 1
snippet_lang: text
snippet: |
  gasshop/
  ├─ src/backend      .NET 10 API · EF Core · PostgreSQL 17
  ├─ src/frontend     React · Vite · Mantine
  ├─ src/packages
  │   ├─ api-client   OpenAPI → orval → TanStack Query
  │   └─ shared       NPR formatting · BS↔AD dates · permissions
  ├─ src/mobile       companion app
  ├─ src/e2e          Playwright journeys, desktop + phone
  └─ infra            Docker Compose · backups · restore drills
---
