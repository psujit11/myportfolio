---
title: Why my portfolio is a database
description: The thinking behind the SQL playground, and how sql.js runs SQLite right in your browser.
date: 2026-10-23
tags: ["sql", "astro", "webassembly"]
---

Most portfolios are a menu. Mine is a schema.

If you told the landing page you're a techie, the only way around this site is the **playground**: every page is a table, and you get to it by querying it. Drag `projects` into the `FROM` slot and you land on my projects.

## SQLite, in your tab

The playground runs real SQLite, compiled to WebAssembly by [sql.js](https://github.com/sql-js/sql.js). At build time, Astro collects my content (experience, projects, posts) and the page loads it into an in-memory database:

```js
const SQL = await initSqlJs({ locateFile: () => wasmUrl });
const db = new SQL.Database();
db.run('CREATE TABLE projects (title TEXT, tags TEXT, repo TEXT)');
```

No server, no API. Try a join. Try `SELECT company FROM experience ORDER BY start_date`. Nothing you run can break anything: refresh and the database is fresh again.

## Why bother?

Because I spend my days in C#, EF Core and SQL Server, and I'd rather show that than list it.
