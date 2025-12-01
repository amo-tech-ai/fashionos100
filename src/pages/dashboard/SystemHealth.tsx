
import React, { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, Loader2, Server, Database, HardDrive, Sparkles, Activity, Wifi } from 'lucide-react';
import { supabase, supabaseUrl, supabaseAnonKey } from '../../lib/supabase';
import { FadeIn } from '../../components/FadeIn';
import { PageHeader } from '../../components/dashboard/Shared';
import { Button } from '../../components/Button';

interface CheckResult {
  name: string;
  status: 'ok' | 'error' | 'loading';
  latency?: number;
  message?: string;
  critical?: boolean;
}

export const SystemHealth: React.FC = () => {
  const [checks, setChecks] = useState<CheckResult[]>([
    { name: 'Core Auth (Profiles)', status: 'loading', critical: true },
    { name: 'Brand Schema', status: 'loading' },
    { name: 'Studio Schema', status: 'loading' },
    { name: 'Event Schema', status: 'loading' },
    { name: 'Realtime (Websockets)', status: 'loading', critical: true },
    { name: 'Storage Buckets', status: 'loading', critical: true },
    { name: 'Edge Functions (Ping)', status: 'loading', critical: true },
    { name: 'AI: Event Draft Gen', status: 'loading' },
    { name: 'AI: Sponsor Agents', status: 'loading' },
    { name: 'AI: Veo Media Gen', status: 'loading' }
  ]);

  const runChecks = async () => {
    setChecks(c => c.map(check => ({ ...check, status: 'loading', message: undefined, latency: undefined })));

    const checkTable = async (tableName: string, label: string) => {
        const start = performance.now();
        const { error } = await supabase.from(tableName).select('id').limit(1);
        updateCheck(label, !error, performance.now() - start, error ? `Missing table: ${tableName}` : 'Active');
    };

    // 1. Database Schema Checks
    await checkTable('profiles', 'Core Auth (Profiles)');
    await checkTable('companies', 'Brand Schema');
    await checkTable('shoots', 'Studio Schema');
    await checkTable('events', 'Event Schema');

    // 2. Realtime Check
    const checkRealtime = async () => {
        const start = performance.now();
        const channel = supabase.channel('health-check');
        channel.subscribe((status) => {
            if (status === 'SUBSCRIBED') {
                updateCheck('Realtime (Websockets)', true, performance.now() - start, 'Connected');
                supabase.removeChannel(channel);
            } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
                updateCheck('Realtime (Websockets)', false, performance.now() - start, 'Connection Failed');
            }
        });
    };
    checkRealtime();

    // 3. Storage Check
    const startStore = performance.now();
    const { data: buckets, error: storeError } = await supabase.storage.listBuckets();
    const requiredBuckets = ['event-media', 'avatars', 'documents', 'production-assets', 'brand-assets'];
    // Checking if buckets exist
    const missingBuckets = requiredBuckets.filter(b => !buckets?.find(x => x.name === b));
    
    updateCheck(
        'Storage Buckets', 
        !storeError && missingBuckets.length === 0, 
        performance.now() - startStore, 
        storeError ? storeError.message : (missingBuckets.length > 0 ? `Missing: ${missingBuckets.join(', ')}` : `${buckets?.length} buckets verified`)
    );

    // 4. Edge Function Check (Basic Ping)
    const startEdge = performance.now();
    try {
      const res = await fetch(`${supabaseUrl}/functions/v1/ai-copilot`, {
        method: 'OPTIONS', 
        headers: { 'Authorization': `Bearer ${supabaseAnonKey}` }
      });
      updateCheck('Edge Functions (Ping)', res.ok, performance.now() - startEdge, res.ok ? 'Ready' : `Status: ${res.status}`);
    } catch (e: any) {
      updateCheck('Edge Functions (Ping)', false, 0, e.message);
    }

    // 5. Deep AI Checks (OPTIONS requests to specific endpoints to verify deployment)
    const checkAIEndpoint = async (endpoint: string, label: string) => {
        const start = performance.now();
        try {
             const res = await fetch(`${supabaseUrl}/functions/v1/${endpoint}`, {
                method: 'OPTIONS',
                headers: { 'Authorization': `Bearer ${supabaseAnonKey}` }
             });
             updateCheck(label, res.ok, performance.now() - start, res.ok ? 'Deployed' : `HTTP ${res.status}`);
        } catch (e: any) {
             updateCheck(label, false, 0, e.message || 'Failed to connect');
        }
    };

    await checkAIEndpoint('generate-event-draft', 'AI: Event Draft Gen');
    await checkAIEndpoint('sponsor-ai', 'AI: Sponsor Agents');
    await checkAIEndpoint('generate-media', 'AI: Veo Media Gen');
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

  const overallStatus = checks.some(c => c.critical && c.status === 'error') ? 'Critical Failure' : 
                        checks.some(c => c.status === 'error') ? 'Degraded' : 'Operational';

  const statusColor = overallStatus === 'Operational' ? 'text-green-600 bg-green-50 border-green-200' :
                      overallStatus === 'Degraded' ? 'text-amber-600 bg-amber-50 border-amber-200' :
                      'text-red-600 bg-red-50 border-red-200';

  return (
    <div className="animate-in fade-in pb-20">
      <PageHeader 
        title="System Health" 
        subtitle="Infrastructure verification and status monitor."
        breadcrumbs={['Dashboard', 'System']}
      />
      
      <div className={`mb-8 p-4 rounded-xl border flex items-center gap-3 ${statusColor}`}>
         <Activity size={20} />
         <span className="font-bold">System Status: {overallStatus}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {checks.map((check, i) => (
          <FadeIn key={check.name} delay={i * 50}>
            <div className={`p-6 rounded-2xl border shadow-sm flex flex-col h-full ${check.status === 'error' ? 'bg-red-50/30 border-red-100' : 'bg-white border-gray-100'}`}>
              <div className="flex justify-between items-start mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  check.status === 'ok' ? 'bg-green-100 text-green-600' : 
                  check.status === 'error' ? 'bg-red-100 text-red-600' : 
                  'bg-gray-100 text-gray-500'
                }`}>
                  {check.name.includes('AI') ? <Sparkles size={18} /> : 
                   check.name.includes('Storage') ? <HardDrive size={18} /> :
                   check.name.includes('Realtime') ? <Wifi size={18} /> :
                   check.name.includes('Function') ? <Server size={18} /> : <Database size={18} />}
                </div>
                
                <div className="text-right">
                    {check.status === 'loading' ? (
                        <Loader2 className="animate-spin text-purple-600" size={18} />
                    ) : check.status === 'ok' ? (
                        <CheckCircle2 className="text-green-500" size={18} />
                    ) : (
                        <XCircle className="text-red-500" size={18} />
                    )}
                </div>
              </div>
              
              <div className="mt-auto">
                  <h3 className="font-bold text-gray-900 text-sm">{check.name}</h3>
                  <div className="flex justify-between items-center mt-2">
                      <p className={`text-xs ${check.status === 'error' ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                        {check.status === 'loading' ? 'Verifying...' : check.message || 'OK'}
                      </p>
                      {check.latency !== undefined && (
                          <span className="text-[10px] font-mono text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">
                              {check.latency}ms
                          </span>
                      )}
                  </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
         <Button variant="outline" onClick={runChecks} className="gap-2">
            <Activity size={16} /> Re-run All Diagnostics
         </Button>
      </div>

      <div className="mt-12 bg-gray-900 text-white p-8 rounded-3xl">
         <h3 className="text-xl font-serif font-bold mb-4">Troubleshooting Guide</h3>
         <div className="space-y-4 text-sm text-gray-400">
            <p>1. <strong className="text-white">Realtime Errors:</strong> Ensure "Broadcast" and "Presence" are enabled for all tables in Supabase Replication settings.</p>
            <p>2. <strong className="text-white">Storage Errors:</strong> Run the migration script again or manually create buckets in Supabase Dashboard ({`> Storage > New Bucket`}).</p>
            <p>3. <strong className="text-white">AI Function Errors:</strong> Verify <code>GEMINI_API_KEY</code> is set in Edge Function secrets via <code>supabase secrets set</code>.</p>
         </div>
      </div>
    </div>
  );
};
