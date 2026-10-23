import { getCollection } from 'astro:content';

export const fmtMonth = (d?: Date) =>
  d ? d.toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' }) : 'Present';

export const fmtDay = (d: Date) =>
  d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

const newestFirst = <T extends { data: { start: Date; end?: Date } }>(a: T, b: T) =>
  (b.data.end ? +b.data.end : Infinity) - (a.data.end ? +a.data.end : Infinity) || +b.data.start - +a.data.start;

export const getExperience = async () => (await getCollection('experience')).sort(newestFirst);
export const getEducation = async () => (await getCollection('education')).sort(newestFirst);
export const getProjects = async () => (await getCollection('projects')).sort((a, b) => a.data.order - b.data.order);
export const getPosts = async () =>
  (await getCollection('blog', (p) => import.meta.env.DEV || !p.data.draft)).sort((a, b) => +b.data.date - +a.data.date);
