
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X, HelpCircle, Plus, Minus, Sparkles } from 'lucide-react';
import { Button } from '../../components/Button';
import { FadeIn } from '../../components/FadeIn';
import { SectionTag } from '../../components/SectionTag';

// --- Types & Data ---

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  notIncluded?: string[];
  cta: string;
  popular?: boolean;
}

const PRICING_TIERS: PricingTier[] = [
  {
    name: 'Starter',
    price: '$0',
    description: 'Essential tools for emerging designers and freelancers.',
    features: [
      'Basic Public Profile',
      'Access to Talent Directory',
      'Create 1 Event Draft per month',
      '500MB Asset Storage',
      'Standard Support'
    ],
    notIncluded: [
      'AI Copilot Access',
      'Commission-free Bookings',
      'Custom Contracts',
      'Analytics Dashboard'
    ],
    cta: 'Get Started Free'
  },
  {
    name: 'Professional',
    price: '$49',
    description: 'Powering growth for established brands and agencies.',
    popular: true,
    features: [
      'Verified Pro Profile',
      'Unlimited Event Creation',
      'Full AI Copilot Access (Gemini 3)',
      '100GB Asset Storage',
      '0% Commission on Bookings',
      'Priority Support',
      'Advanced Analytics'
    ],
    cta: 'Start Free Trial'
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Tailored solutions for fashion houses and large organizations.',
    features: [
      'White-label Event Pages',
      'Dedicated Account Manager',
      'Unlimited Storage',
      'Custom API Integrations',
      'Team Permissions (SSO)',
      'Legal & Compliance Tools',
      'On-site Production Support'
    ],
    cta: 'Contact Sales'
  }
];

const FAQS = [
  {
    q: "Can I cancel my subscription at any time?",
    a: "Yes, you can cancel your Professional plan at any time. Your access will remain active until the end of your billing period."
  },
  {
    q: "Does FashionOS take a commission on bookings?",
    a: "On the Free Starter plan, we take a standard 10% commission on successful bookings. Professional and Enterprise plans enjoy 0% commission fees."
  },
  {
    q: "What is included in the AI Copilot?",
    a: "Our AI Copilot (powered by Gemini 3) helps you draft contracts, generate run-of-show schedules, write marketing copy, and even scout venues using natural language."
  },
  {
    q: "Do you offer discounts for non-profits or students?",
    a: "Yes! We offer a 50% discount on the Professional plan for registered students and non-profit fashion organizations. Contact support for verification."
  }
];

// --- Sub-Components ---

const FeatureItem = ({ text, included }: { text: string; included: boolean }) => (
  <li className={`flex items-start gap-3 text-sm ${included ? 'text-gray-700' : 'text-gray-400 line-through'}`}>
    {included ? (
      <Check size={18} className="text-green-500 mt-0.5 shrink-0" />
    ) : (
      <X size={18} className="text-gray-300 mt-0.5 shrink-0" />
    )}
    <span>{text}</span>
  </li>
);

const AccordionItem = ({ q, a }: { q: string; a: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button 
        className="w-full flex justify-between items-center py-6 text-left group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`font-serif font-bold text-lg transition-colors ${isOpen ? 'text-fashion-purple' : 'text-gray-900 group-hover:text-gray-600'}`}>
          {q}
        </span>
        <div className={`p-2 rounded-full transition-all duration-300 ${isOpen ? 'bg-fashion-purple text-white rotate-45' : 'bg-gray-50 text-gray-400 group-hover:bg-gray-100'}`}>
          <Plus size={16} />
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
        <p className="text-gray-500 leading-relaxed">{a}</p>
      </div>
    </div>
  );
};

// --- Main Component ---

