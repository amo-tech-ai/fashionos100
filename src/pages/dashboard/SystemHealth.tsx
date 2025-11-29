
import React, { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, Loader2, Server, Database, HardDrive, Sparkles } from 'lucide-react';
import { supabase, supabaseUrl, supabaseAnonKey } from '../../lib/supabase';
import { FadeIn } from '../../components/FadeIn';
import { PageHeader } from '../../components/dashboard/Shared';
import { Button } from '../../components/Button';

interface CheckResult {
  name: string;
  status: 'ok' | 'error' | 'loading';
  latency?: number;
  message?: string;
}

export const SystemHealth: React.FC = () => {
  const [checks, setChecks] = useState<CheckResult[]>([
    { name: 'Core Tables (Profiles)', status: 'loading' },
    { name: 'Brand Schema (Companies)', status: 'loading' },
    { name: 'Sponsor Schema', status: 'loading' },
    { name: 'Chat Schema', status: 'loading' },
    { name: 'Storage Buckets', status: 'loading' },
    { name: 'Edge Functions', status: 'loading' },
    { name: 'AI Service', status: 'loading' }
  ]);

  const runChecks = async () => {
    setChecks(c => c.map(check => ({ ...check, status: 'loading', message: undefined, latency: undefined })));

    const checkTable = async (tableName: string, label: string) => {
        const start = performance.now();
        const { error } = await supabase.from(tableName).select('id').limit(1);
        updateCheck(label, !error, performance.now() - start, error ? `Missing table: ${tableName}` : 'Active');
    };

    // 1. Database Schema Checks
    await checkTable('profiles', 'Core Tables (Profiles)');
    await checkTable('companies', 'Brand Schema (Companies)');
    await checkTable('sponsor_profiles', 'Sponsor Schema');
    await checkTable('chat_rooms', 'Chat Schema');

    // 2. Storage Check
    const startStore = performance.now();
    const { data: buckets, error: storeError } = await supabase.storage.listBuckets();
    const requiredBuckets = ['event-media', 'avatars', 'documents'];
    const missingBuckets = requiredBuckets.filter(b => !buckets?.find(x => x.name === b));
    
    updateCheck(
        'Storage Access', 
        !storeError && missingBuckets.length === 0, 
        performance.now() - startStore, 
        storeError ? storeError.message : (missingBuckets.length > 0 ? `Missing: ${missingBuckets.join(', ')}` : `${buckets?.length} buckets verified`)
    );

    // 3. Edge Function Check (Ping)
    const startEdge = performance.now();
    try {
      const res = await fetch(`${supabaseUrl}/functions/v1/send-transactional-email`, {
        method: 'OPTIONS', 
        headers: { 'Authorization': `Bearer ${supabaseAnonKey}` }
      });
      updateCheck('Edge Functions', res.ok, performance.now() - startEdge, res.statusText);
    } catch (e: any) {
      updateCheck('Edge Functions', false, 0, e.message);
    }

    // 4. AI Service Check
    const startAi = performance.now();
    try {
       const aiRes = await fetch(`${supabaseUrl}/functions/v1/ai-copilot`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${supabaseAnonKey}` },
          body: JSON.stringify({ prompt: "Hello", context: "health-check" })
       });
       updateCheck('AI Service', aiRes.ok, performance.now() - startAi, aiRes.ok ? "Ready" : "Unavailable");
    } catch (e: any) {
       updateCheck('AI Service', false, 0, e.message);
    }
  };

  const updateCheck = (name: string, success: boolean, latency: number, msg?: string) => {
    setChecks(prev => prev.map(c => c.name === name ? {
      ...c,
      status: success ? 'ok' : 'error',
      latency: Math.round(latency),
      message: msg
    } : c));
  };

  useEffect(() => {
    runChecks();
  }, []);

  return (
    <div className="animate-in fade-in pb-20">
      <PageHeader 
        title="System Health" 
        subtitle="Infrastructure verification and status."
        breadcrumbs={['Dashboard', 'System']}
        actionLabel="Run Checks"
        onAction={runChecks}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {checks.map((check, i) => (
          <FadeIn key={check.name} delay={i * 100}>
            <div className={`p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start justify-between ${check.status === 'error' ? 'bg-red-50/50' : 'bg-white'}`}>
              <div className="flex gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  check.status === 'ok' ? 'bg-green-100 text-green-600' : 
                  check.status === 'error' ? 'bg-red-100 text-red-600' : 
                  'bg-gray-100 text-gray-500'
                }`}>
                  {check.name.includes('Schema') || check.name.includes('Table') ? <Database size={24} /> : 
                   check.name.includes('Storage') ? <HardDrive size={24} /> :
                   check.name.includes('AI') ? <Sparkles size={24} /> : <Server size={24} />}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{check.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {check.status === 'loading' ? 'Checking...' : check.message || 'Operational'}
                  </p>
                </div>
              </div>
              <div className="text-right">
                 {check.status === 'loading' ? (
                   <Loader2 className="animate-spin text-purple-600" />
                 ) : check.status === 'ok' ? (
                   <div className="flex flex-col items-end">
                     <CheckCircle2 className="text-green-500 mb-1" />
                     {check.latency && <span className="text-xs font-mono text-gray-400">{check.latency}ms</span>}
                   </div>
                 ) : (
                   <XCircle className="text-red-500" />
                 )}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      <div className="mt-12 bg-gray-900 text-white p-8 rounded-3xl">
         <h3 className="text-xl font-serif font-bold mb-4">Deployment Instructions</h3>
         <div className="space-y-4 text-sm text-gray-400">
            <p>1. Run the SQL Migration found in <code className="text-white">supabase/migrations/20250309_complete_schema.sql</code>.</p>
            <p>2. Set your secrets: <code className="text-white">supabase secrets set GEMINI_API_KEY=...</code>.</p>
            <p>3. Deploy Edge Functions: <code className="text-white">supabase functions deploy</code>.</p>
            <p>4. Verify all checks above are green.</p>
         </div>
      </div>
    </div>
  );
};
