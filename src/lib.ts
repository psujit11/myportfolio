import { getCollection } from 'astro:content';

export const fmtMonth = (d?: Date) =>
  d ? d.toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' }) : 'Present';

export const fmtDay = (d: Date) =>
  d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

const newestFirst = <T extends { data: { start: Date; end?: Date } }>(a: T, b: T) =>
  (b.data.end ? +b.data.end : Infinity) - (a.data.end ? +a.data.end : Infinity) || +b.data.start - +a.data.start;

export const getExperience = async () => (await getCollection('experience')).sort(newestFirst);
export const getEducation = async () => (await getCollection('education')).sort(newestFirst);
export const getSideQuests = async () => (await getCollection('sidequests')).sort((a, b) => a.data.order - b.data.order);
export const getProjects = async () => (await getCollection('projects')).sort((a, b) => a.data.order - b.data.order);
// Public repos, fetched once per build. A failed fetch (rate limit, offline) gives an empty table, not a broken build.
// Set GITHUB_TOKEN on Netlify to avoid the 60 requests/hour anonymous limit on shared build machines.
type Repo = { name: string; language: string | null; stargazers_count: number; forks_count: number; description: string | null; pushed_at: string; html_url: string; fork: boolean };
let repos: Promise<Repo[]> | undefined;
export const getRepos = (user: string) =>
  (repos ??= fetch(`https://api.github.com/users/${user}/repos?per_page=100&sort=pushed`, {
    headers: { Accept: 'application/vnd.github+json', ...(process.env.GITHUB_TOKEN && { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }) },
  })
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`GitHub ${r.status}`))))
    .then((all: Repo[]) => all.filter((r) => !r.fork))
    .catch((e) => {
      console.warn(`[github_repos] skipped: ${e.message}`);
      return [];
    }));

export const getPosts = async () =>
  (await getCollection('blog', (p) => import.meta.env.DEV || !p.data.draft)).sort((a, b) => +b.data.date - +a.data.date);
