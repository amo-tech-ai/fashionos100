
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, Star, Globe, Instagram, Mail, 
  Layers, Scissors, Calendar, Play, ArrowRight, CheckCircle2
} from 'lucide-react';
import { Button } from '../../components/Button';
import { FadeIn } from '../../components/FadeIn';
import { SectionTag } from '../../components/SectionTag';
import { Input } from '../../components/forms/Input';
import { Textarea } from '../../components/forms/Textarea';

// Mock Data for a specific designer
const MOCK_DESIGNER = {
  id: 1,
  name: 'Marcus Chen',
  brand: 'CHEN ATELIER',
  role: 'Creative Director',
  location: 'New York, NY',
  avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400',
  coverImage: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1600&auto=format&fit=crop',
  bio: 'Marcus Chen blends traditional tailoring with futuristic silhouettes. A graduate of Parsons, his work has been featured in NYFW and Hypebeast. He focuses on sustainable materials and zero-waste pattern making.',
  stats: {
    collections: 12,
    shows: 8,
    years: 6
  },
  tags: ['Sustainable', 'Avant-Garde', 'Menswear'],
  collections: [
    { title: 'SS25: Digital Nature', items: 24, image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=600' },
    { title: 'AW24: Concrete Jungle', items: 18, image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600' },
    { title: 'Resort 24: Fluidity', items: 12, image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600' }
  ],
  runway: {
    title: 'Spring/Summer 2025 Finale',
    image: 'https://images.unsplash.com/photo-1537832816519-689ad163238b?q=80&w=1200',
    duration: '12:45'
  },
  lookbook: [
    'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=600',
    'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=600',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600',
    'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=600'
  ]
};

export const DesignerProfilePage: React.FC = () => {
  const { id } = useParams();
  // In a real app, fetch data using id
  const designer = MOCK_DESIGNER; 

  return (
    <div className="bg-white min-h-screen font-sans text-fashion-black">
      
      {/* 1. Hero Cover */}
      <div className="relative h-[40vh] md:h-[50vh] bg-gray-900">
        <img 
          src={designer.coverImage} 
          alt="Cover" 
          className="w-full h-full object-cover opacity-60" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/30" />
      </div>

      {/* 2. Profile Header (Overlapping) */}
      <div className="container mx-auto px-6 md:px-12 -mt-24 relative z-10 mb-16">
        <FadeIn>
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="relative">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-md bg-gray-100">
                  <img src={designer.avatar} alt={designer.name} className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-2 right-2 bg-blue-500 text-white p-1.5 rounded-full border-2 border-white" title="Verified Designer">
                  <CheckCircle2 size={14} />
                </div>
              </div>
              
              <div className="flex-1 pt-2">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold mb-1">{designer.brand}</h1>
                    <p className="text-gray-500 font-medium">{designer.name} • {designer.role}</p>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="primary" className="px-6">Follow Brand</Button>
                    <Button variant="outline">Message</Button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-6 text-sm text-gray-500 mb-6">
                  <span className="flex items-center gap-2"><MapPin size={16} /> {designer.location}</span>
                  <span className="flex items-center gap-2"><Globe size={16} className="text-purple-600" /> Website</span>
                  <span className="flex items-center gap-2"><Instagram size={16} className="text-pink-600" /> Instagram</span>
                </div>

                <p className="text-gray-600 leading-relaxed max-w-2xl mb-6">{designer.bio}</p>

                <div className="flex gap-2">
                  {designer.tags.map((tag, i) => (
                    <span key={i} className="bg-gray-50 border border-gray-100 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-gray-600">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* 3. Stats Grid */}
      <section className="container mx-auto px-6 md:px-12 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-6 bg-gray-50 rounded-2xl text-center border border-gray-100">
            <Layers className="mx-auto mb-3 text-purple-600" size={24} />
            <p className="text-2xl font-bold text-gray-900">{designer.stats.collections}</p>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Collections</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-2xl text-center border border-gray-100">
            <Calendar className="mx-auto mb-3 text-purple-600" size={24} />
            <p className="text-2xl font-bold text-gray-900">{designer.stats.shows}</p>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Runway Shows</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-2xl text-center border border-gray-100">
            <Scissors className="mx-auto mb-3 text-purple-600" size={24} />
            <p className="text-2xl font-bold text-gray-900">{designer.stats.years}</p>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Years Active</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-2xl text-center border border-gray-100">
            <Star className="mx-auto mb-3 text-purple-600" size={24} />
            <p className="text-2xl font-bold text-gray-900">4.9</p>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Rating</p>
          </div>
        </div>
      </section>

      {/* 4. Collections */}
      <section className="container mx-auto px-6 md:px-12 mb-24">
        <div className="flex justify-between items-end mb-8">
          <div>
            <SectionTag>Archive</SectionTag>
            <h2 className="text-3xl font-serif font-bold">Collections</h2>
          </div>
          <Button variant="ghost" className="text-xs">View All</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {designer.collections.map((col, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="group cursor-pointer">
                <div className="aspect-[3/4] overflow-hidden rounded-2xl mb-4 relative">
                  <img 
                    src={col.image} 
                    alt={col.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold">
                    {col.items} Looks
                  </div>
                </div>
                <h3 className="font-serif font-bold text-xl mb-1">{col.title}</h3>
                <p className="text-sm text-gray-500 flex items-center gap-1 group-hover:text-purple-600 transition-colors">
                  View Lookbook <ArrowRight size={14} />
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* 5. Runway Feature */}
      <section className="py-24 bg-black text-white mb-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/3">
              <SectionTag color="text-purple-400">Latest Show</SectionTag>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">{designer.runway.title}</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Watch the full runway presentation from New York Fashion Week. Featuring the debut of the 'Digital Nature' collection.
              </p>
              <Button variant="white">View Show Notes</Button>
            </div>
            <div className="md:w-2/3 w-full">
              <FadeIn>
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/20 group cursor-pointer shadow-2xl">
                  <img src={designer.runway.image} alt="Runway" className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 group-hover:scale-110 transition-transform">
                      <Play className="fill-white text-white ml-1" size={32} />
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/80 px-3 py-1 rounded text-xs font-bold">
                    {designer.runway.duration}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Lookbook Grid */}
      <section className="container mx-auto px-6 md:px-12 mb-24">
        <div className="text-center mb-12">
          <SectionTag>Highlights</SectionTag>
          <h2 className="text-4xl font-serif font-bold">Selected Looks</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {designer.lookbook.map((img, i) => (
            <FadeIn key={i} delay={i * 50}>
              <div className={`rounded-xl overflow-hidden ${i % 2 === 0 ? 'aspect-[3/4]' : 'aspect-square'} hover:opacity-90 transition-opacity cursor-zoom-in`}>
                <img src={img} className="w-full h-full object-cover" alt={`Look ${i}`} />
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* 7. Contact / Booking */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-serif font-bold mb-4">Book an Appointment</h2>
              <p className="text-gray-500">Interested in the collection? Request a showroom visit or wholesale inquiry.</p>
            </div>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Name" placeholder="Your Name" className="bg-gray-50" />
                <Input label="Email" placeholder="buyer@store.com" type="email" className="bg-gray-50" />
              </div>
              <Input label="Company / Boutique" placeholder="Store Name" className="bg-gray-50" />
              <Textarea label="Inquiry Details" placeholder="Tell us what you are interested in..." className="bg-gray-50 h-32" />
              <Button fullWidth variant="primary" size="lg">Send Request</Button>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
};
