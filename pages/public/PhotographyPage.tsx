import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Camera, Zap, Sparkles, ShoppingBag, CheckCircle2, 
  Star, Scissors, Layers, Aperture, Wand2, MapPin
} from 'lucide-react';
import { Button } from '../../components/Button';
import { FadeIn } from '../../components/FadeIn';
import { SectionTag } from '../../components/SectionTag';

// --- Sub-Components ---

const ServiceCard: React.FC<{
  title: string;
  desc: string;
  image: string;
}> = ({ title, desc, image }) => (
  <div className="group cursor-pointer h-full flex flex-col">
    <div className="overflow-hidden rounded-lg mb-4 relative aspect-[4/5]">
      <img 
        src={image} 
        alt={title} 
        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
    </div>
    <h3 className="font-serif font-bold text-xl mb-2 group-hover:text-fashion-purple transition-colors">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
  </div>
);

const PricingCard: React.FC<{
  title: string;
  price: string;
  features: string[];
  highlight?: boolean;
}> = ({ title, price, features, highlight = false }) => (
  <div className={`p-8 rounded-2xl border transition-all duration-300 flex flex-col h-full ${highlight ? 'border-fashion-purple shadow-xl bg-white relative overflow-hidden transform md:-translate-y-4' : 'border-gray-100 bg-gray-50 hover:border-gray-200'}`}>
    {highlight && (
      <div className="absolute top-0 right-0 bg-fashion-purple text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
        Most Popular
      </div>
    )}
    <div className="mb-6">
      <h3 className="font-serif font-bold text-2xl mb-2">{title}</h3>
      <p className={`text-3xl font-bold ${highlight ? 'text-fashion-purple' : 'text-gray-900'}`}>{price}</p>
      {price !== "Contact for Pricing" && <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">per session</span>}
    </div>
    <ul className="space-y-4 mb-8 flex-1">
      {features.map((feat, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
          <CheckCircle2 size={16} className={`mt-0.5 shrink-0 ${highlight ? 'text-fashion-purple' : 'text-gray-400'}`} />
          {feat}
        </li>
      ))}
    </ul>
    <Button variant={highlight ? 'accent' : 'outline'} fullWidth>Book Now</Button>
  </div>
);

const ContactInput: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, ...props }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">{label}</label>
    <input 
      {...props}
      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-fashion-purple focus:ring-1 focus:ring-fashion-purple transition-all" 
    />
  </div>
);

// --- Main Page Component ---

