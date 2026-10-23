import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Decap writes "" for empty optional dates.
const optionalDate = z.preprocess((v) => v || undefined, z.coerce.date().optional());
const list = z.array(z.string()).default([]);

export const collections = {
  blog: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
    schema: z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      tags: list,
      draft: z.boolean().default(false),
    }),
  }),
  projects: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
    schema: z.object({
      title: z.string(),
      summary: z.string(),
      tags: list,
      repo: z.string().optional(),
      live: z.string().optional(),
      private: z.boolean().default(false),
      featured: z.boolean().default(false),
      snippet: z.string().optional(),
      snippet_lang: z.string().default('csharp'),
      order: z.number().default(99),
    }),
  }),
  sidequests: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/sidequests' }),
    schema: z.object({
      title: z.string(),
      language: z.string(),
      status: z.string(),
      summary: z.string(),
      repo: z.string().optional(),
      order: z.number().default(99),
    }),
  }),
  experience: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
    schema: z.object({
      role: z.string(),
      company: z.string(),
      location: z.string(),
      start: z.coerce.date(),
      end: optionalDate,
      stack: list,
      highlights: z.array(z.object({ title: z.string(), text: z.string() })).default([]),
    }),
  }),
  education: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/education' }),
    schema: z.object({
      degree: z.string(),
      school: z.string(),
      location: z.string(),
      start: z.coerce.date(),
      end: optionalDate,
      score: z.string().optional(),
      modules: list,
      summary: z.string(),
    }),
  }),
};
