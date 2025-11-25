
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const getEnv = (key: string) => {
  // Check import.meta.env (Vite)
  if (typeof import.meta !== 'undefined' && (import.meta as any).env?.[key]) {
    return (import.meta as any).env[key];
  }
  // Check process.env (Node/other)
  try {
    if (typeof process !== 'undefined' && process.env?.[key]) {
      return process.env[key];
    }
  } catch (e) {
    // Ignore errors accessing process
  }
  return '';
};

export const supabaseUrl = getEnv('VITE_SUPABASE_URL') || 'https://nvdlhrodvevgwdsneplk.supabase.co';
export const supabaseAnonKey = getEnv('VITE_SUPABASE_ANON_KEY');

if (!supabaseUrl) {
  console.error('Supabase URL is missing. Please set VITE_SUPABASE_URL.');
}

// Initialize with a placeholder key if missing to prevent immediate crash.
// API calls will fail with 401 if the key is invalid, but the app will load.
export const supabase = createClient(supabaseUrl, supabaseAnonKey || 'placeholder-anon-key');
