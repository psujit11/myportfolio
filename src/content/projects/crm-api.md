---
title: CRM API
summary: Lead and customer management API. Leads and customers can be assigned to sales staff, with Identity Server auth and role-based access control. Built on Clean Architecture with an interface-service pattern and a generic repository.
tags: ["ASP.NET Core", "Minimal API", "Identity Server", "Clean Architecture"]
repo: https://github.com/psujit11/CRMIRpattern
featured: false
order: 2
snippet_lang: csharp
snippet: |
  public interface IRepository<T> where T : BaseEntity
  {
      Task<T?> GetByIdAsync(Guid id);
      Task<IReadOnlyList<T>> ListAsync();
      Task AddAsync(T entity);
  }

  app.MapGet("/leads", [Authorize(Roles = "Sales")]
      (ILeadService leads) => leads.GetAllAsync());
---
