
import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Button } from '../../components/Button';
import { Input } from '../../components/forms/Input';
import { FadeIn } from '../../components/FadeIn';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await (supabase.auth as any).signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Redirect logic
      if (data.user) {
        // Check if user is a sponsor or internal
        const { data: profile } = await supabase
          .from('sponsor_profiles')
          .select('id')
          .eq('owner_id', data.user.id)
          .single();

        if (profile) {
          navigate('/dashboard/portal');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF8F5] flex items-center justify-center p-4">
      <FadeIn>
        <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 p-8 md:p-12 w-full max-w-md relative overflow-hidden">
          
          {/* Decor */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full blur-3xl -mr-16 -mt-16" />
          
          <div className="relative z-10">
            <div className="text-center mb-10">
              <Link to="/" className="text-2xl font-serif font-bold tracking-tighter mb-2 block">FashionOS</Link>
              <p className="text-gray-500 text-sm">Sign in to your dashboard</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl flex items-start gap-2">
                <span className="font-bold">Error:</span> {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                    placeholder="name@company.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <Button fullWidth variant="primary" size="lg" disabled={loading} className="mt-2">
                {loading ? <Loader2 className="animate-spin" /> : <>Sign In <ArrowRight size={16} className="ml-2" /></>}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-xs text-gray-400">
                Don't have an account? <Link to="/contact" className="text-purple-600 font-bold hover:underline">Contact Sales</Link>
              </p>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};
