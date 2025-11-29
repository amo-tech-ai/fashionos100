
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, CheckCircle2, Clock, CreditCard, Loader2, Share2, MessageSquare } from 'lucide-react';
import { useShootDetail } from '../../hooks/useShootDetail';
import { PageHeader, StatCard } from '../../components/dashboard/Shared';
import { Button } from '../../components/Button';
import { FadeIn } from '../../components/FadeIn';
import { ShootBriefModule } from '../../components/shoot/ShootBriefModule';
import { ShootShotListModule } from '../../components/shoot/ShootShotListModule';
import { ShootCopilot } from '../../components/shoot/ShootCopilot';
import { StatusBadge } from '../../components/StatusBadge';
import { supabaseUrl, supabaseAnonKey } from '../../lib/supabase';
import { useToast } from '../../components/Toast';

export const ShootDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { shoot, loading, updateBrief, updateLogistics, refetch } = useShootDetail(id!);
  const { success, error } = useToast();
  const [processingPayment, setProcessingPayment] = useState(false);
  const [showCopilot, setShowCopilot] = useState(false);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-purple-600" size={32} /></div>;
  if (!shoot) return <div className="p-12 text-center">Shoot not found</div>;

  const briefData = (shoot.brief_data as any) || {};
  const shotList = briefData.shot_list || [];

  const handlePayDeposit = async () => {
      setProcessingPayment(true);
      try {
          const response = await fetch(`${supabaseUrl}/functions/v1/create-checkout`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${supabaseAnonKey}`
              },
              body: JSON.stringify({
                  amount: shoot.estimated_quote * 0.5, // 50% deposit
                  title: `Deposit: ${shoot.shoot_type} shoot`,
                  shootId: shoot.id, // Metadata for webhook
                  successUrl: window.location.href
              })
          });
          
          const data = await response.json();
          if (data.url) {
              window.location.href = data.url;
          } else if (data.mock) {
               await updateLogistics({ status: 'confirmed', deposit_paid: true });
               success("Deposit paid (Mock)");
          }
      } catch (e) {
          console.error(e);
          error("Payment failed");
      } finally {
          setProcessingPayment(false);
      }
  };

  const handleUpdateBrief = (text: string) => {
      updateBrief({ ...briefData, brief: text });
  };

  const handleUpdateShots = (items: any[]) => {
      updateBrief({ ...briefData, shot_list: items });
  };

  return (
    <div className="pb-20 animate-in fade-in duration-500 relative">
      <div className="mb-6">
        <button onClick={() => navigate('/dashboard/bookings')} className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-black transition-colors">
          <ArrowLeft size={16} className="mr-2" /> Back to Bookings
        </button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
        <div>
            <div className="flex items-center gap-3 mb-2">
                <StatusBadge status={shoot.status} />
                <span className="text-xs font-mono text-gray-400 uppercase">#{shoot.id.substring(0, 8)}</span>
            </div>
            <h1 className="text-3xl font-serif font-bold text-gray-900 capitalize">
                {shoot.shoot_type} Production
            </h1>
            <p className="text-gray-500 mt-1 capitalize">{shoot.fashion_category} • {shoot.style_type}</p>
        </div>
        <div className="flex gap-3">
             {shoot.status === 'requested' && (
                 <Button 
                    variant="primary" 
                    onClick={handlePayDeposit} 
                    disabled={processingPayment}
                    className="gap-2 shadow-lg shadow-purple-500/20"
                 >
                    {processingPayment ? <Loader2 className="animate-spin" size={16}/> : <CreditCard size={16}/>}
                    Pay Deposit
                 </Button>
             )}
             <Button variant="outline" className="gap-2" onClick={() => setShowCopilot(!showCopilot)}>
                 <MessageSquare size={16} /> {showCopilot ? 'Hide Copilot' : 'AI Copilot'}
             </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT: Modules */}
          <div className="lg:col-span-2 space-y-8">
              {/* Timeline / Status Card */}
              <FadeIn>
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                      <h3 className="font-bold text-gray-900 mb-4">Production Status</h3>
                      <div className="flex items-center justify-between relative">
                          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-100 -z-0" />
                          {['requested', 'confirmed', 'production', 'review', 'completed'].map((s, i) => {
                              const steps = ['requested', 'confirmed', 'production', 'review', 'completed'];
                              const currentIdx = steps.indexOf(shoot.status);
                              const stepIdx = steps.indexOf(s);
                              const isCompleted = stepIdx <= currentIdx;
                              
                              return (
                                  <div key={s} className="relative z-10 flex flex-col items-center gap-2">
                                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${isCompleted ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-gray-200 text-gray-300'}`}>
                                          {isCompleted && <CheckCircle2 size={14} />}
                                      </div>
                                      <span className={`text-[10px] font-bold uppercase ${isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>{s}</span>
                                  </div>
                              );
                          })}
                      </div>
                  </div>
              </FadeIn>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-fit">
                  <FadeIn delay={100} className="h-full min-h-[400px]">
                      <ShootShotListModule items={shotList} onUpdate={handleUpdateShots} />
                  </FadeIn>
                  <FadeIn delay={200} className="h-full min-h-[400px]">
                      <ShootBriefModule brief={briefData.brief} onSave={handleUpdateBrief} />
                  </FadeIn>
              </div>
          </div>

          {/* RIGHT: Sidebar or Copilot */}
          <div className="space-y-6">
              {showCopilot ? (
                  <div className="sticky top-24 animate-in fade-in slide-in-from-right-4">
                      <ShootCopilot 
                          shootId={shoot.id} 
                          context={{ category: shoot.fashion_category, brief: briefData.brief, shotList: shotList }} 
                          onUpdate={refetch}
                      />
                  </div>
              ) : (
                  <FadeIn delay={300}>
                      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-24">
                          <h3 className="font-serif font-bold text-xl mb-6">Logistics</h3>
                          
                          <div className="space-y-6">
                              <div className="flex items-start gap-4">
                                  <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center shrink-0">
                                      <Calendar size={20} />
                                  </div>
                                  <div>
                                      <p className="text-xs font-bold uppercase text-gray-400 mb-1">Date</p>
                                      <p className="font-medium text-gray-900">
                                          {shoot.scheduled_date ? new Date(shoot.scheduled_date).toLocaleDateString() : 'TBD'}
                                      </p>
                                  </div>
                              </div>
                              
                              <div className="flex items-start gap-4">
                                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                                      <Clock size={20} />
                                  </div>
                                  <div>
                                      <p className="text-xs font-bold uppercase text-gray-400 mb-1">Time</p>
                                      <p className="font-medium text-gray-900">{shoot.scheduled_time || 'TBD'}</p>
                                  </div>
                              </div>

                              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                                  <div className="flex justify-between items-center mb-2">
                                      <span className="text-sm text-gray-600">Shoot Estimate</span>
                                      <span className="font-bold">${shoot.estimated_quote?.toLocaleString()}</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                      <span className="text-sm text-gray-600">Deposit Paid</span>
                                      <span className={`font-bold ${shoot.deposit_paid ? 'text-green-600' : 'text-amber-600'}`}>
                                          {shoot.deposit_paid ? 'Yes' : 'No'}
                                      </span>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </FadeIn>
              )}
          </div>
      </div>
    </div>
  );
};
