
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, ShieldCheck, TrendingUp, CheckCircle2, ArrowRight, 
  Layout, Camera, Image as ImageIcon, User, Box, FileText, 
  BarChart3, Zap, Search, Plus, HelpCircle 
} from 'lucide-react';
import { Button } from '../../components/Button';
import { FadeIn } from '../../components/FadeIn';
import { SectionTag } from '../../components/SectionTag';
import { Input } from '../../components/forms/Input';

// --- Sub-Components ---

const BenefitCard = ({ icon: Icon, title, text }: { icon: any, title: string, text: string }) => (
  <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all text-center md:text-left h-full">
    <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center mb-6 mx-auto md:mx-0">
      <Icon size={24} />
    </div>
    <h3 className="font-serif font-bold text-xl mb-3 text-gray-900">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed">{text}</p>
  </div>
);

const ServiceCard = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="p-6 bg-white rounded-xl border border-gray-100 hover:border-orange-200 hover:shadow-lg transition-all group cursor-pointer h-full">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-600 group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors">
        <Icon size={20} />
      </div>
      <h4 className="font-bold text-lg text-gray-900 group-hover:text-orange-600 transition-colors">{title}</h4>
    </div>
    <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
  </div>
);

const PricingCard = ({ title, price, features, cta, recommended = false }: { title: string, price: string, features: string[], cta: string, recommended?: boolean }) => (
  <div className={`p-8 rounded-3xl border flex flex-col h-full relative ${recommended ? 'bg-gray-900 text-white border-gray-900 shadow-xl md:-translate-y-4' : 'bg-white border-gray-200 text-gray-900'}`}>
    {recommended && (
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-sm">
        Most Popular
      </div>
    )}
    <div className="mb-8">
      <h3 className={`font-serif font-bold text-xl mb-2 ${recommended ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-bold">{price}</span>
        <span className={`text-sm ${recommended ? 'text-gray-400' : 'text-gray-500'}`}>/pack</span>
      </div>
    </div>
    <ul className="space-y-4 mb-8 flex-1">
      {features.map((f, i) => (
        <li key={i} className="flex items-start gap-3 text-sm">
          <CheckCircle2 size={18} className={`mt-0.5 shrink-0 ${recommended ? 'text-orange-400' : 'text-green-600'}`} />
          <span className={recommended ? 'text-gray-300' : 'text-gray-600'}>{f}</span>
        </li>
      ))}
    </ul>
    <Button 
      fullWidth 
      variant={recommended ? 'primary' : 'outline'} 
      className={recommended ? 'bg-white text-black hover:bg-gray-100 border-none' : ''}
    >
      {cta}
    </Button>
  </div>
);

const FeatureHighlight = ({ title, desc, badge }: { title: string, desc: string, badge: string }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-orange-100 transition-all">
    <span className="inline-block bg-orange-50 text-orange-700 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider mb-4">{badge}</span>
    <h3 className="font-bold text-lg mb-2">{title}</h3>
    <p className="text-sm text-gray-500">{desc}</p>
  </div>
);

const FaqItem = ({ q, a }: { q: string, a: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button 
        className="w-full flex justify-between items-center py-5 text-left group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`font-medium transition-colors ${isOpen ? 'text-orange-600' : 'text-gray-900'}`}>{q}</span>
        <div className={`p-1 rounded-full transition-all duration-300 ${isOpen ? 'bg-orange-100 text-orange-600 rotate-45' : 'text-gray-400'}`}>
          <Plus size={16} />
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 opacity-100 mb-5' : 'max-h-0 opacity-0'}`}>
        <p className="text-sm text-gray-500 leading-relaxed pr-8">{a}</p>
      </div>
    </div>
  );
};

// --- Main Page ---

