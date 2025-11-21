import React from 'react';
import { 
  Instagram, TrendingUp, Users, MessageCircle, BarChart3, 
  Smartphone, Share2, Globe, ArrowRight, CheckCircle2, 
  Linkedin, Play, Star, Calendar, MousePointerClick,
  Video, Camera, Zap, Heart, Layers, Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { FadeIn } from '../../components/FadeIn';
import { SectionTag } from '../../components/SectionTag';

// --- Sub-Components ---

const KPICard = ({ value, label, icon: Icon }: { value: string, label: string, icon: any }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center hover:shadow-md transition-shadow group">
    <div className="w-12 h-12 mx-auto bg-pink-50 text-pink-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
      <Icon size={24} />
    </div>
    <h3 className="text-3xl font-bold text-gray-900 mb-1">{value}</h3>
    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">{label}</p>
  </div>
);

const StepCard = ({ number, title, desc, icon: Icon }: { number: string, title: string, desc: string, icon: any }) => (
  <div className="p-8 bg-white rounded-2xl border border-gray-100 text-center hover:border-pink-200 transition-colors group relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="w-14 h-14 mx-auto bg-gray-50 rounded-2xl flex items-center justify-center mb-6 text-gray-400 group-hover:bg-pink-500 group-hover:text-white transition-colors duration-300">
      <Icon size={24} />
    </div>
    <span className="block text-xs font-bold text-pink-500 uppercase tracking-widest mb-2">{number}</span>
    <h3 className="font-serif font-bold text-xl mb-3">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
  </div>
);

const PricingCard = ({ plan, price, features, popular = false }: { plan: string, price: string, features: string[], popular?: boolean }) => (
  <div className={`relative p-8 rounded-3xl border flex flex-col h-full transition-transform duration-300 ${popular ? 'bg-fashion-black text-white border-fashion-black shadow-2xl md:-translate-y-4' : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-xl'}`}>
    {popular && (
      <div className="absolute top-0 inset-x-0 flex justify-center -mt-3">
        <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-lg">
          Most Popular
        </span>
      </div>
    )}
    <div className="mb-8 pb-8 border-b border-white/10">
      <h3 className={`font-serif font-bold text-2xl mb-2 ${popular ? 'text-white' : 'text-gray-900'}`}>{plan}</h3>
      <div className="flex items-baseline gap-1">
        <p className={`text-4xl font-bold ${popular ? 'text-pink-400' : 'text-gray-900'}`}>{price}</p>
        <span className={`text-sm ${popular ? 'text-gray-400' : 'text-gray-500'}`}>/mo</span>
      </div>
    </div>
    <ul className="space-y-4 mb-10 flex-1">
      {features.map((f, i) => (
        <li key={i} className="flex items-start gap-3 text-sm">
          <CheckCircle2 size={18} className={`mt-0.5 shrink-0 ${popular ? 'text-pink-400' : 'text-green-500'}`} />
          <span className={popular ? 'text-gray-300' : 'text-gray-600'}>{f}</span>
        </li>
      ))}
    </ul>
    <Link to="/contact" className="w-full">
      <Button variant={popular ? 'accent' : 'outline'} fullWidth className={popular ? 'shadow-lg shadow-pink-500/30' : 'hover:bg-gray-50'}>
        {popular ? 'Start Growing' : 'Get Started'}
      </Button>
    </Link>
  </div>
);

const TestimonialCard = ({ quote, author, role, rating }: { quote: string, author: string, role: string, rating: number }) => (
  <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
    <div className="flex gap-1 text-yellow-400 mb-6">
      {[...Array(rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
    </div>
    <p className="text-gray-600 text-lg leading-relaxed mb-6 italic">"{quote}"</p>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
        <img src={`https://ui-avatars.com/api/?name=${author}&background=random`} alt={author} />
      </div>
      <div>
        <p className="font-bold text-sm">{author}</p>
        <p className="text-xs text-gray-400 uppercase tracking-wider">{role}</p>
      </div>
    </div>
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
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">Marketing.</span>
             </h1>
             <p className="text-xl md:text-2xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
               Your story, everywhere — powered by AI-driven creativity and strategy. We turn followers into brand advocates.
             </p>
             <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/contact"><Button variant="primary" size="lg" className="px-10">Plan a Campaign</Button></Link>
                <Link to="/portfolio"><Button variant="outline" size="lg" className="px-10">View Results</Button></Link>
             </div>
           </FadeIn>
        </div>

        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
           <div className="absolute top-[-10%] left-[20%] w-[40%] h-[40%] bg-pink-200/30 rounded-full blur-[120px]" />
           <div className="absolute bottom-[-10%] right-[20%] w-[40%] h-[40%] bg-purple-200/30 rounded-full blur-[120px]" />
        </div>
      </section>

      {/* 2. KPI BAR */}
      <section className="container mx-auto px-6 md:px-12 -mt-12 relative z-20">
         <FadeIn delay={200}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
               <KPICard value="312%+" label="Avg Engagement Growth" icon={TrendingUp} />
               <KPICard value="5M+" label="Monthly Reach" icon={Globe} />
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
                        <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600" className="rounded-2xl shadow-lg w-full aspect-[4/5] object-cover" alt="Social 1" />
                        <img src="https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=600" className="rounded-2xl shadow-lg w-full aspect-square object-cover" alt="Social 2" />
                     </div>
                     <div className="space-y-4">
                        <img src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=600" className="rounded-2xl shadow-lg w-full aspect-square object-cover" alt="Social 3" />
                        <img src="https://images.unsplash.com/photo-1611926653458-09294b3019dc?q=80&w=600" className="rounded-2xl shadow-lg w-full aspect-[4/5] object-cover" alt="Social 4" />
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

                  <Link to="/services/social"><Button variant="primary">Learn More About Strategy</Button></Link>
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

      {/* 5. PRICING PLANS */}
      <section className="py-24 bg-white">
         <div className="container mx-auto px-6 md:px-12">
            <div className="text-center max-w-3xl mx-auto mb-16">
               <SectionTag>Investment</SectionTag>
               <h2 className="text-4xl font-serif font-bold mb-4">Management Plans</h2>
               <p className="text-gray-500">Choose the level of support that fits your brand's growth stage.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
               <FadeIn delay={0}>
                  <PricingCard 
                     plan="Essentials"
                     price="$499"
                     features={[
                        "15 posts/month",
                        "2 platforms",
                        "Content calendar",
                        "Basic analytics",
                        "Email support"
                     ]}
                  />
               </FadeIn>
               <FadeIn delay={100}>
                  <PricingCard 
                     plan="Professional"
                     price="$1,299"
                     popular
                     features={[
                        "30 posts/month",
                        "4 platforms",
                        "Content creation",
                        "Advanced analytics",
                        "Community management",
                        "Monthly strategy calls"
                     ]}
                  />
               </FadeIn>
               <FadeIn delay={200}>
                  <PricingCard 
                     plan="Premium"
                     price="$2,999"
                     features={[
                        "Unlimited posts",
                        "All platforms",
                        "Full-service content",
                        "Influencer campaigns",
                        "24/7 monitoring",
                        "Dedicated team"
                     ]}
                  />
               </FadeIn>
            </div>
         </div>
      </section>

      {/* 6. CONTENT PRODUCTION STRIP */}
      <section className="py-24 bg-gray-50 overflow-hidden">
         <div className="container mx-auto px-6 md:px-12 mb-12 flex flex-col md:flex-row justify-between items-end">
            <div className="max-w-lg">
               <div className="bg-pink-100 text-pink-600 px-3 py-1 rounded inline-block text-[10px] font-bold uppercase tracking-wider mb-4">Designed for Designers</div>
               <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">From backstage to broadcast.</h2>
               <p className="text-gray-500">
                  We craft campaigns for your runway, collection, or brand launch. Every post, reel, and story becomes part of your digital fashion show.
               </p>
            </div>
            
            <div className="hidden md:flex flex-col gap-3 text-sm font-medium text-gray-600">
               <span className="flex items-center gap-2"><Instagram size={16} className="text-pink-500" /> Instagram grids & Reels optimized for fashion</span>
               <span className="flex items-center gap-2"><Video size={16} className="text-blue-500" /> TikTok clips with trending sounds & effects</span>
               <span className="flex items-center gap-2"><Zap size={16} className="text-yellow-500" /> WhatsApp Stories for exclusive launches</span>
            </div>
         </div>

         {/* Image Strip */}
         <div className="w-full overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-2 min-w-[1000px]">
               {[
                  "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=400",
                  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=400",
                  "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=400",
                  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=400",
                  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=400",
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400"
               ].map((src, i) => (
                  <div key={i} className="aspect-[3/4] group relative overflow-hidden cursor-pointer">
                     <img src={src} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Social Content" />
                     <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 7. CAMPAIGN SHOWCASE */}
      <section className="py-24 bg-white">
         <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
               <h2 className="text-4xl font-serif font-bold mb-2">Campaign Showcase</h2>
               <p className="text-gray-500">Real results from fashion brands we've helped grow</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {[
                  "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800",
                  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800",
                  "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=800",
                  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800",
                  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800",
                  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800"
               ].map((src, i) => (
                  <FadeIn key={i} delay={i * 100}>
                     <div className="group relative rounded-2xl overflow-hidden aspect-[4/5] cursor-pointer">
                        <img src={src} alt={`Campaign ${i}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-0 left-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                           <p className="text-xs font-bold uppercase tracking-widest mb-1 text-pink-400">Campaign</p>
                           <h3 className="font-serif font-bold text-xl">Summer Collection 2025</h3>
                        </div>
                     </div>
                  </FadeIn>
               ))}
            </div>
            <div className="mt-12 text-center">
               <Link to="/portfolio"><Button variant="outline" size="lg">View All Case Studies</Button></Link>
            </div>
         </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="py-24 bg-gray-50">
         <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
               <h2 className="text-4xl font-serif font-bold">What Clients Say</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <FadeIn delay={0}>
                  <TestimonialCard 
                     rating={5}
                     quote="My engagement tripled in just 2 months. The content strategy is brilliant and the team is amazing."
                     author="Gabriela Rojas"
                     role="Fashion Influencer"
                  />
               </FadeIn>
               <FadeIn delay={100}>
                  <TestimonialCard 
                     rating={5}
                     quote="They handle everything from content to community. Our social presence has never looked this good."
                     author="André Silva"
                     role="Brand Manager"
                  />
               </FadeIn>
               <FadeIn delay={200}>
                  <TestimonialCard 
                     rating={5}
                     quote="Finally, a team that understands fashion and social media. The results speak for themselves."
                     author="Laura Méndez"
                     role="Designer"
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
                  
                  <form className="text-left space-y-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                           <label className="text-xs font-bold uppercase tracking-wider ml-1">Your Name</label>
                           <input type="text" placeholder="Jane Doe" className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-200" />
                        </div>
                        <div className="space-y-1">
                           <label className="text-xs font-bold uppercase tracking-wider ml-1">Email</label>
                           <input type="email" placeholder="jane@brand.com" className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-200" />
                        </div>
                     </div>
                     <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider ml-1">Current Social Presence</label>
                        <input type="text" placeholder="Instagram @handle, TikTok, etc." className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-200" />
                     </div>
                     <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider ml-1">Your Goals</label>
                        <textarea placeholder="Tell us about your brand, target audience, and what you want to achieve..." className="w-full p-3 rounded-xl border border-gray-200 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-pink-200" />
                     </div>
                     <Button fullWidth variant="accent" size="lg" className="mt-4 bg-gradient-to-r from-pink-500 to-purple-600 border-none text-white">Get Your Strategy</Button>
                  </form>
               </FadeIn>
            </div>
         </div>
      </section>
      
      {/* Map Component is just a lucide icon used earlier, ensure it's imported */}
      {/* Note: MousePointerClick, Heart, Layers, Sparkles added to imports at top */}

    </div>
  );
};

// Helper for StepCard icon (imported above)
import { Map } from 'lucide-react';