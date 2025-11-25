
import React, { useState } from 'react';
import { Mail, Phone, MapPin, HelpCircle, CheckCircle2, ChevronDown } from 'lucide-react';
import { Button } from '../../components/Button';
import { FadeIn } from '../../components/FadeIn';
import { SectionTag } from '../../components/SectionTag';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'hello@fashionos.com',
      desc: 'For general inquiries and support.',
      action: 'mailto:hello@fashionos.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+1 (555) 123-4567',
      desc: 'Mon-Fri, 9am-6pm EST.',
      action: 'tel:+15551234567'
    },
    {
      icon: MapPin,
      title: 'Office',
      value: 'New York, NY',
      desc: '123 Fashion Ave, Suite 400.',
      action: '#'
    }
  ];

  const faqs = [
    { q: "What services do you offer?", a: "We offer photography, video production, web design, and social media management specifically tailored for fashion brands." },
    { q: "How do I book a shoot?", a: "You can use our booking wizard on the dashboard or contact us directly here for a custom quote." },
    { q: "Do you work internationally?", a: "Yes, we have teams in New York, London, and Medellín, and can travel for specific campaigns." }
  ];

  return (
    <div className="pt-20 pb-20 bg-white min-h-screen font-sans text-fashion-black">
      {/* Hero */}
      <section className="container mx-auto px-6 md:px-12 py-12 md:py-24 text-center">
        <FadeIn>
          <SectionTag>Get in Touch</SectionTag>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 tracking-tight">
            Let's Create Something <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">Amazing.</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Have a project in mind? We'd love to hear from you. Send us a message and we'll get back to you within 24 hours.
          </p>
        </FadeIn>
      </section>

      {/* Contact Grid */}
      <section className="container mx-auto px-6 md:px-12 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left: Form */}
          <div className="lg:col-span-2">
            <FadeIn delay={100}>
              <div className="bg-gray-50 rounded-[2rem] p-8 md:p-12 border border-gray-100">
                {isSuccess ? (
                  <div className="text-center py-20">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-3xl font-serif font-bold mb-4">Message Sent!</h3>
                    <p className="text-gray-500 mb-8">Thank you for reaching out. We'll be in touch shortly.</p>
                    <Button variant="outline" onClick={() => setIsSuccess(false)}>Send Another</Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <h3 className="text-2xl font-serif font-bold mb-6">Send a Message</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Name</label>
                        <input 
                          required
                          type="text" 
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-100 transition-all"
                          placeholder="Jane Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Email</label>
                        <input 
                          required
                          type="email" 
                          value={formData.email}
                          onChange={e => setFormData({...formData, email: e.target.value})}
                          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-100 transition-all"
                          placeholder="jane@brand.com"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Subject</label>
                      <div className="relative">
                        <select 
                          value={formData.subject}
                          onChange={e => setFormData({...formData, subject: e.target.value})}
                          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-100 transition-all appearance-none cursor-pointer"
                        >
                          <option>General Inquiry</option>
                          <option>Project Proposal</option>
                          <option>Partnership</option>
                          <option>Careers</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                          <ChevronDown size={16} />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Message</label>
                      <textarea 
                        required
                        value={formData.message}
                        onChange={e => setFormData({...formData, message: e.target.value})}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-purple-100 transition-all"
                        placeholder="Tell us about your project..."
                      />
                    </div>

                    <div className="pt-2">
                      <Button 
                        variant="primary" 
                        size="lg" 
                        className="w-full md:w-auto px-12"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? <><LoadingSpinner size={16} className="mr-2" /> Sending...</> : 'Send Message'}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </FadeIn>
          </div>

          {/* Right: Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            {contactInfo.map((info, i) => (
              <FadeIn key={i} delay={200 + (i * 100)}>
                <a 
                  href={info.action}
                  className="block bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-purple-100 transition-all group"
                >
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-400 group-hover:bg-purple-50 group-hover:text-purple-600 transition-colors">
                    <info.icon size={24} />
                  </div>
                  <h3 className="font-bold text-lg mb-1">{info.title}</h3>
                  <p className="text-lg text-purple-600 font-serif font-bold mb-2">{info.value}</p>
                  <p className="text-sm text-gray-500">{info.desc}</p>
                </a>
              </FadeIn>
            ))}

            {/* Map Placeholder */}
            <FadeIn delay={500}>
              <div className="h-64 bg-gray-100 rounded-2xl border border-gray-200 flex items-center justify-center relative overflow-hidden group">
                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=600')] bg-cover bg-center opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700"></div>
                 <div className="relative z-10 flex flex-col items-center gap-2">
                    <div className="bg-white/90 backdrop-blur px-6 py-3 rounded-full text-sm font-bold shadow-sm">
                        Visit our NYC Studio
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600 bg-white/80 px-2 py-1 rounded-md">Map coming soon</span>
                 </div>
              </div>
            </FadeIn>
          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-6 md:px-12 border-t border-gray-100 pt-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <SectionTag>FAQ</SectionTag>
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Common Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-sm transition-shadow">
                  <h4 className="font-bold text-lg mb-2 flex items-start gap-3">
                    <HelpCircle size={20} className="text-purple-500 mt-1 shrink-0" />
                    {faq.q}
                  </h4>
                  <p className="text-gray-500 ml-8 leading-relaxed">{faq.a}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
