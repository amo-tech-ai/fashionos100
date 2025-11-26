
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

export const supabaseUrl = getEnv('VITE_SUPABASE_URL');
export const supabaseAnonKey = getEnv('VITE_SUPABASE_ANON_KEY');

// Check if keys are real and not placeholders
export const isConfigured = 
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('placeholder') && 
  !supabaseAnonKey.includes('placeholder');

if (!isConfigured) {
  console.warn('⚠️ Supabase credentials missing or invalid. Check your .env file. Features requiring DB/Auth will fail gracefully.');
}

// Initialize client with options to avoid console spam if keys are missing
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
    // Disable realtime if not configured to prevent WebSocket error loops
    realtime: isConfigured ? {
      params: {
        eventsPerSecond: 10,
      },
    } : undefined,
  }
);
