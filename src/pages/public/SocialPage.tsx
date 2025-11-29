
import React from 'react';
import { 
  Instagram, TrendingUp, Users, MessageCircle, BarChart3, 
  Smartphone, Share2, Globe, ArrowRight, CheckCircle2, 
  Linkedin, Play, Star, Calendar, MousePointerClick,
  Video, Camera, Zap, Heart, Layers, Sparkles, Map
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { FadeIn } from '../../components/FadeIn';
import { SectionTag } from '../../components/SectionTag';
import { ContactForm } from '../../components/forms/ContactForm';

// --- Sub-Components ---

const KPICard = ({ value, label, icon: Icon, trend }: { value: string, label: string, icon: any, trend?: string }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center hover:shadow-md transition-all group hover:-translate-y-1">
    <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 bg-pink-50 text-pink-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
           <Icon size={24} />
        </div>
        {trend && (
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">{trend}</span>
        )}
    </div>
    <div className="text-left">
        <h3 className="text-3xl font-bold text-gray-900 mb-1">{value}</h3>
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400">{label}</p>
    </div>
  </div>
);

const DashboardMockup = () => (
    <div className="relative mx-auto max-w-4xl">
        <div className="bg-gray-900 rounded-[2rem] p-2 shadow-2xl border border-gray-800">
            <div className="bg-white rounded-[1.5rem] overflow-hidden">
                {/* Fake Header */}
                <div className="h-14 border-b border-gray-100 flex items-center px-6 justify-between bg-white">
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center text-pink-600"><Instagram size={16}/></div>
                        <div className="h-2 w-24 bg-gray-100 rounded-full"></div>
                    </div>
                    <div className="flex gap-2">
                         <div className="h-8 w-8 bg-gray-50 rounded-full"></div>
                         <div className="h-8 w-8 bg-gray-50 rounded-full"></div>
                    </div>
                </div>
                {/* Fake Content */}
                <div className="p-6 grid grid-cols-3 gap-6">
                    {/* Main Chart Area */}
                    <div className="col-span-2 bg-gray-50 rounded-2xl h-64 p-6 flex flex-col justify-end relative overflow-hidden">
                        <div className="absolute top-6 left-6">
                            <div className="h-3 w-32 bg-gray-200 rounded-full mb-2"></div>
                            <div className="h-8 w-16 bg-gray-300 rounded-lg"></div>
                        </div>
                        {/* CSS Chart */}
                        <div className="flex items-end gap-2 h-32 mt-auto">
                            {[40, 65, 45, 80, 55, 70, 85, 60, 75, 90].map((h, i) => (
                                <div key={i} className="w-full bg-pink-200 rounded-t-sm" style={{height: `${h}%`}}></div>
                            ))}
                        </div>
                    </div>
                    {/* Side Stats */}
                    <div className="space-y-4">
                        <div className="bg-purple-50 rounded-2xl h-28 p-4">
                             <div className="h-8 w-8 bg-purple-100 rounded-lg mb-2"></div>
                             <div className="h-6 w-20 bg-purple-200 rounded mb-1"></div>
                             <div className="h-2 w-12 bg-purple-200 rounded"></div>
                        </div>
                        <div className="bg-blue-50 rounded-2xl h-28 p-4">
                             <div className="h-8 w-8 bg-blue-100 rounded-lg mb-2"></div>
                             <div className="h-6 w-20 bg-blue-200 rounded mb-1"></div>
                             <div className="h-2 w-12 bg-blue-200 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* Floating CTA */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20">
             <Link to="/dashboard">
                <Button size="lg" variant="primary" className="shadow-2xl shadow-pink-500/30 scale-110 hover:scale-125 transition-transform border-4 border-white">
                    Launch Command Center
                </Button>
             </Link>
        </div>
    </div>
);

const StepCard = ({ number, title, desc, icon: Icon }: { number: string, title: string, desc: string, icon: any }) => (
  <div className="p-8 bg-white rounded-2xl border border-gray-100 text-center hover:border-pink-200 transition-colors group relative overflow-hidden hover:shadow-lg">
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="w-14 h-14 mx-auto bg-gray-50 rounded-2xl flex items-center justify-center mb-6 text-gray-400 group-hover:bg-pink-500 group-hover:text-white transition-colors duration-300">
      <Icon size={24} />
    </div>
    <span className="block text-xs font-bold text-pink-500 uppercase tracking-widest mb-2">{number}</span>
    <h3 className="font-serif font-bold text-xl mb-3">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
  </div>
);

// --- Main Page Component ---

export const SocialPage: React.FC = () => {
  return (
    <div className="pt-20 pb-20 min-h-screen bg-white font-sans overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-20 pb-32 md:pt-32 md:pb-40 overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
           <FadeIn>
             <div className="inline-flex items-center justify-center p-2 bg-pink-50 rounded-full text-pink-600 mb-8 px-6 border border-pink-100 shadow-sm">
                <Instagram size={16} className="mr-2" />
                <span className="text-xs font-bold uppercase tracking-widest">Social First Agency</span>
             </div>
             <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-fashion-black leading-[1.1]">
               Social Media <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">Intelligence.</span>
             </h1>
             <p className="text-xl md:text-2xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
               Your story, everywhere — powered by AI-driven creativity and real-time analytics. We turn followers into brand advocates.
             </p>
             <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
                <Link to="/dashboard"><Button variant="primary" size="lg" className="px-10">Launch Dashboard</Button></Link>
                <Link to="/contact"><Button variant="outline" size="lg" className="px-10">Book Consultation</Button></Link>
             </div>

             {/* Dashboard Mockup Visual */}
             <DashboardMockup />
             
           </FadeIn>
        </div>

        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
           <div className="absolute top-[-10%] left-[20%] w-[40%] h-[40%] bg-pink-200/30 rounded-full blur-[120px]" />
           <div className="absolute bottom-[-10%] right-[20%] w-[40%] h-[40%] bg-purple-200/30 rounded-full blur-[120px]" />
        </div>
      </section>

      {/* 2. KPI BAR */}
      <section className="container mx-auto px-6 md:px-12 -mt-12 relative z-20 mb-24">
         <FadeIn delay={200}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
               <KPICard value="312%+" label="Avg Engagement Growth" icon={TrendingUp} trend="Trending" />
               <KPICard value="5M+" label="Monthly Reach" icon={Globe} trend="+12%" />
               <KPICard value="400+" label="Brands Managed" icon={MessageCircle} />
               <KPICard value="4.8/5" label="Client Rating" icon={Star} />
            </div>
         </FadeIn>
      </section>

      {/* 3. FEATURE SPLIT: Your Story Everywhere */}
      <section className="py-24 container mx-auto px-6 md:px-12">
         <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="lg:w-1/2">
               <FadeIn direction="right">
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-4 translate-y-8">
                        <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600" className="rounded-2xl shadow-lg w-full aspect-[4/5] object-cover" alt="Social 1" loading="lazy" />
                        <img src="https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=600" className="rounded-2xl shadow-lg w-full aspect-square object-cover" alt="Social 2" loading="lazy" />
                     </div>
                     <div className="space-y-4">
                        <img src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=600" className="rounded-2xl shadow-lg w-full aspect-square object-cover" alt="Social 3" loading="lazy" />
                        <img src="https://images.unsplash.com/photo-1611926653458-09294b3019dc?q=80&w=600" className="rounded-2xl shadow-lg w-full aspect-[4/5] object-cover" alt="Social 4" loading="lazy" />
                     </div>
                  </div>
               </FadeIn>
            </div>
            <div className="lg:w-1/2">
               <FadeIn>
                  <SectionTag color="text-pink-500">Comprehensive Management</SectionTag>
                  <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
                     Your story, <br/> everywhere.
                  </h2>
                  <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                     We manage your content, campaigns, and collaborations. FashionOS helps you reach audiences on Instagram, TikTok, YouTube, and Facebook — with data-driven creativity.
                  </p>
                  
                  <div className="space-y-6 mb-10">
                     {[
                        { title: "Content Creation", desc: "Photos, videos, Reels, and stories crafted for maximum impact", icon: Camera },
                        { title: "Strategic Planning", desc: "AI calendars, trend insights, and data-driven campaigns", icon: Calendar },
                        { title: "Community Management", desc: "Influencers, engagement, and authentic feedback", icon: MessageCircle },
                        { title: "Performance Optimization", desc: "Weekly reporting and ROI-focused adjustments", icon: BarChart3 }
                     ].map((item, i) => (
                        <div key={i} className="flex gap-4">
                           <div className="w-10 h-10 bg-pink-50 text-pink-600 rounded-full flex items-center justify-center shrink-0 mt-1">
                              <item.icon size={18} />
                           </div>
                           <div>
                              <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                              <p className="text-sm text-gray-500">{item.desc}</p>
                           </div>
                        </div>
                     ))}
                  </div>

                  <Link to="/dashboard/portal"><Button variant="primary">View Demo Dashboard</Button></Link>
               </FadeIn>
            </div>
         </div>
      </section>

      {/* 4. WORKFLOW STEPS */}
      <section className="py-24 bg-gray-50">
         <div className="container mx-auto px-6 md:px-12">
            <div className="text-center max-w-3xl mx-auto mb-16">
               <SectionTag>Process</SectionTag>
               <h2 className="text-4xl font-serif font-bold mb-4">How We Work</h2>
               <p className="text-gray-500">A seamless workflow from concept to conversion.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               <FadeIn delay={0}>
                  <StepCard 
                     number="01" 
                     title="Strategy" 
                     desc="Audit current presence and create a custom plan" 
                     icon={Map} 
                  />
               </FadeIn>
               <FadeIn delay={100}>
                  <StepCard 
                     number="02" 
                     title="Content" 
                     desc="Produce high-quality posts, stories, and videos" 
                     icon={Smartphone} 
                  />
               </FadeIn>
               <FadeIn delay={200}>
                  <StepCard 
                     number="03" 
                     title="Execute" 
                     desc="Schedule, publish, and engage with your audience" 
                     icon={Zap} 
                  />
               </FadeIn>
               <FadeIn delay={300}>
                  <StepCard 
                     number="04" 
                     title="Analyze" 
                     desc="Track metrics and optimize for better results" 
                     icon={BarChart3} 
                  />
               </FadeIn>
            </div>
         </div>
      </section>

      {/* 9. LEAD FORM */}
      <section className="py-24 bg-white">
         <div className="container mx-auto px-6 md:px-12">
            <div className="max-w-4xl mx-auto bg-gray-50 rounded-[3rem] p-8 md:p-16 shadow-lg border border-gray-100 text-center">
               <FadeIn>
                  <h2 className="text-4xl md:text-6xl font-serif font-bold mb-4">Ready to Grow?</h2>
                  <p className="text-gray-500 text-lg mb-10 max-w-2xl mx-auto">
                     Let's create a social strategy that works for your brand. <br/>
                     We'll send a personalized plan within 24 hours.
                  </p>
                  
                  <div className="max-w-2xl mx-auto text-left">
                     <ContactForm serviceType="Social Media" title="Start Conversation" subtitle="" className="border-none shadow-none bg-transparent p-0" />
                  </div>
               </FadeIn>
            </div>
         </div>
      </section>
    </div>
  );
};
