# sujit.db

Portfolio built with Astro. Every page is also a table in an in-browser SQLite playground.

## Run it

```sh
npm install
npm run dev        # http://localhost:4321
```

Needs Node 22.23.4+ (Node 24 LTS recommended). Netlify uses Node 24 via `netlify.toml`.

## Visitor modes

The landing page asks "Are you a techie?"

- **Yes**: the nav shows only `playground`. Other pages are reached by querying them there.
- **No**: normal nav, playground included.
- **Owner (you)**: everything, plus an `/admin` link. Turn it on by visiting `/?owner=1`, or run
  `localStorage.setItem('owner', 'true')` in the console. `/?owner=0` turns it off.
- `change mode` in the footer resets the choice.

## Editing content (no code)

Open `/admin`. Blog posts, projects, experience, education and the profile (skills, certs,
hobbies, quiz, resume PDF) are all forms there. Publishing commits to GitHub, and Netlify rebuilds.

**Locally:** run `npm run cms` in a second terminal next to `npm run dev`, then open
http://localhost:4321/admin/. No login; it writes straight to the files.

**On Netlify (one-time setup):**
1. Push this folder to a GitHub repo. Set `repo:` in `public/admin/config.yml` to `<user>/<repo>`.
2. Import the repo in Netlify (build settings come from `netlify.toml`).
3. GitHub → Settings → Developer settings → OAuth Apps → New.
   Homepage: your Netlify URL. Callback: `https://api.netlify.com/auth/done`.
4. Netlify → Site configuration → Access & security → OAuth → Install provider → GitHub,
   paste the client ID and secret.

Files live in `src/content/*` (one Markdown file per item) and `src/data/profile.json`.
Uploaded images and the resume go in `public/uploads/`.

## Contact form and quiz results

The `INSERT INTO messages` form on /about (and the quiz's "Send to Sujit" button) use Netlify Forms.
They only send on the deployed site; locally they show an error and point to the email button.
After the first deploy: Netlify → Forms → enable form detection, then Forms → Notifications →
add an email notification so each message lands in your inbox.

## GitHub table

The playground's `github_repos` table is fetched from the GitHub API at build time. Netlify build
machines share IPs, so add a `GITHUB_TOKEN` environment variable (a fine-grained token with no
extra permissions is enough) to avoid the anonymous rate limit. If the fetch fails, the table is
just empty and the build still succeeds.