export const PhotographyPage: React.FC = () => {
  return (
    <div className="bg-white pt-20 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="pt-12 pb-20 md:pt-24 md:pb-32 container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-5">
            <FadeIn>
              <SectionTag color="bg-purple-100 text-purple-600 px-2 py-1 rounded">AI-Powered Photography</SectionTag>
              <h1 className="text-5xl md:text-7xl font-serif font-bold leading-[1.1] mb-6 text-fashion-black">
                AI-Powered <br/>
                Fashion <br/>
                Photography <br/>
                in 48 Hours
              </h1>
              <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-md">
                High-impact visuals designed for designers, events, and campaigns. From concept to delivery, powered by intelligent workflows.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/dashboard"><Button variant="accent" size="lg">Book a Shoot</Button></Link>
                <Button variant="outline" size="lg">View Portfolio</Button>
              </div>
            </FadeIn>
          </div>
          
          {/* Image Grid */}
          <div className="lg:col-span-7">
             <FadeIn direction="left" delay={200}>
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4 translate-y-8">
                     <div className="bg-gray-100 rounded-2xl overflow-hidden aspect-[3/4]">
                        <img src="https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?q=80&w=800&auto=format&fit=crop" alt="Cosmetics" className="w-full h-full object-cover" />
                     </div>
                     <div className="bg-gray-100 rounded-2xl overflow-hidden aspect-square p-6 flex items-center justify-center bg-gradient-to-br from-blue-400 to-cyan-300">
                        <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600" alt="Product" className="w-32 h-32 object-contain drop-shadow-2xl mix-blend-multiply" />
                     </div>
                  </div>
                  <div className="space-y-4">
                     <div className="bg-gray-100 rounded-2xl overflow-hidden aspect-square p-6 flex items-center justify-center bg-gradient-to-br from-orange-400 to-yellow-300">
                        <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600" alt="Juice" className="w-32 h-32 object-contain drop-shadow-2xl" />
                     </div>
                     <div className="bg-gray-100 rounded-2xl overflow-hidden aspect-[3/4]">
                        <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop" alt="Model" className="w-full h-full object-cover" />
                     </div>
                  </div>
               </div>
             </FadeIn>
          </div>
        </div>
      </section>

      {/* 2. BENEFIT SECTION */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12">
           <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                 <FadeIn direction="right">
                   <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] bg-orange-400">
                      <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1000" alt="Splash" className="w-full h-full object-cover opacity-90" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                   </div>
                 </FadeIn>
              </div>
              <div className="lg:w-1/2">
                 <FadeIn>
                    <h2 className="text-5xl md:text-6xl font-serif font-bold mb-8">Catapult your sales.</h2>
                    <p className="text-gray-500 text-lg mb-6 leading-relaxed">
                       Professional <strong>eCommerce photography</strong> has been at the forefront of FashionOS services for years. 
                    </p>
                    <p className="text-gray-500 text-lg mb-6 leading-relaxed">
                       Working out of our studios in <strong>Medellín, Bogotá, and Cartagena</strong>, we create imagery for many top brands including major fashion labels and independent designers.
                    </p>
                    <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                       We understand the importance of delivering high quality, cost-effective product photography that will increase engagement and conversions for your brand.
                    </p>
                    <Button variant="primary" size="lg">Start a Project</Button>
                 </FadeIn>
              </div>
           </div>
        </div>
      </section>

      {/* 3. ECOM SECTION */}
      <section className="py-24">
         <div className="container mx-auto px-6 md:px-12">
            <div className="bg-gray-50 rounded-[3rem] p-8 md:p-20 flex flex-col lg:flex-row items-center gap-16 border border-gray-100 shadow-sm">
               <div className="lg:w-1/2 order-2 lg:order-1">
                  <FadeIn>
                     <h2 className="text-5xl font-serif font-bold mb-6 flex items-center gap-3">We <span className="text-purple-500 animate-pulse">♥</span> ecom.</h2>
                     <p className="text-gray-500 text-lg mb-6 leading-relaxed">
                        Our skilled photography and production team has been specializing in delivering digital imagery for years. We know what it takes, there's nothing we haven't shot.
                     </p>
                     <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                        From account handlers to our photographers and retouchers we never compromise on quality. Our friendly team will ensure your experience with us is smooth, efficient and above all successful.
                     </p>
                     <p className="font-bold text-lg border-l-4 border-fashion-purple pl-4">We let the quality of our images do the talking for us.</p>
                  </FadeIn>
               </div>
               <div className="lg:w-1/2 order-1 lg:order-2 relative">
                   <FadeIn direction="left">
                      <div className="grid grid-cols-2 gap-4">
                         <img src="https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=600" className="rounded-2xl shadow-lg transform -rotate-2 hover:rotate-0 transition-transform duration-500" alt="Product 1" />
                         <img src="https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=600" className="rounded-2xl shadow-lg transform rotate-3 translate-y-8 hover:rotate-0 transition-transform duration-500" alt="Product 2" />
                      </div>
                   </FadeIn>
               </div>
            </div>
         </div>
      </section>

      {/* 4. PORTFOLIO STRIP */}
      <section className="py-20 overflow-hidden">
         <div className="container mx-auto px-6 md:px-12 mb-12 flex flex-col md:flex-row justify-between items-end">
            <div>
               <SectionTag>Portfolio</SectionTag>
               <h2 className="text-4xl font-serif font-bold">Our Work</h2>
            </div>
            <Link to="/directory" className="text-sm font-bold uppercase tracking-widest border-b border-black pb-1 hidden md:block">View Full Portfolio</Link>
         </div>
         <div className="flex gap-4 overflow-x-auto pb-8 px-6 hide-scrollbar snap-x">
            {[
               "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600",
               "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=600",
               "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=600",
               "https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=600",
               "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=600",
               "https://images.unsplash.com/photo-1605763240004-7e93b172d754?q=80&w=600"
            ].map((src, i) => (
               <div key={i} className="min-w-[300px] md:min-w-[400px] aspect-[3/4] rounded-lg overflow-hidden snap-center cursor-pointer">
                  <img src={src} alt={`Portfolio ${i}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
               </div>
            ))}
         </div>
      </section>

      {/* 5. SERVICES GRID */}
      <section className="py-24 bg-gray-50">
         <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
               <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Our Ecommerce Services.</h2>
               <p className="text-gray-500 max-w-2xl mx-auto">Specialized photography workflows designed for high-volume and high-quality.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               <FadeIn delay={0}>
                  <ServiceCard 
                     title="Packshot Photography."
                     desc="Mainly used for brochures and online catalogues, we can supply your product shots beautifully on a white (or single-coloured) background."
                     image="https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=800"
                  />
               </FadeIn>
               <FadeIn delay={100}>
                  <ServiceCard 
                     title="On-Model Fashion."
                     desc="Our E-Commerce fashion photography is a good way if you want more investment and an uplift in sales. We find that on-model photography alongside invisible mannequins works best."
                     image="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800"
                  />
               </FadeIn>
               <FadeIn delay={200}>
                  <ServiceCard 
                     title="Creative | Still Life"
                     desc="Our creative still life photography provides you with bespoke visuals tailored to your brand. We often work with brand art directors but also able to assist and create mood boards."
                     image="https://images.unsplash.com/photo-1556228720-19de75d50e23?q=80&w=800"
                  />
               </FadeIn>
               <FadeIn delay={300}>
                  <ServiceCard 
                     title="AI-Enhanced Editing"
                     desc="Our AI post-production partner automatically tags, scores, and optimizes every image. Background replacement, color correction, and style consistency."
                     image="https://images.unsplash.com/photo-1550614000-4b9519e0013f?q=80&w=800"
                  />
               </FadeIn>
               <FadeIn delay={400}>
                  <ServiceCard 
                     title="eCommerce Apparel."
                     desc="Clothing Photography — be it ghost mannequins, flat lays, or accessories — we create images that are both technically proficient and beautifully styled."
                     image="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800"
                  />
               </FadeIn>
               <FadeIn delay={500}>
                  <ServiceCard 
                     title="eCommerce Jewellery."
                     desc="Professional Jewellery photography is something we love doing and pride ourselves on. Our in-house specialist jewellery photographer has the techniques and skills."
                     image="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800"
                  />
               </FadeIn>
            </div>
         </div>
      </section>

      {/* 6. AI PARTNER */}
      <section className="py-24 container mx-auto px-6 md:px-12">
         <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
               <FadeIn>
                  <div className="bg-purple-50 text-purple-600 px-4 py-2 rounded-full inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-6">
                     <Sparkles size={14} /> AI-Powered Studio
                  </div>
                  <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Your AI Post-Production Partner</h2>
                  <p className="text-gray-500 text-lg mb-8">
                     Every shoot is enhanced with our AI Studio — intelligent post-production that automatically tags, scores, and optimizes your images for maximum impact.
                  </p>
                  <ul className="space-y-4 mb-8">
                     <li className="flex items-center gap-3 text-gray-600">
                        <Zap size={18} className="text-purple-500" />
                        <span>Auto-tagging and smart categorization for instant organization</span>
                     </li>
                     <li className="flex items-center gap-3 text-gray-600">
                        <Wand2 size={18} className="text-purple-500" />
                        <span>Style scoring to identify your best-performing images</span>
                     </li>
                     <li className="flex items-center gap-3 text-gray-600">
                        <Scissors size={18} className="text-purple-500" />
                        <span>Background replacement and color correction in seconds</span>
                     </li>
                     <li className="flex items-center gap-3 text-gray-600">
                        <Layers size={18} className="text-purple-500" />
                        <span>Seamless integration with Cloudinary and Supabase gallery</span>
                     </li>
                  </ul>
                  <Button variant="accent">Try AI Studio</Button>
               </FadeIn>
            </div>
            <div className="lg:w-1/2">
               <FadeIn direction="left">
                  <div className="bg-black rounded-2xl overflow-hidden shadow-2xl aspect-video relative group">
                     <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000" alt="Camera" className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity" />
                     <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/10 backdrop-blur rounded-full flex items-center justify-center border border-white/20 shadow-lg group-hover:scale-110 transition-transform">
                           <Aperture className="text-white animate-spin-slow" size={32} />
                        </div>
                     </div>
                  </div>
               </FadeIn>
            </div>
         </div>
      </section>

      {/* 7. EXPERIENCE */}
      <section className="py-24 bg-gray-50">
         <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2">
               <FadeIn>
                  <div className="flex items-center gap-2 mb-4">
                     <Star className="text-yellow-500 fill-yellow-500" size={20} />
                     <span className="font-bold text-sm uppercase tracking-widest">Established 2005</span>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
                     With over 20 years of industry experience, our experienced team has shot for top brands.
                  </h2>
                  <p className="text-gray-500 text-lg leading-relaxed">
                     From Paris Fashion Week to Amazon product listings, we understand the visual language of sales. 
                     Our heritage is in traditional photography, but our future is digital.
                  </p>
               </FadeIn>
            </div>
            <div className="md:w-1/2">
               <FadeIn direction="left">
                  <img src="https://images.unsplash.com/photo-1542038784424-48dd95131591?q=80&w=1000" alt="Photographer" className="rounded-2xl shadow-xl w-full" />
               </FadeIn>
            </div>
         </div>
      </section>

      {/* 8. HOW WE WORK */}
      <section className="py-24 container mx-auto px-6 md:px-12">
         <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2">
               <FadeIn>
                  <h2 className="text-4xl font-serif font-bold mb-8">How we work.</h2>
                  <div className="space-y-8">
                     <div className="flex gap-4">
                        <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shrink-0 font-bold text-xl">1</div>
                        <div>
                           <h3 className="font-bold text-xl mb-2">Plan</h3>
                           <p className="text-gray-500">Creative briefing, moodboards, and shot lists. We ascertain all requirements including file sizes and delivery methods.</p>
                        </div>
                     </div>
                     <div className="flex gap-4">
                        <div className="w-12 h-12 bg-gray-100 text-black rounded-full flex items-center justify-center shrink-0 font-bold text-xl">2</div>
                        <div>
                           <h3 className="font-bold text-xl mb-2">Shoot</h3>
                           <p className="text-gray-500">Studio or location production with top talent. We strictly follow guidelines to ensure consistency across your content.</p>
                        </div>
                     </div>
                     <div className="flex gap-4">
                        <div className="w-12 h-12 bg-gray-100 text-black rounded-full flex items-center justify-center shrink-0 font-bold text-xl">3</div>
                        <div>
                           <h3 className="font-bold text-xl mb-2">Deliver</h3>
                           <p className="text-gray-500">Edited, optimized images in 48 hours. We never underestimate the administration and logistics of delivery.</p>
                        </div>
                     </div>
                  </div>
               </FadeIn>
            </div>
            <div className="md:w-1/2">
               <FadeIn direction="left">
                  <img src="https://images.unsplash.com/photo-1603322199363-14380ec26311?q=80&w=1000" alt="Camera Gear" className="rounded-2xl shadow-lg" />
               </FadeIn>
            </div>
         </div>
      </section>

      {/* 9. PRICING */}
      <section className="py-24 bg-gray-50">
         <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
               <h2 className="text-4xl font-serif font-bold mb-2">Simple Pricing</h2>
               <p className="text-gray-500">Choose the package that fits your needs</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
               <FadeIn delay={0}>
                  <PricingCard 
                     title="Starter"
                     price="Contact"
                     features={["AI-enhanced portraits", "Basic editing", "48-hour delivery", "Social media ready", "Online gallery"]}
                  />
               </FadeIn>
               <FadeIn delay={100}>
                  <PricingCard 
                     title="Pro"
                     price="Contact"
                     features={["Up to 50 edited images", "On-location or studio", "AI post-production", "E-commerce optimization", "Priority delivery"]}
                     highlight
                  />
               </FadeIn>
               <FadeIn delay={200}>
                  <PricingCard 
                     title="Elite"
                     price="Contact"
                     features={["Photo + video package", "Full-day shoot", "Unlimited edits", "Art direction included", "Rush 24h delivery"]}
                  />
               </FadeIn>
            </div>
         </div>
      </section>

      {/* 10. CONTACT FORM */}
      <section className="py-24 container mx-auto px-6 md:px-12">
         <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
               <h2 className="text-5xl font-serif font-bold mb-4">Get in Touch.</h2>
            </div>
            <form className="space-y-6 bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-gray-100">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ContactInput label="First Name*" placeholder="Jane" type="text" />
                  <ContactInput label="Last Name*" placeholder="Doe" type="text" />
               </div>
               <ContactInput label="Email*" placeholder="jane@brand.com" type="email" />
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ContactInput label="Company name" placeholder="Brand Studio Ltd" type="text" />
                  <ContactInput label="Project Type" placeholder="E-commerce / Campaign" type="text" />
               </div>
               <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Tell us about your project</label>
                  <textarea 
                     placeholder="Please provide us with details regarding quantities, scope, photography, and/or video."
                     className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-fashion-purple focus:ring-1 focus:ring-fashion-purple transition-all h-32 resize-none" 
                  />
               </div>
               <div className="pt-4 text-center">
                  <Button variant="accent" className="px-12 w-full md:w-auto">Submit Request</Button>
               </div>
            </form>
         </div>
      </section>

      {/* 11. BTS GALLERY */}
      <section className="py-24 bg-gray-50">
         <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
               <h2 className="text-4xl font-serif font-bold">Behind the scenes.</h2>
               <p className="text-gray-500 mt-2">See how we create the magic in studio.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               <div className="rounded-xl overflow-hidden aspect-square"><img src="https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?q=80&w=400" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" alt="BTS" /></div>
               <div className="rounded-xl overflow-hidden aspect-square"><img src="https://images.unsplash.com/photo-1588483977959-53b38b666596?q=80&w=400" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" alt="BTS" /></div>
               <div className="rounded-xl overflow-hidden aspect-square"><img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=400" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" alt="BTS" /></div>
               <div className="rounded-xl overflow-hidden aspect-square"><img src="https://images.unsplash.com/photo-1472289065668-ce650ac443d2?q=80&w=400" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" alt="BTS" /></div>
               <div className="rounded-xl overflow-hidden aspect-square"><img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=400" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" alt="BTS" /></div>
               <div className="rounded-xl overflow-hidden aspect-square"><img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca4?q=80&w=400" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" alt="BTS" /></div>
               <div className="rounded-xl overflow-hidden aspect-square"><img src="https://images.unsplash.com/photo-1563170351-be82bc888aa4?q=80&w=400" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" alt="BTS" /></div>
               <div className="rounded-xl overflow-hidden aspect-square"><img src="https://images.unsplash.com/photo-1550614000-4b9519e0013f?q=80&w=400" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" alt="BTS" /></div>
            </div>
         </div>
      </section>

    </div>
  );
};