import React from 'react';
import { Instagram, TrendingUp, Users, MessageCircle, BarChart3, Smartphone, Share2, Globe, ArrowRight, CheckCircle2, Linkedin, Twitter, Facebook, Hash } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { FadeIn } from '../../components/FadeIn';
import { SectionTag } from '../../components/SectionTag';

const FeatureCard = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 group">
    <div className="w-12 h-12 bg-pink-50 text-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-pink-600 group-hover:text-white transition-colors">
      <Icon size={24} />
    </div>
    <h3 className="font-serif font-bold text-xl mb-3">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
  </div>
);

const PlatformCard = ({ icon: Icon, name, stats, color }: { icon: any, name: string, stats: string, color: string }) => (
  <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${color}`}>
      <Icon size={20} />
    </div>
    <div>
      <p className="font-bold text-sm">{name}</p>
      <p className="text-xs text-gray-400 font-medium">{stats}</p>
    </div>
  </div>
);

export const SocialPage: React.FC = () => {
  return (
    <div className="pt-20 pb-20 min-h-screen bg-white font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
           <FadeIn>
             <div className="inline-flex items-center justify-center p-2 bg-pink-50 rounded-full text-pink-600 mb-8 px-6 border border-pink-100">
                <Instagram size={16} className="mr-2" />
                <span className="text-xs font-bold uppercase tracking-widest">Social First Agency</span>
             </div>
             <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 text-fashion-black leading-tight">
               Turn Followers into <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">Brand Advocates.</span>
             </h1>
             <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
               We manage your brand presence across Instagram, TikTok, and LinkedIn with data-driven strategies and thumb-stopping creative.
             </p>
             <div className="flex justify-center gap-4">
                <Button variant="primary" size="lg">Get a Strategy Audit</Button>
                <Link to="/dashboard/social"><Button variant="outline" size="lg">View Command Center</Button></Link>
             </div>
           </FadeIn>
        </div>

        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30 pointer-events-none">
           <div className="absolute top-20 left-10 w-64 h-64 bg-pink-200 rounded-full blur-[100px]" />
           <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-200 rounded-full blur-[100px]" />
        </div>
      </section>

      {/* 2. DASHBOARD PREVIEW */}
      <section className="py-12 container mx-auto px-6 md:px-12">
         <FadeIn direction="up">
            <div className="bg-gray-900 text-white rounded-[2.5rem] p-4 md:p-8 shadow-2xl relative overflow-hidden border border-gray-800">
               <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-800/50 to-black/80 z-0" />
               <div className="relative z-10 bg-gray-900/50 backdrop-blur-xl rounded-3xl border border-white/10 p-6 md:p-12">
                  <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                     <div>
                        <h2 className="text-3xl font-serif font-bold mb-2">Social Command Center</h2>
                        <p className="text-gray-400">Real-time analytics and engagement tracking.</p>
                     </div>
                     <div className="flex gap-3">
                        <PlatformCard icon={Instagram} name="Instagram" stats="+12.5k Followers" color="bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500" />
                        <PlatformCard icon={Linkedin} name="LinkedIn" stats="+4.2k Connections" color="bg-blue-600" />
                     </div>
                  </div>
                  
                  {/* Mock Chart Area */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                     <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Total Reach</p>
                        <p className="text-3xl font-bold mb-4">1.2M <span className="text-green-400 text-sm font-medium">+14%</span></p>
                        <div className="h-16 flex items-end gap-1">
                           {[40, 60, 45, 70, 50, 80, 65].map((h, i) => (
                              <div key={i} className="w-full bg-pink-500/20 rounded-t-sm" style={{height: `${h}%`}}>
                                 <div className="w-full bg-pink-500 rounded-t-sm h-[40%]" />
                              </div>
                           ))}
                        </div>
                     </div>
                     <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Engagement Rate</p>
                        <p className="text-3xl font-bold mb-4">5.8% <span className="text-green-400 text-sm font-medium">+0.4%</span></p>
                        <div className="h-16 flex items-end gap-1">
                           {[30, 40, 35, 50, 45, 60, 55].map((h, i) => (
                              <div key={i} className="w-full bg-purple-500/20 rounded-t-sm" style={{height: `${h}%`}}>
                                 <div className="w-full bg-purple-500 rounded-t-sm h-[60%]" />
                              </div>
                           ))}
                        </div>
                     </div>
                     <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Viral Coefficients</p>
                        <p className="text-3xl font-bold mb-4">9.2 <span className="text-gray-500 text-sm font-medium">Score</span></p>
                        <div className="flex items-center gap-2 mt-4">
                           <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                              <div className="w-[85%] h-full bg-gradient-to-r from-pink-500 to-purple-500" />
                           </div>
                           <span className="text-xs font-bold">High</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </FadeIn>
      </section>

      {/* 3. SERVICES */}
      <section className="py-24 bg-gray-50">
         <div className="container mx-auto px-6 md:px-12">
            <div className="text-center max-w-3xl mx-auto mb-16">
               <SectionTag>Our Services</SectionTag>
               <h2 className="text-4xl font-serif font-bold mb-4">Full-Stack Social</h2>
               <p className="text-gray-500">Everything you need to grow, engage, and convert your audience.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <FadeIn delay={0}>
                  <FeatureCard 
                     icon={Hash}
                     title="Content Strategy"
                     desc="We build content pillars that align with your brand voice and business goals, ensuring every post has a purpose."
                  />
               </FadeIn>
               <FadeIn delay={100}>
                  <FeatureCard 
                     icon={Smartphone}
                     title="Content Creation"
                     desc="From Reels to carousels, our in-house creative team shoots and edits mobile-first content that stops the scroll."
                  />
               </FadeIn>
               <FadeIn delay={200}>
                  <FeatureCard 
                     icon={Users}
                     title="Community Management"
                     desc="We don't just post; we engage. Real conversations with your audience to build loyalty and trust."
                  />
               </FadeIn>
               <FadeIn delay={300}>
                  <FeatureCard 
                     icon={TrendingUp}
                     title="Paid Social"
                     desc="Targeted ad campaigns on Meta and TikTok to amplify your reach and drive measurable ROI."
                  />
               </FadeIn>
               <FadeIn delay={400}>
                  <FeatureCard 
                     icon={MessageCircle}
                     title="Influencer Seeding"
                     desc="Strategic gifting and partnerships with creators who match your brand aesthetic and values."
                  />
               </FadeIn>
               <FadeIn delay={500}>
                  <FeatureCard 
                     icon={BarChart3}
                     title="Reporting & Analytics"
                     desc="Monthly deep-dives into performance metrics with actionable insights for continuous improvement."
                  />
               </FadeIn>
            </div>
         </div>
      </section>

      {/* 4. PLATFORMS */}
      <section className="py-24 container mx-auto px-6 md:px-12">
         <div className="flex flex-col md:flex-row items-center gap-20">
            <div className="md:w-1/2">
               <FadeIn>
                  <h2 className="text-4xl font-serif font-bold mb-6">Platform Expertise.</h2>
                  <p className="text-gray-500 text-lg mb-8">
                     Different platforms require different languages. We are native speakers of the internet.
                  </p>
                  <div className="space-y-6">
                     <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 flex items-center justify-center text-white shrink-0"><Instagram size={24} /></div>
                        <div>
                           <h3 className="font-bold text-lg">Instagram</h3>
                           <p className="text-sm text-gray-500">Aesthetic storytelling and community building via Stories and Reels.</p>
                        </div>
                     </div>
                     <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white shrink-0"><Smartphone size={24} /></div>
                        <div>
                           <h3 className="font-bold text-lg">TikTok</h3>
                           <p className="text-sm text-gray-500">Viral trends, raw authenticity, and sound-on entertainment.</p>
                        </div>
                     </div>
                     <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0"><Linkedin size={24} /></div>
                        <div>
                           <h3 className="font-bold text-lg">LinkedIn</h3>
                           <p className="text-sm text-gray-