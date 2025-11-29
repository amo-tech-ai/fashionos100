
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Camera, Sparkles, Wand2, ArrowRight, Star, 
  ShoppingBag, Video, Box, Users, Scissors, 
  Palette, Shirt, MonitorPlay, Heart, ChevronRight,
  Play, Plus
} from 'lucide-react';
import { Button } from '../../components/Button';
import { FadeIn } from '../../components/FadeIn';

// --- Types ---
interface PackItem {
  tag?: string;
  tagColor?: string;
  title: string;
  desc: string;
  image: string;
  price: string;
}

interface ServiceItem {
  title: string;
  desc: string;
  image: string;
}

interface CategoryItem {
  title: string;
  image: string;
  color: string;
}

// --- Data ---
const TRENDING_PACKS: PackItem[] = [
  {
    tag: 'FEATURED',
    tagColor: 'bg-purple-100 text-purple-700',
    title: 'Amazon A+ premium pack',
    desc: 'Hero + detail shots optimized for Amazon listings.',
    price: '$450',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop'
  },
  {
    tag: 'FEATURED',
    tagColor: 'bg-purple-100 text-purple-700',
    title: 'photo + video full body model pack',
    desc: 'On-model shots for your seasonal lookbook.',
    price: '$1,200',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop'
  },
  {
    tag: 'TRENDING',
    tagColor: 'bg-orange-100 text-orange-700',
    title: 'photo + video hand model pack',
    desc: 'Perfect for jewelry, beauty & accessories.',
    price: '$850',
    image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=600&auto=format&fit=crop'
  },
  {
    tag: 'FEATURED',
    tagColor: 'bg-purple-100 text-purple-700',
    title: 'ecomm starter pack',
    desc: 'White background photos for 20 products.',
    price: '$950',
    image: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=600&auto=format&fit=crop'
  },
  {
    tag: 'TRENDING',
    tagColor: 'bg-orange-100 text-orange-700',
    title: 'Amazon listing starter pack',
    desc: 'The essentials to get your ASIN live fast.',
    price: '$350',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop'
  },
  {
    title: 'TikTok Shop deluxe pack',
    desc: 'Vertical video loops designed for conversion.',
    price: '$600',
    image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=600&auto=format&fit=crop'
  }
];

