
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
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

interface FormInputs {
  name: string;
  email: string;
  company: string;
  budget: string;
  message: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ 
  title = "Get in Touch", 
  subtitle = "Tell us about your project.", 
  serviceType = "General",
  className = ""
}) => {
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting },
    reset 
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Form Submitted:', { ...data, serviceType });
    setIsSuccess(true);
    reset();
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
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input 
            label="Name" 
            placeholder="Your Name"
            className="bg-white"
            error={errors.name?.message}
            {...register('name', { required: 'Name is required' })}
          />
          <Input 
            label="Email" 
            type="email" 
            placeholder="name@company.com" 
            className="bg-white"
            error={errors.email?.message}
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email format"
              }
            })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input 
            label="Company" 
            placeholder="Brand Name" 
            className="bg-white"
            {...register('company')}
          />
          <Select 
            label="Budget Range" 
            options={["$1k - $5k", "$5k - $10k", "$10k - $25k", "$25k+", "Not sure yet"]}
            className="bg-white"
            defaultValue=""
            error={errors.budget?.message}
            {...register('budget', { required: 'Please select a budget range' })}
          />
        </div>

        <Textarea 
          label="Project Details"
          placeholder="Tell us about your vision, timeline, and requirements..."
          className="bg-white h-32"
          error={errors.message?.message}
          {...register('message', { required: 'Project details are required' })}
        />
        
        <div className="pt-4">
          <Button 
            type="submit"
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
