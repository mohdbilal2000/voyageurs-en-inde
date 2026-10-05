// ---------------------------------------------------------------------------
// Admin panel configuration
//
// The admin panel is a client-side tool, so this password only keeps casual
// visitors out — it is not strong security. Change it to your own value before
// going live. To override without editing code, set VITE_ADMIN_PASSWORD in your
// Vercel environment variables (it is injected at build time).
// ---------------------------------------------------------------------------

const ENV_PASSWORD =
  (typeof import.meta !== 'undefined' &&
    (import.meta as any).env &&
    (import.meta as any).env.VITE_ADMIN_PASSWORD) ||
  '';

export const ADMIN_PASSWORD: string = ENV_PASSWORD || 'voyageurs2024';

// Path that activates the admin panel (e.g. https://www.voyageurseninde.fr/admin)
export const ADMIN_PATH = '/admin';

// sessionStorage key that remembers a successful login for the browser session.
export const ADMIN_SESSION_KEY = 'vei_admin_authed';