export const PricingPage: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="bg-white pt-20 font-sans text-fashion-black">
      
      {/* 1. Hero */}
      <section className="py-20 md:py-32 container mx-auto px-6 md:px-12 text-center">
        <FadeIn>
          <SectionTag>Membership</SectionTag>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">
            Transparent Pricing for <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">Modern Creators.</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-12">
            Choose the plan that fits your stage of growth. No hidden fees, no surprises.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center bg-gray-100 p-1 rounded-full relative mb-12">
            <button 
              onClick={() => setIsAnnual(false)}
              className={`relative z-10 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${!isAnnual ? 'text-white' : 'text-gray-500 hover:text-black'}`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setIsAnnual(true)}
              className={`relative z-10 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${isAnnual ? 'text-white' : 'text-gray-500 hover:text-black'}`}
            >
              Annual <span className="text-[9px] bg-green-500 text-white px-1.5 py-0.5 rounded ml-1">-20%</span>
            </button>
            
            {/* Slider Background */}
            <div 
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-black rounded-full transition-all duration-300 ease-out ${isAnnual ? 'left-[calc(50%+2px)]' : 'left-1'}`}
            />
          </div>
        </FadeIn>
      </section>

      {/* 2. Pricing Cards */}
      <section className="container mx-auto px-6 md:px-12 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start max-w-6xl mx-auto">
          {PRICING_TIERS.map((tier, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div 
                className={`relative p-8 md:p-10 rounded-[2rem] border flex flex-col transition-transform duration-300 hover:shadow-xl ${
                  tier.popular 
                    ? 'bg-fashion-black text-white border-fashion-black shadow-2xl lg:-translate-y-4 ring-4 ring-purple-100' 
                    : 'bg-white border-gray-100 hover:border-gray-200'
                }`}
              >
                {tier.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                    <Sparkles size={10} /> Most Popular
                  </div>
                )}

                <div className="mb-8 pb-8 border-b border-white/10">
                  <h3 className={`font-serif font-bold text-2xl mb-2 ${tier.popular ? 'text-white' : 'text-gray-900'}`}>{tier.name}</h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className={`text-4xl font-bold ${tier.popular ? 'text-white' : 'text-gray-900'}`}>
                      {tier.price !== 'Custom' && isAnnual && tier.price !== '$0' 
                        ? `$${Math.floor(parseInt(tier.price.slice(1)) * 0.8)}` 
                        : tier.price}
                    </span>
                    {tier.price !== 'Custom' && <span className={`text-sm ${tier.popular ? 'text-gray-400' : 'text-gray-500'}`}>/month</span>}
                  </div>
                  <p className={`text-sm leading-relaxed ${tier.popular ? 'text-gray-300' : 'text-gray-500'}`}>
                    {tier.description}
                  </p>
                </div>

                <ul className="space-y-4 mb-10 flex-1">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      <Check size={18} className={`mt-0.5 shrink-0 ${tier.popular ? 'text-purple-400' : 'text-green-500'}`} />
                      <span className={tier.popular ? 'text-gray-200' : 'text-gray-700'}>{feature}</span>
                    </li>
                  ))}
                  {tier.notIncluded?.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm opacity-50">
                      <X size={18} className="mt-0.5 shrink-0" />
                      <span className={tier.popular ? 'text-gray-500' : 'text-gray-400'}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/dashboard" className="w-full">
                  <Button 
                    fullWidth 
                    variant={tier.popular ? 'accent' : 'outline'} 
                    className={tier.popular ? 'shadow-lg shadow-purple-500/30 border-none' : 'hover:bg-gray-50'}
                  >
                    {tier.cta}
                  </Button>
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* 3. Comparison / Feature List (Optional simplification: Features are in cards above, so skipping table for cleaner UI) */}

      {/* 4. FAQ Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-500">Everything you need to know about billing and memberships.</p>
          </div>
          
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm">
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Final CTA */}
      <section className="py-24 text-center bg-white">
        <div className="container mx-auto px-6">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Still have questions?</h2>
            <p className="text-gray-500 text-lg mb-10 max-w-xl mx-auto">
              Our team is here to help you find the perfect plan for your business needs.
            </p>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="px-12">Contact Support</Button>
            </Link>
          </FadeIn>
        </div>
      </section>

    </div>
  );
};
