// Quick check if env vars are loaded
const fs = require('fs');
const envContent = fs.readFileSync('.env.local', 'utf8');

const hasViteSupabaseUrl = envContent.includes('VITE_SUPABASE_URL=');
const hasViteSupabaseAnonKey = envContent.includes('VITE_SUPABASE_ANON_KEY=');

console.log('Environment Check:');
console.log('VITE_SUPABASE_URL:', hasViteSupabaseUrl ? '✅ Found' : '❌ Missing');
console.log('VITE_SUPABASE_ANON_KEY:', hasViteSupabaseAnonKey ? '✅ Found' : '❌ Missing');

if (hasViteSupabaseAnonKey) {
  const match = envContent.match(/VITE_SUPABASE_ANON_KEY=(.+)/);
  if (match) {
    const key = match[1].trim();
    const isJWT = key.startsWith('eyJ');
    const isPublishable = key.startsWith('sb_publishable_');
    console.log('Key format:', isJWT ? 'JWT (✅ Standard)' : isPublishable ? 'Publishable (⚠️ May not work)' : 'Unknown');
  }
}
