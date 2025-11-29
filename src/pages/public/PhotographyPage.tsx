import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Camera, Zap, Sparkles, ShoppingBag, CheckCircle2, 
  Star, Layers, Video, ArrowRight
} from 'lucide-react';
import { Button } from '../../components/Button';
import { FadeIn } from '../../components/FadeIn';
import { SectionTag } from '../../components/SectionTag';
import { ContactForm } from '../../components/forms/ContactForm';

// --- Sub-Components ---

const FeatureCard = ({ icon: Icon, title, text }: { icon: any, title: string, text: string }) => (
  <div className="p-8 bg-white rounded-2xl border border-gray-100 hover:shadow-xl hover:border-fashion-purple/20 transition-all duration-300 group h-full">
    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-fashion-black group-hover:text-white transition-colors">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-serif font-bold mb-3">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed">{text}</p>
  </div>
);

// --- Main Page Component ---

export const PhotographyPage: React.FC = () => {
  return (
    <div className="bg-[#FBF8F5] pt-20 overflow-x-hidden text-fashion-black">
      
      {/* 1. HERO SECTION */}
      <section className="pt-12 pb-20 md:pt-24 md:pb-32 container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <FadeIn>
              <h1 className="text-5xl md:text-7xl font-serif font-bold leading-[1.05] mb-6">
                Product <br/>
                Photography <br/>
                & Video for <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-orange-500">Modern Brands.</span>
              </h1>
              <p className="text-lg text-gray-500 leading-relaxed mb-10 max-w-md">
                Premium product visuals, crafted to elevate brands and boost conversions. From e-commerce packshots to high-end editorial campaigns.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact"><Button variant="primary" size="lg">Book a Photoshoot</Button></Link>
                <Link to="/directory"><Button variant="outline" size="lg">View Portfolio</Button></Link>
              </div>
            </FadeIn>
          </div>
          
          {/* Hero Collage */}
          <div className="lg:col-span-7 order-1 lg:order-2 relative">
             <FadeIn direction="left" delay={200}>
               <div className="grid grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-4 md:space-y-6 translate-y-12">
                     <img src="https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=800&auto=format&fit=crop" alt="Cosmetics" className="w-full aspect-[4/5] object-cover rounded-2xl shadow-2xl" loading="lazy" />
                     <img src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop" alt="Footwear" className="w-full aspect-square object-cover rounded-2xl shadow-xl" loading="lazy" />
                  </div>
                  <div className="space-y-4 md:space-y-6">
                     <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop" alt="Watch" className="w-full aspect-square object-cover rounded-2xl shadow-xl" loading="lazy" />
                     <img src="https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=800&auto=format&fit=crop" alt="Perfume" className="w-full aspect-[4/5] object-cover rounded-2xl shadow-2xl" loading="lazy" />
                  </div>
               </div>
             </FadeIn>
          </div>
        </div>
      </section>

      {/* 2. FEATURE GALLERY STRIP */}
      <section className="w-full overflow-hidden bg-white border-y border-gray-100 py-12">
        <div className="flex gap-8 animate-scroll hover:pause px-6">
           {[
             "https://images.unsplash.com/photo-1596462502278-27bfdd403348?q=80&w=300&h=300&fit=crop",
             "https://images.unsplash.com/photo-1571781348782-f2c426809196?q=80&w=300&h=300&fit=crop",
             "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=300&h=300&fit=crop",
             "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=300&h=300&fit=crop",
             "https://images.unsplash.com/photo-1627384113743-6e02db2161ae?q=80&w=300&h=300&fit=crop",
             "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=300&h=300&fit=crop",
             "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=300&h=300&fit=crop",
             "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=300&h=300&fit=crop"
           ].map((src, i) => (
             <div key={i} className="flex-none w-48 h-48 rounded-xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer">
               <img src={src} className="w-full h-full object-cover" alt="Product thumbnail" loading="lazy" />
             </div>
           ))}
        </div>
      </section>

      {/* 3. EXCEPTIONAL IMAGERY */}
      <section className="py-24 container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2">
            <FadeIn>
              <SectionTag>Quality First</SectionTag>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">Exceptional imagery.<br/>Every time.</h2>
              <p className="text-gray-500 text-lg mb-6 leading-relaxed">
                 As London & New York's primary professional <strong>product photography studio</strong>, we deliver outstanding images with an unrivaled level of service. 
                 FashionOS Studios is regularly trusted to shoot for many of the world's foremost brands.
              </p>
              <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                 We love what we do and it shows. Our passion is delivering great work, on-time and on budget. We make the process easy, maintaining high industry standards that ensure we align with your brand guidelines.
              </p>
              <Button variant="outline">Learn About Our Process</Button>
            </FadeIn>
          </div>
          <div className="lg:w-1/2">
            <FadeIn direction="left">
               <div className="grid grid-cols-2 gap-4">
                  <img src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=600" className="w-full h-64 object-cover rounded-2xl" alt="Detail 1" loading="lazy" />
                  <img src="https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?q=80&w=600" className="w-full h-64 object-cover rounded-2xl translate-y-8" alt="Detail 2" loading="lazy" />
                  <img src="https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?q=80&w=600" className="w-full h-64 object-cover rounded-2xl" alt="Detail 3" loading="lazy" />
                  <img src="https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=600" className="w-full h-64 object-cover rounded-2xl translate-y-8" alt="Detail 4" loading="lazy" />
               </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 4. STUDIO TRUST */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-20">
             <div className="lg:w-1/2 order-2 lg:order-1">
                <FadeIn>
                   <div className="relative rounded-[2rem] overflow-hidden aspect-[3/4] shadow-2xl">
                      <img src="https://images.unsplash.com/photo-1472289065668-ce650ac443d2?q=80&w=1000" className="w-full h-full object-cover" alt="Studio Camera" loading="lazy" />
                      <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur p-6 rounded-2xl">
                         <div className="flex items-center gap-4">
                            <div className="bg-black text-white p-3 rounded-full"><Camera size={20} /></div>
                            <div>
                                <p className="font-bold text-lg">Phase One IQ4</p>
                                <p className="text-xs text-gray-500 uppercase tracking-widest">150MP Resolution</p>
                            </div>
                         </div>
                      </div>
                   </div>
                </FadeIn>
             </div>
             <div className="lg:w-1/2 order-1 lg:order-2">
                <FadeIn direction="left">
                   <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">A studio you can trust.</h2>
                   <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                      We offer a full content creation service, from production to delivery. We're "fully stacked", so we have in-house product photographers, stylists, art directors, and top retouchers.
                   </p>
                   <ul className="space-y-4 mb-10">
                      {[
                        "Dedicated Art Directors for every shoot",
                        "High-end Phase One camera systems",
                        "24-hour rush delivery available",
                        "Secure product storage & insurance"
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3">
                           <CheckCircle2 className="text-fashion-purple" size={20} />
                           <span className="font-medium text-gray-700">{item}</span>
                        </li>
                      ))}
                   </ul>
                </FadeIn>
             </div>
          </div>
        </div>
      </section>

      {/* 5. VIBRANT GALLERY */}
      <section className="py-4 bg-black overflow-hidden">
         <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
            {[
               "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=600", // Bold cosmetics
               "https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=600", // Neon shoes
               "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600", // Headphones
               "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=600"  // Sunglasses
            ].map((src, i) => (
               <div key={i} className="aspect-square relative group overflow-hidden">
                  <img src={src} alt="Vibrant" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100" loading="lazy" />
               </div>
            ))}
         </div>
      </section>

      {/* 6. EXPERIENCE */}
      <section className="py-24 bg-[#0a0a0a] text-white">
         <div className="container mx-auto px-6 md:px-12">
            <div className="flex flex-col lg:flex-row gap-20 items-center">
               <div className="lg:w-1/2">
                  <FadeIn>
                     <div className="inline-block bg-white text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Since 2004</div>
                     <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8">20+ years in the <br/> Industry.</h2>
                     <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                        Our long-standing product photography team understands the need to take time to examine your product to work out exactly how best to light it. Unlike many other studios, we specifically and individually light your products to achieve the best results.
                     </p>
                     <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                        Over many years of trading, we have continually worked with many premium brands, including ASOS, Selfridges, TK Maxx, House of Fraser and Dover Street Market.
                     </p>
                     <div className="flex gap-8">
                        <div>
                           <span className="block text-4xl font-bold text-fashion-purple mb-1">15k+</span>
                           <span className="text-xs text-gray-500 uppercase tracking-widest">Projects Delivered</span>
                        </div>
                        <div>
                           <span className="block text-4xl font-bold text-fashion-purple mb-1">850+</span>
                           <span className="text-xs text-gray-500 uppercase tracking-widest">Clients Worldwide</span>
                        </div>
                     </div>
                  </FadeIn>
               </div>
               <div className="lg:w-1/2">
                  <FadeIn direction="left">
                     <img src="https://images.unsplash.com/photo-1533750349088-cd8773a6575c?q=80&w=1000" alt="Red Shoe" className="rounded-lg shadow-2xl" loading="lazy" />
                  </FadeIn>
               </div>
            </div>
         </div>
      </section>

      {/* 7. ECOMMERCE PACKAGE */}
      <section className="py-24 bg-white">
         <div className="container mx-auto px-6 md:px-12">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
               <div className="lg:w-1/2">
                   <FadeIn>
                      <div className="grid grid-cols-2 gap-4">
                         <img src="https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=600" className="bg-gray-50 rounded-xl" alt="Packshot 1" loading="lazy" />
                         <img src="https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=600" className="bg-gray-50 rounded-xl" alt="Packshot 2" loading="lazy" />
                      </div>
                   </FadeIn>
               </div>
               <div className="lg:w-1/2">
                  <FadeIn direction="left">
                     <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Ecommerce Product Photography.</h2>
                     <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                        If you require clean, high-end catalogue images for online, print, or PR purposes, consider trying our e-commerce photography service.
                     </p>
                     <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                        High-quality images are not a luxury but a necessity when it comes to driving online sales. Therefore, it's crucial to select a studio that consistently delivers top-notch images.
                     </p>
                     <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-8">
                        <h4 className="font-bold mb-4">Standard Package Includes:</h4>
                        <div className="grid grid-cols-2 gap-3">
                           {["Pure white background", "Colour correction", "Basic retouching", "Web & Print formats", "Invisible Mannequin", "24h proof turnaround"].map((item, i) => (
                              <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                                 <div className="w-1.5 h-1.5 bg-fashion-purple rounded-full" /> {item}
                              </div>
                           ))}
                        </div>
                     </div>
                     <Button variant="primary">Get a Quote Today</Button>
                  </FadeIn>
               </div>
            </div>
         </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="py-24 bg-fashion-black text-white border-y border-white/10">
         <div className="container mx-auto px-6 md:px-12 text-center max-w-4xl">
            <FadeIn>
               <div className="text-fashion-purple text-6xl font-serif mb-6">"</div>
               <h3 className="text-2xl md:text-4xl font-serif italic leading-relaxed mb-10">
                  We've happily worked with Blend for a couple of seasons. The quality of their photography is something we value extremely highly. Flexible, accommodating, and thoughtful.
               </h3>
               <div>
                  <p className="font-bold text-lg">MICHAEL WHEELER</p>
                  <p className="text-gray-500 text-xs uppercase tracking-widest">CEO, F1 Branded Merchandising</p>
               </div>
            </FadeIn>
         </div>
      </section>

      {/* 9. BENEFITS */}
      <section className="py-24 bg-white">
         <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               <FadeIn delay={0}><FeatureCard icon={Layers} title="Consistency" text="It's fundamental that all your photographs look consistent in quality, across all channels, every season." /></FadeIn>
               <FadeIn delay={100}><FeatureCard icon={Sparkles} title="Boost Image" text="Using exceptional images across your marketing collateral shows your customers you don't compromise on quality." /></FadeIn>
               <FadeIn delay={200}><FeatureCard icon={ShoppingBag} title="Improve Sales" text="Great images have been proven to drive up sales and increase profit. Customers are naturally drawn to content." /></FadeIn>
               <FadeIn delay={300}><FeatureCard icon={Video} title="Enhance Media" text="With social media platforms bigger than ever before, it's vital you have the right content to advertise your products." /></FadeIn>
            </div>
         </div>
      </section>

      {/* 10. TRUSTED BY */}
      <section className="py-16 bg-black text-white overflow-hidden">
         <div className="container mx-auto px-6 md:px-12">
            <p className="text-center text-gray-500 text-xs uppercase tracking-widest mb-10 font-bold">Trusted by Leading Brands</p>
            <div className="flex flex-wrap justify-center gap-12 md:gap-20 grayscale opacity-60">
               {/* Text Placeholders for Logos */}
               <span className="text-2xl font-bold font-serif">VOGUE</span>
               <span className="text-2xl font-bold tracking-widest">CHANEL</span>
               <span className="text-2xl font-bold font-mono">Cartier</span>
               <span className="text-2xl font-bold italic">Revlon</span>
               <span className="text-2xl font-bold tracking-tighter">NIKE</span>
               <span className="text-2xl font-bold font-serif">Sephora</span>
            </div>
         </div>
      </section>

      {/* 11. CREATIVE ADD-ONS */}
      <section className="py-24 bg-[#FBF8F5]">
         <div className="container mx-auto px-6 md:px-12">
            <div className="bg-white rounded-[3rem] overflow-hidden shadow-xl flex flex-col md:flex-row">
               <div className="md:w-1/2 p-12 md:p-20 flex flex-col justify-center">
                  <SectionTag>Go Beyond</SectionTag>
                  <h2 className="text-4xl font-serif font-bold mb-6">Need something <br/>a little more creative?</h2>
                  <p className="text-gray-500 text-lg mb-8">
                     Looking for unique photography that's tailored to you and your brand? 
                     Our still life photography service gives you the freedom to style your products however you like, with the option of incorporating props and interesting backgrounds.
                  </p>
                  <ul className="space-y-3 mb-10">
                     {["Stop-motion video", "Hand models & casting", "Custom set builds", "Location scouting"].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                           <div className="w-1.5 h-1.5 bg-fashion-purple rounded-full" /> {item}
                        </li>
                     ))}
                  </ul>
                  <div><Button variant="primary" size="lg">Ask for a Custom Shoot</Button></div>
               </div>
               <div className="md:w-1/2 relative min-h-[400px]">
                  <img src="https://images.unsplash.com/photo-1563170351-be82bc888aa4?q=80&w=800" alt="Creative" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
               </div>
            </div>
         </div>
      </section>

      {/* 12. CONTACT FORM */}
      <section className="py-24 bg-gray-50">
         <div className="container mx-auto px-6 md:px-12">
            <div className="max-w-3xl mx-auto">
               <ContactForm 
                 title="Get a Quote" 
                 subtitle="Tell us about your product photography needs." 
                 serviceType="Photography"
               />
            </div>
         </div>
      </section>

      {/* 13. CTA BLOCK */}
      <section className="py-24 bg-white text-center">
         <div className="container mx-auto px-6 md:px-12">
            <FadeIn>
               <h2 className="text-5xl font-serif font-bold mb-6">Want to really stand out?</h2>
               <p className="text-gray-500 text-xl mb-10 max-w-2xl mx-auto">
                  Nothing catches the eye quite like a moving image — and our striking GIFs cater to even the most creative of visions.
               </p>
               <Button variant="outline" size="lg">Get Started</Button>
            </FadeIn>
         </div>
      </section>

      {/* 14. BTS GALLERY */}
      <section className="py-24 bg-[#FBF8F5]">
         <div className="container mx-auto px-6 md:px-12">
            <div className="mb-12">
               <h2 className="text-3xl font-serif font-bold">Behind the scenes.</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
               {[
                  "https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?q=80&w=400",
                  "https://images.unsplash.com/photo-1588483977959-53b38b666596?q=80&w=400",
                  "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=400",
                  "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=400",
                  "https://images.unsplash.com/photo-1603322199363-14380ec26311?q=80&w=400",
                  "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=400"
               ].map((src, i) => (
                  <div key={i} className="rounded-sm overflow-hidden aspect-square grayscale hover:grayscale-0 transition-all duration-500">
                     <img src={src} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="BTS" loading="lazy" />
                  </div>
               ))}
            </div>
         </div>
      </section>
      
    </div>
  );
};