
import { createClient } from '@supabase/supabase-js';

const getEnv = (key: string) => {
  // Cast to any to avoid TypeScript errors if types aren't perfectly set up
  const meta = import.meta as any;
  if (typeof meta !== 'undefined' && meta.env && meta.env[key]) {
    return meta.env[key];
  }
  return '';
};

export const supabaseUrl = getEnv('VITE_SUPABASE_URL');
export const supabaseAnonKey = getEnv('VITE_SUPABASE_ANON_KEY');

// Strict check: Must exist and not be a placeholder
export const isConfigured = 
  !!supabaseUrl && 
  !!supabaseAnonKey && 
  !supabaseUrl.includes('placeholder') && 
  !supabaseAnonKey.includes('placeholder');

if (!isConfigured) {
  console.warn(
    '⚠️ Supabase credentials missing or invalid. Features requiring DB/Auth will fail gracefully. Check your .env file.'
  );
}

// Create client. If not configured, we use a dummy URL to prevent "URL required" errors,
// but disable all network-dependent features (Auth persistence, Realtime) to prevent connection spam.
const clientUrl = isConfigured ? supabaseUrl : 'https://placeholder.supabase.co';
const clientKey = isConfigured ? supabaseAnonKey : 'placeholder-key';

export const supabase = createClient(clientUrl, clientKey, {
  auth: {
    // Only persist session if we actually have a valid backend
    persistSession: isConfigured,
    autoRefreshToken: isConfigured,
    detectSessionInUrl: isConfigured,
  },
  realtime: {
    // Completely disable realtime if not configured to prevent WebSocket connection errors
    enabled: isConfigured,
    params: {
      eventsPerSecond: 10,
    },
  },
});
