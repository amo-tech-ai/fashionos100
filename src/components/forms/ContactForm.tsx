import React, { useState } from 'react';
import { Button } from '../Button';
import { Input } from './Input';
import { Select } from './Select';
import { Textarea } from './Textarea';
import { CheckCircle2, Loader2, Send } from 'lucide-react';

interface ContactFormProps {
  title?: string;
  subtitle?: string;
  serviceType?: string;
  className?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ 
  title = "Get in Touch", 
  subtitle = "Tell us about your project.", 
  serviceType = "General",
  className = ""
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Form Submitted:', { ...formData, serviceType });
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className={`bg-white p-12 rounded-3xl border border-gray-100 shadow-lg text-center flex flex-col items-center justify-center h-full min-h-[400px] ${className}`}>
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-300">
          <CheckCircle2 size={40} />
        </div>
        <h3 className="text-3xl font-serif font-bold mb-4 text-gray-900">Message Sent!</h3>
        <p className="text-gray-500 mb-8 max-w-sm">
          Thanks for reaching out about {serviceType}. Our team will review your brief and get back to you within 24 hours.
        </p>
        <Button variant="outline" onClick={() => setIsSuccess(false)}>
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <div className={`bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-gray-100 ${className}`}>
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">{title}</h2>
        <p className="text-gray-500">{subtitle}</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input 
            label="Name" 
            placeholder="Your Name" 
            required
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            className="bg-white" 
          />
          <Input 
            label="Email" 
            type="email" 
            placeholder="name@company.com" 
            required
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
            className="bg-white" 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input 
            label="Company" 
            placeholder="Brand Name" 
            value={formData.company}
            onChange={e => setFormData({...formData, company: e.target.value})}
            className="bg-white" 
          />
          <Select 
            label="Budget Range" 
            options={["$1k - $5k", "$5k - $10k", "$10k - $25k", "$25k+", "Not sure yet"]}
            value={formData.budget}
            onChange={e => setFormData({...formData, budget: e.target.value as string})}
            className="bg-white"
            required
          />
        </div>

        <Textarea 
          label="Project Details"
          placeholder="Tell us about your vision, timeline, and requirements..."
          required
          value={formData.message}
          onChange={e => setFormData({...formData, message: e.target.value})}
          className="bg-white h-32" 
        />
        
        <div className="pt-4">
          <Button 
            variant="primary" 
            className="w-full md:w-auto px-12 py-4 rounded-xl uppercase tracking-widest font-bold"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <><Loader2 size={16} className="animate-spin mr-2" /> Sending...</>
            ) : (
              <><Send size={16} className="mr-2" /> Submit Inquiry</>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};