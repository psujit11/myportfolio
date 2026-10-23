// Netlify Forms: post url-encoded fields with a form-name matching <form name="contact"> in the built HTML.
// Only works on the deployed Netlify site; locally the POST fails and callers show their fallback.
export async function sendMessage(fields: { name: string; email: string; subject: string; message: string }) {
  const res = await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ 'form-name': 'contact', ...fields }).toString(),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}