export const AmazonServicesPage: React.FC = () => {
  return (
    <div className="bg-white pt-20 overflow-x-hidden font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative py-16 md:py-24 container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <FadeIn>
              <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-700 border border-orange-100 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-6">
                <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" /> Amazon Creative Studio
              </div>
              <h1 className="text-5xl md:text-7xl font-serif font-bold leading-[1.1] mb-6 text-gray-900">
                All the content you need to sell on <span className="text-orange-500 underline decoration-4 underline-offset-4">Amazon</span>
              </h1>
              <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-lg">
                Product photos, A+ modules, and videos that follow every Amazon guideline (1600–2000px, pure white background, correct naming, perfect cropping).
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/start-project"><Button variant="primary" size="lg" className="w-full sm:w-auto">Get Started</Button></Link>
                <a href="#pricing"><Button variant="outline" size="lg" className="w-full sm:w-auto">See Packages</Button></a>
              </div>
            </FadeIn>
          </div>
          <div className="order-1 lg:order-2 relative">
            <FadeIn direction="left" delay={200}>
              <div className="relative z-10 grid grid-cols-2 gap-4">
                 <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop" className="rounded-2xl shadow-lg w-full aspect-square object-cover bg-white" alt="Product on White" />
                 <img src="https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=600&auto=format&fit=crop" className="rounded-2xl shadow-lg w-full aspect-[4/5] object-cover bg-white translate-y-8" alt="Cosmetics" />
                 <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-xl border border-gray-100 hidden md:block animate-bounce-slow">
                    <p className="text-xs font-bold text-gray-400 uppercase">Compliance Check</p>
                    <div className="flex items-center gap-2 mt-1 text-green-600 font-bold text-sm">
                        <CheckCircle2 size={16} /> 2000x2000px Ready
                    </div>
                 </div>
              </div>
              {/* Decorative Blob */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-orange-100/50 rounded-full blur-3xl -z-10" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 2. BENEFIT COLUMNS */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FadeIn delay={0}>
                    <BenefitCard 
                        icon={Clock}
                        title="Save time"
                        text="Upload your product → we shoot → you receive final Amazon-ready assets in days, not weeks."
                    />
                </FadeIn>
                <FadeIn delay={100}>
                    <BenefitCard 
                        icon={ShieldCheck}
                        title="Stay Compliant"
                        text="Every image meets size, background, cropping, and file-naming rules so your listing always gets approved."
                    />
                </FadeIn>
                <FadeIn delay={200}>
                    <BenefitCard 
                        icon={TrendingUp}
                        title="Sell more on Amazon"
                        text="Better visuals mean higher conversion, fewer returns, and stronger brand trust."
                    />
                </FadeIn>
            </div>
        </div>
      </section>

      {/* 3. SOCIAL PROOF STRIP */}
      <div className="border-y border-gray-200 bg-white py-10 overflow-hidden">
          <div className="container mx-auto px-6 text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">Trusted by 20k+ Amazon Brands</p>
              <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 grayscale">
                  <h3 className="text-2xl font-serif font-bold">TB12</h3>
                  <h3 className="text-2xl font-bold tracking-tighter">Unilever</h3>
                  <h3 className="text-2xl font-serif italic font-bold">Anheuser-Busch</h3>
                  <h3 className="text-2xl font-bold tracking-widest">LAND O'LAKES, INC.</h3>
                  <h3 className="text-2xl font-sans font-light">Uber</h3>
              </div>
          </div>
      </div>

      {/* 4. CASE STUDY BAND */}
      <section className="py-24 bg-[#FBF8F5]">
          <div className="container mx-auto px-6 md:px-12">
              <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-12 items-center">
                  <div className="lg:w-1/2">
                      <SectionTag color="text-orange-600">Case Study</SectionTag>
                      <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Listing Insights drives performance for Field Company</h2>
                      <p className="text-gray-500 mb-8 text-lg leading-relaxed">
                          By refreshing their main hero images to be perfectly compliant and adding rich lifestyle A+ content, Field Company saw a dramatic lift in their organic rank and conversion rate.
                      </p>
                      <div className="grid grid-cols-3 gap-4">
                          <div>
                              <p className="text-3xl font-bold text-blue-600">+23%</p>
                              <p className="text-xs font-bold text-gray-400 uppercase">Conversion</p>
                          </div>
                          <div>
                              <p className="text-3xl font-bold text-blue-600">+17%</p>
                              <p className="text-xs font-bold text-gray-400 uppercase">Sales</p>
                          </div>
                          <div>
                              <p className="text-3xl font-bold text-blue-600">-12%</p>
                              <p className="text-xs font-bold text-gray-400 uppercase">Returns</p>
                          </div>
                      </div>
                  </div>
                  <div className="lg:w-1/2 relative">
                       <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                           <img src="https://images.unsplash.com/photo-1615220237773-e9368a2014a2?q=80&w=1000" alt="Case Study" className="w-full h-full object-cover" />
                           <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-lg shadow-sm">
                               <p className="text-xs font-bold text-gray-900">Field Company Skillet</p>
                           </div>
                       </div>
                  </div>
              </div>
          </div>
      </section>

      {/* 5. SERVICES GRID */}
      <section className="py-24 container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Everything You Need</h2>
              <p className="text-gray-500">A complete suite of visual services for Amazon sellers.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FadeIn delay={0}><ServiceCard icon={Layout} title="Amazon A+ Content" desc="Module banners, comparison charts, and feature highlights designed to convert." /></FadeIn>
              <FadeIn delay={50}><ServiceCard icon={Camera} title="Product-on-White" desc="Pure white background, 1600–2000px, 85% product fill to meet all requirements." /></FadeIn>
              <FadeIn delay={100}><ServiceCard icon={ImageIcon} title="Lifestyle" desc="Real-world settings, props, and context to show your product in use." /></FadeIn>
              <FadeIn delay={150}><ServiceCard icon={User} title="On-Figure Models" desc="Professional models for apparel, accessories, and beauty products." /></FadeIn>
              <FadeIn delay={200}><ServiceCard icon={Box} title="Oversize & Furniture" desc="Large products shot with scale, clarity, and proper lighting." /></FadeIn>
              <FadeIn delay={250}><ServiceCard icon={FileText} title="Infographics" desc="Text overlays, dimension callouts, and before/after layouts." /></FadeIn>
          </div>
      </section>

      {/* 6. PRICING */}
      <section id="pricing" className="py-24 bg-gray-50">
          <div className="container mx-auto px-6 md:px-12">
              <div className="text-center mb-16">
                  <SectionTag>Packages</SectionTag>
                  <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Simple, Transparent Pricing</h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start max-w-6xl mx-auto">
                  <FadeIn delay={0}>
                      <PricingCard 
                          title="Amazon 360 spin video pack"
                          price="$261"
                          features={["30 second video clip", "Music and text overlay", "Up to 1 product", "High-res export"]}
                          cta="Book this pack"
                      />
                  </FadeIn>
                  <FadeIn delay={100}>
                      <PricingCard 
                          title="Amazon A+ basic pack"
                          price="$629"
                          features={["8 photos", "5 pre-designed infographics", "1 full body model", "Layout recommendations"]}
                          cta="Book this pack"
                          recommended
                      />
                  </FadeIn>
                  <FadeIn delay={200}>
                      <PricingCard 
                          title="Amazon A+ premium pack"
                          price="$999"
                          features={["6 photos + 4 infographics", "30 second video edit", "Music + Full body model", "Advanced retouching"]}
                          cta="Book this pack"
                      />
                  </FadeIn>
              </div>
              <div className="mt-12 text-center">
                  <Link to="/pricing" className="text-sm font-bold text-gray-900 border-b-2 border-black pb-1 hover:text-orange-600 hover:border-orange-600 transition-all">VIEW ALL PACKS</Link>
              </div>
          </div>
      </section>

      {/* 7. AI INSIGHTS */}
      <section className="py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12">
              <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 uppercase tracking-tighter">AI-POWERED INSIGHTS <br/> FOR AMAZON SELLERS</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <FadeIn delay={0}><FeatureHighlight title="get your soona score" desc="receive targeted opportunities that pinpoint how to improve your listings and your store sales." badge="47/75 Score" /></FadeIn>
                 <FadeIn delay={100}><FeatureHighlight title="see how you stack up" desc="instantly compare your product listings against technical specs & industry (or category) leaders." badge="Benchmarks" /></FadeIn>
                 <FadeIn delay={200}><FeatureHighlight title="compare the competition" desc="identify competitors of your choice and the visual opportunities that give you an edge." badge="Analysis" /></FadeIn>
              </div>

              <div className="mt-12 text-center">
                  <Button variant="primary" size="lg" className="bg-orange-500 hover:bg-orange-600 border-orange-500 text-white">Get started</Button>
              </div>
          </div>
      </section>

      {/* 8. TESTIMONIAL */}
      <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-6 text-center">
              <FadeIn>
                  <h2 className="text-4xl font-serif font-bold text-gray-900 mb-8">DON'T TAKE OUR <br/> WORD FOR IT</h2>
                  <div className="bg-white p-10 md:p-16 rounded-3xl shadow-xl max-w-4xl mx-auto border border-gray-100">
                      <div className="mb-6 flex justify-center">
                         <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Crocs_Logo.svg/2560px-Crocs_Logo.svg.png" alt="Crocs" className="h-8 object-contain opacity-80" />
                      </div>
                      <p className="text-xl md:text-2xl font-medium text-gray-800 mb-8 leading-relaxed">
                          "from adjusting shoot schedules to incorporating last-minute changes seamlessly, their flexibility makes the entire process stress-free! true life-savers!"
                      </p>
                      <p className="text-sm font-bold uppercase tracking-widest text-gray-400">siera</p>
                  </div>
                  <div className="mt-12">
                      <Button variant="primary" className="bg-orange-500 hover:bg-orange-600 border-orange-500 text-white">Get started</Button>
                  </div>
              </FadeIn>
          </div>
      </section>

      {/* 9. FAQ + FINAL CTA */}
      <section className="py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12">
              <div className="max-w-3xl mx-auto">
                  <h2 className="text-3xl font-serif font-bold mb-8 text-center">Common Questions</h2>
                  <div className="space-y-4 mb-16">
                      <FaqItem q="What do you need from me before the shoot?" a="We need your product shipped to our studio and a brief description of your vision. Our AI tools can help you generate a brief in minutes." />
                      <FaqItem q="How long does delivery take?" a="Standard turnaround is 5-7 business days from when we receive your product. Rush options (48 hours) are available." />
                      <FaqItem q="Do you guarantee Amazon compliance?" a="Yes. All 'Amazon Pack' assets are guaranteed to meet Amazon's technical requirements for zoom, size, and white background." />
                      <FaqItem q="Can you work with FBA and brand registry?" a="Absolutely. We understand FBA packaging requirements and A+ Content modules available to Brand Registered sellers." />
                  </div>
                  
                  <div className="bg-black text-white rounded-[2rem] p-12 text-center relative overflow-hidden">
                      <div className="relative z-10">
                          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Ready to upgrade your Amazon content?</h2>
                          <Link to="/start-project"><Button variant="white" size="lg">Get Started Now</Button></Link>
                      </div>
                      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full blur-[100px] opacity-40 -mr-20 -mt-20 pointer-events-none" />
                  </div>
              </div>
          </div>
      </section>

      {/* 10. FOOTER NEWSLETTER */}
      <div className="bg-gray-800 text-white py-12">
          <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                  <h3 className="font-serif font-bold text-2xl italic">the checkout</h3>
                  <p className="text-gray-400 text-sm">join 50k brands reading the checkout for creative & conversion crushing insights</p>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                  <Input placeholder="Email*" className="bg-white text-black h-10 text-sm" />
                  <Button className="bg-orange-500 border-orange-500 hover:bg-orange-600 text-white h-auto">Sign up</Button>
              </div>
          </div>
      </div>

    </div>
  );
};
