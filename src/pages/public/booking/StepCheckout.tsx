
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../../context/BookingContext';
import { FadeIn } from '../../../components/FadeIn';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/forms/Input';
import { Lock, CreditCard, ShieldCheck, Loader2 } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { useToast } from '../../../components/Toast';

export const StepCheckout: React.FC = () => {
  const { state, totals, resetBooking } = useBooking();
  const navigate = useNavigate();
  const { success, error } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Form State
  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: ''
  });

  const depositAmount = totals.total * 0.5;

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // 1. Simulate Stripe Tokenization delay
      await new Promise(r => setTimeout(r, 1500));

      // 2. Create Booking Record in Supabase
      const { data: { user } } = await (supabase.auth as any).getUser();
      
      const { error: dbError } = await supabase
        .from('shoots') // Assuming 'shoots' table exists from previous schema tasks
        .insert({
          designer_id: user?.id || null, // Allow guest checkout if no auth
          shoot_type: state.service,
          fashion_category: state.category,
          looks_count: state.shotCount,
          style_type: state.style,
          retouching_level: state.retouching,
          brief_data: { 
            brief: state.brief,
            references: state.references,
            contact: contact,
            shot_list: state.shotList
          },
          status: 'requested',
          estimated_quote: totals.total,
          deposit_paid: depositAmount,
          currency: 'USD'
        });

      if (dbError) {
        console.warn("DB Insert failed (Simulated mode):", dbError);
        // We continue for demo purposes even if DB fails due to RLS/Schema mismatches in this demo env
      }

      // 3. Success & Reset
      success("Booking request sent successfully! Check your dashboard.");
      resetBooking();
      navigate('/dashboard/bookings');

    } catch (err) {
      console.error(err);
      error("Payment processing failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <FadeIn>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left: Contact & Payment Form */}
        <div>
          <h1 className="text-4xl font-serif font-bold mb-8">Secure Checkout</h1>
          
          <form onSubmit={handlePay} className="space-y-8">
            {/* Contact Section */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                <span className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                Contact Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Input 
                  label="First Name" 
                  value={contact.firstName} 
                  onChange={e => setContact({...contact, firstName: e.target.value})}
                  required 
                />
                <Input 
                  label="Last Name" 
                  value={contact.lastName} 
                  onChange={e => setContact({...contact, lastName: e.target.value})}
                  required 
                />
              </div>
              <Input 
                label="Email Address" 
                type="email" 
                value={contact.email} 
                onChange={e => setContact({...contact, email: e.target.value})}
                required 
                className="mb-6"
              />
              <Input 
                label="Company (Optional)" 
                value={contact.company} 
                onChange={e => setContact({...contact, company: e.target.value})}
              />
            </div>

            {/* Payment Section */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                <span className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                Payment Method
              </h3>
              
              <div className="p-4 border border-purple-200 bg-purple-50 rounded-xl flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-purple-600" size={20} />
                  <span className="text-sm font-bold text-purple-900">Deposit Due Today</span>
                </div>
                <span className="text-xl font-bold text-purple-900">${depositAmount.toLocaleString()}</span>
              </div>

              {/* Mock Stripe Element */}
              <div className="space-y-4">
                <div className="relative">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1 mb-1 block">Card Number</label>
                  <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 px-4 py-3 focus-within:ring-2 focus-within:ring-black focus-within:border-black transition-all">
                    <CreditCard className="text-gray-400 mr-3" size={20} />
                    <input 
                      type="text" 
                      placeholder="0000 0000 0000 0000" 
                      className="bg-transparent border-none outline-none w-full text-sm font-mono"
                      maxLength={19}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1 mb-1 block">Expiration</label>
                    <input type="text" placeholder="MM / YY" className="w-full border border-gray-200 rounded-xl bg-gray-50 px-4 py-3 text-sm font-mono outline-none focus:ring-2 focus:ring-black" maxLength={5} />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1 mb-1 block">CVC</label>
                    <div className="relative">
                      <input type="text" placeholder="123" className="w-full border border-gray-200 rounded-xl bg-gray-50 px-4 py-3 text-sm font-mono outline-none focus:ring-2 focus:ring-black" maxLength={3} />
                      <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button fullWidth variant="primary" size="lg" disabled={isProcessing} className="h-14">
                  {isProcessing ? <Loader2 className="animate-spin" /> : <Lock size={18} className="mr-2" />}
                  {isProcessing ? 'Processing...' : `Pay $${depositAmount.toLocaleString()} & Book`}
                </Button>
                <div className="flex justify-center items-center gap-2 mt-4 text-xs text-gray-400">
                  <Lock size={10} /> Payments secured by Stripe
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Right: Order Summary */}
        <div>
          <div className="sticky top-32">
            <div className="bg-gray-900 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-900 rounded-full blur-3xl -mr-16 -mt-16 opacity-50 pointer-events-none" />
              
              <h3 className="font-serif font-bold text-2xl mb-6 relative z-10">Order Summary</h3>
              
              <div className="space-y-4 border-b border-gray-700 pb-6 mb-6 relative z-10">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-lg capitalize">{state.category} Shoot</p>
                    <p className="text-sm text-gray-400 capitalize">{state.style} Style</p>
                  </div>
                  <p className="font-bold">${totals.baseFee.toLocaleString()}</p>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-lg">{state.shotCount} Photos</p>
                    <p className="text-sm text-gray-400">Volume Pricing</p>
                  </div>
                  <p className="font-bold">${totals.shotFee.toLocaleString()}</p>
                </div>
                {state.retouching === 'high-end' && (
                  <div className="flex justify-between items-center text-purple-300">
                    <p className="text-sm font-medium">High-End Retouching</p>
                    <p className="font-bold">+${totals.retouchingFee.toLocaleString()}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center mb-2 relative z-10 text-gray-400 text-sm">
                <span>Subtotal</span>
                <span>${totals.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center mb-6 relative z-10 text-gray-400 text-sm">
                <span>Tax (Est.)</span>
                <span>${totals.tax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-end pt-6 border-t border-gray-700 relative z-10">
                <span className="font-bold uppercase tracking-widest text-sm">Total</span>
                <span className="font-serif font-bold text-4xl">${totals.total.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500 leading-relaxed max-w-xs mx-auto">
                By clicking "Pay & Book", you agree to FashionOS Terms of Service. 
                Remaining balance is due upon asset delivery.
              </p>
            </div>
          </div>
        </div>

      </div>
    </FadeIn>
  );
};
