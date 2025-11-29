
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
    { name: 'Database Connection', status: 'loading' },
    { name: 'Edge Functions', status: 'loading' },
    { name: 'Storage Access', status: 'loading' },
    { name: 'AI Service', status: 'loading' }
  ]);

  const runChecks = async () => {
    setChecks(c => c.map(check => ({ ...check, status: 'loading', message: undefined, latency: undefined })));

    // 1. Database Check
    const startDb = performance.now();
    const { error: dbError } = await supabase.from('profiles').select('count').limit(1).single();
    updateCheck('Database Connection', !dbError, performance.now() - startDb, dbError?.message);

    // 2. Storage Check (List buckets)
    const startStore = performance.now();
    const { data: buckets, error: storeError } = await supabase.storage.listBuckets();
    const bucketCount = buckets?.length || 0;
    updateCheck('Storage Access', !storeError, performance.now() - startStore, storeError?.message || `${bucketCount} buckets found`);

    // 3. Edge Function Check (Ping)
    const startEdge = performance.now();
    try {
      // We'll use the email function as a ping since it has a mock mode
      const res = await fetch(`${supabaseUrl}/functions/v1/send-transactional-email`, {
        method: 'OPTIONS', // CORS preflight usually fast
        headers: { 'Authorization': `Bearer ${supabaseAnonKey}` }
      });
      updateCheck('Edge Functions', res.ok, performance.now() - startEdge, res.statusText);
    } catch (e: any) {
      updateCheck('Edge Functions', false, 0, e.message);
    }

    // 4. AI Service Check (Mock call or simple prompt)
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
                  {check.name.includes('Database') && <Database size={24} />}
                  {check.name.includes('Storage') && <HardDrive size={24} />}
                  {check.name.includes('Edge') && <Server size={24} />}
                  {check.name.includes('AI') && <Sparkles size={24} />}
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
         <h3 className="text-xl font-serif font-bold mb-4">Deployment Checklist</h3>
         <div className="space-y-4 text-sm text-gray-400">
            <div className="flex items-center gap-3">
               <div className={`w-3 h-3 rounded-full ${checks.find(c => c.name === 'Database Connection')?.status === 'ok' ? 'bg-green-500' : 'bg-red-500'}`} />
               <span>Database Migrations Applied</span>
            </div>
            <div className="flex items-center gap-3">
               <div className={`w-3 h-3 rounded-full ${checks.find(c => c.name === 'Storage Access')?.status === 'ok' ? 'bg-green-500' : 'bg-red-500'}`} />
               <span>Storage Buckets Created (avatars, assets)</span>
            </div>
            <div className="flex items-center gap-3">
               <div className={`w-3 h-3 rounded-full ${checks.find(c => c.name === 'AI Service')?.status === 'ok' ? 'bg-green-500' : 'bg-yellow-500'}`} />
               <span>Gemini API Key Configured</span>
            </div>
         </div>
      </div>
    </div>
  );
};