const SERVICES: ServiceItem[] = [
  { title: 'full body model', desc: 'Runway-style looks', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300' },
  { title: 'mannequin styling', desc: 'Ghost mannequin', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=300' },
  { title: 'foot model', desc: 'Shoes & sandals', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=300' },
  { title: 'hand model', desc: 'Jewelry & beauty', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=300' },
  { title: 'styling', desc: 'Props & sets', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=300' },
  { title: 'hair & makeup', desc: 'On-site glam team', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=300' },
];

const CATEGORIES: CategoryItem[] = [
  { title: 'beauty & skincare', image: 'https://images.unsplash.com/photo-1596462502278-27bfdd403348?q=80&w=300', color: 'bg-blue-100' },
  { title: 'health & wellness', image: 'https://images.unsplash.com/photo-1544367563-12123d896889?q=80&w=300', color: 'bg-red-100' },
  { title: 'food & beverage', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=300', color: 'bg-orange-100' },
  { title: 'jewelry', image: 'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=300', color: 'bg-yellow-50' },
  { title: 'clothing & shoes', image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=300', color: 'bg-gray-100' },
  { title: 'home goods', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=300', color: 'bg-stone-100' },
];

// --- Components ---

const SidebarLink = ({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) => (
  <button className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all text-sm font-bold mb-1 ${active ? 'bg-white shadow-sm text-fashion-black' : 'text-gray-500 hover:bg-white/50 hover:text-fashion-black'}`}>
    <Icon size={18} className={active ? 'text-fashion-purple' : ''} />
    {label}
  </button>
);

const ActionCard = ({ icon: Icon, title, text, cta, image, color }: { icon: any, title: string, text: string, cta: string, image?: string, color: string }) => (
  <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full relative overflow-hidden group cursor-pointer">
    <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-4 relative z-10`}>
      <Icon size={20} />
    </div>
    <h3 className="font-serif font-bold text-lg mb-2 relative z-10">{title}</h3>
    <p className="text-xs text-gray-500 mb-8 leading-relaxed relative z-10 max-w-[80%]">{text}</p>
    <div className="mt-auto flex items-center justify-between relative z-10">
      <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition-transform">
        {cta} <ArrowRight size={12} />
      </span>
    </div>
    {image && (
      <img 
        src={image} 
        alt="Background" 
        className="absolute bottom-0 right-0 w-24 h-24 object-cover opacity-20 rounded-tl-3xl group-hover:scale-110 transition-transform duration-500"
        loading="lazy"
      />
    )}
  </div>
);

const PackCard = ({ pack }: { pack: PackItem }) => (
  <div className="min-w-[280px] bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer group">
    <div className="aspect-[4/3] relative overflow-hidden">
      <img src={pack.image} alt={pack.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
      {pack.tag && (
        <span className={`absolute top-3 left-3 ${pack.tagColor} text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider shadow-sm`}>
          {pack.tag}
        </span>
      )}
    </div>
    <div className="p-4">
      <h3 className="font-bold text-sm mb-1 line-clamp-1">{pack.title}</h3>
      <p className="text-xs text-gray-500 mb-3">{pack.price}</p>
      <div className="flex items-center justify-between border-t border-gray-50 pt-3">
         <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">View details</span>
         <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-fashion-black group-hover:text-white transition-colors">
            <Plus size={14} />
         </div>
      </div>
    </div>
  </div>
);

const CategoryCard = ({ cat }: { cat: CategoryItem }) => (
  <div className="group cursor-pointer">
    <div className={`aspect-square rounded-2xl overflow-hidden mb-3 relative ${cat.color}`}>
      <img src={cat.image} alt={cat.title} className="w-full h-full object-contain p-4 mix-blend-multiply group-hover:scale-110 transition-transform duration-500" loading="lazy" />
    </div>
    <p className="text-xs font-bold text-center capitalize">{cat.title}</p>
  </div>
);

export const EcommercePage: React.FC = () => {
  return (
    <div className="bg-[#FBF8F5] min-h-screen pt-24 pb-20 font-sans text-fashion-black">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* --- LEFT SIDEBAR (Sticky) --- */}
          <aside className="hidden lg:block w-64 shrink-0 sticky top-28">
             <nav className="space-y-1 mb-8">
                <SidebarLink icon={ShoppingBag} label="Home" active />
                <SidebarLink icon={Camera} label="Studio bookings" />
                <SidebarLink icon={Video} label="UGC" />
                <SidebarLink icon={Wand2} label="AI studio" />
                <SidebarLink icon={Users} label="Model directory" />
                <SidebarLink icon={Sparkles} label="Discovery" />
             </nav>

             <div className="mb-8">
                <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Manage</p>
                <nav className="space-y-1">
                   <SidebarLink icon={Box} label="Gallery" />
                   <SidebarLink icon={Shirt} label="Products" />
                </nav>
             </div>

             <div className="mb-8">
                <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Measure</p>
                <nav className="space-y-1">
                   <SidebarLink icon={MonitorPlay} label="Listing insights" />
                   <SidebarLink icon={Star} label="Competitive analysis" />
                </nav>
             </div>

             <div className="px-4 pt-4 border-t border-gray-200/50">
                <SidebarLink icon={Box} label="Integrations" />
             </div>

             <div className="mt-6 space-y-2">
               <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-3 text-white cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-1">
                     <Sparkles size={12} /> try our AI tools
                  </div>
                  <ArrowRight size={14} className="ml-auto" />
               </div>
               <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg p-3 text-white cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-1">
                     <Wand2 size={12} /> try our AI tools
                  </div>
                  <ArrowRight size={14} className="ml-auto" />
               </div>
             </div>
          </aside>

          {/* --- MAIN CONTENT --- */}
          <main className="flex-1 w-full min-w-0">
            
            {/* Header */}
            <div className="flex justify-between items-end mb-8">
               <div>
                  <h1 className="text-2xl md:text-3xl font-serif font-bold mb-2">Brand-perfect content starts here</h1>
                  <p className="text-sm text-gray-500">Keep your standards up to date to ensure we're aligned across every project.</p>
               </div>
               <Button variant="primary" size="sm" className="rounded-full bg-black text-white px-6 hidden md:flex">Brand standards <ArrowRight size={14} className="ml-2" /></Button>
            </div>

            {/* 1. HERO SHORTCUTS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
               <FadeIn delay={0}>
                  <ActionCard 
                    icon={Camera} 
                    color="bg-pink-100 text-pink-600"
                    title="Build a shoot" 
                    text="Create and schedule photo or video shoots."
                    cta="Build a shoot"
                    image="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=200"
                  />
               </FadeIn>
               <FadeIn delay={100}>
                  <ActionCard 
                    icon={Video} 
                    color="bg-green-100 text-green-600"
                    title="Create a UGC brief" 
                    text="Get authentic content from top creators."
                    cta="Create a UGC brief"
                    image="https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=200"
                  />
               </FadeIn>
               <FadeIn delay={200}>
                  <ActionCard 
                    icon={Wand2} 
                    color="bg-orange-100 text-orange-600"
                    title="Transform images" 
                    text="Create AI scenes or enhance photos with editing tools."
                    cta="Transform images"
                    image="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=200"
                  />
               </FadeIn>
            </div>

            {/* 2. TRENDING PACKS */}
            <div className="mb-12">
               <div className="flex justify-between items-baseline mb-6">
                  <h2 className="font-serif font-bold text-xl">Trending packs</h2>
                  <button className="hidden"><ChevronRight /></button>
               </div>
               <div className="relative -mx-4 px-4 md:mx-0 md:px-0">
                  <div className="flex gap-4 overflow-x-auto pb-6 hide-scrollbar snap-x">
                     {TRENDING_PACKS.map((pack, i) => (
                        <div key={i} className="snap-center">
                           <PackCard pack={pack} />
                        </div>
                     ))}
                     {/* Ghost button for view all */}
                     <div className="min-w-[100px] flex items-center justify-center">
                        <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-white hover:shadow-md transition-all">
                           <ChevronRight size={20} className="text-gray-400" />
                        </button>
                     </div>
                  </div>
               </div>
            </div>

            {/* 3. SPLIT FEATURE ROW */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
               <FadeIn delay={0} className="bg-[#f0fdf4] p-8 rounded-2xl relative overflow-hidden flex flex-col min-h-[300px] group cursor-pointer">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#dcfce7] rounded-bl-full -mr-4 -mt-4 z-0" />
                  <div className="relative z-10 max-w-xs">
                     <div className="inline-block bg-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-green-700 mb-4 shadow-sm transform rotate-2">Plan with the pros</div>
                     <h3 className="font-serif font-bold text-2xl mb-3 text-green-900">plan with the pros</h3>
                     <p className="text-green-800/80 text-sm mb-6 leading-relaxed">
                        speak with our team to get a recommendation for your content needs.
                     </p>
                     <button className="bg-white text-green-900 border border-green-200 px-6 py-3 rounded-sm font-bold text-xs uppercase tracking-wider hover:shadow-lg hover:-translate-y-0.5 transition-all">
                        talk to an expert
                     </button>
                  </div>
                  <img src="https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=400" className="absolute bottom-0 right-0 w-48 h-48 object-cover rounded-tl-[3rem] shadow-lg group-hover:scale-105 transition-transform duration-500" alt="Expert" loading="lazy" />
                  <div className="absolute top-4 right-4 bg-[#84cc16] text-white text-[10px] font-bold px-2 py-1 transform rotate-45 shadow-sm hidden">FREE</div>
               </FadeIn>

               <FadeIn delay={100} className="bg-[#fff7ed] p-8 rounded-2xl relative overflow-hidden flex flex-col min-h-[300px] group cursor-pointer">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#ffedd5] rounded-bl-full -mr-4 -mt-4 z-0" />
                  <div className="relative z-10 max-w-xs">
                     <div className="inline-block bg-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-orange-700 mb-4 shadow-sm transform -rotate-1">AI Studio</div>
                     <h3 className="font-serif font-bold text-2xl mb-3 text-orange-900">create any scene with AI studio</h3>
                     <p className="text-orange-800/80 text-sm mb-6 leading-relaxed">
                        upload a product photo and create custom scenes with our new AI studio.
                     </p>
                     <button className="bg-white text-orange-900 border border-orange-200 px-6 py-3 rounded-sm font-bold text-xs uppercase tracking-wider hover:shadow-lg hover:-translate-y-0.5 transition-all">
                        create custom scene
                     </button>
                  </div>
                  <div className="absolute bottom-8 right-8 w-40 h-40 group-hover:scale-105 transition-transform duration-500">
                     <img src="https://images.unsplash.com/photo-1512413914633-b5043f4041ea?q=80&w=400" className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-lg z-10" alt="Product" loading="lazy" />
                     {/* AI Decoration */}
                     <div className="absolute -inset-4 border-2 border-dashed border-blue-400 rounded-2xl z-20 animate-pulse" />
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/80 backdrop-blur p-2 rounded-full z-30">
                        <Plus className="text-blue-500" />
                     </div>
                     <h2 className="absolute -bottom-12 left-0 right-0 text-center font-black text-blue-300/20 text-4xl uppercase italic transform -rotate-6 pointer-events-none">YOUR PRODUCT HERE</h2>
                  </div>
               </FadeIn>
            </div>

            {/* 4. PROFESSIONAL SERVICES */}
            <div className="mb-12">
               <h2 className="font-serif font-bold text-xl mb-6">professional services</h2>
               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {SERVICES.map((s, i) => (
                     <FadeIn key={i} delay={i * 50}>
                        <div className="bg-white p-3 rounded-xl border border-gray-100 hover:shadow-lg transition-all cursor-pointer group h-full">
                           <div className="aspect-square rounded-lg overflow-hidden mb-3 relative">
                              <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                           </div>
                           <h3 className="font-bold text-xs capitalize mb-1">{s.title}</h3>
                           <p className="text-[10px] text-gray-400 line-clamp-1">{s.desc}</p>
                        </div>
                     </FadeIn>
                  ))}
               </div>
            </div>

            {/* 5. GET INSPIRED */}
            <div className="mb-12">
               <h2 className="font-serif font-bold text-xl mb-6">get inspired</h2>
               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {CATEGORIES.map((c, i) => (
                     <FadeIn key={i} delay={i * 50}>
                        <CategoryCard cat={c} />
                     </FadeIn>
                  ))}
               </div>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
};