
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Star, CheckCircle2, Globe, Instagram, Mail, Clock, Briefcase, Shield, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/Button';
import { FadeIn } from '../../components/FadeIn';
import { SectionTag } from '../../components/SectionTag';
import { DIRECTORY_ITEMS } from '../../data/mockDirectory';

export const ProfileDetailPage: React.FC = () => {
  const { id } = useParams();
  const profile = DIRECTORY_ITEMS.find(p => p.id === Number(id));

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-serif font-bold mb-4">Profile Not Found</h2>
          <Link to="/directory"><Button variant="outline">Back to Directory</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-20">
      
      {/* 1. Navigation Breadcrumb */}
      <div className="container mx-auto px-6 md:px-12 py-6">
        <Link to="/directory" className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-black transition-colors">
          <ArrowLeft size={14} className="mr-2" /> Back to Directory
        </Link>
      </div>

      {/* 2. Hero Profile Header */}
      <section className="container mx-auto px-6 md:px-12 mb-12">
        <FadeIn>
          <div className="bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-100 relative overflow-hidden">
            <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
              
              {/* Avatar */}
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg shrink-0">
                <img src={profile.image} alt={profile.name} className="w-full h-full object-cover" />
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900">{profile.name}</h1>
                  {profile.verified && (
                    <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                      <CheckCircle2 size={12} /> Verified
                    </span>
                  )}
                </div>
                
                <p className="text-lg text-purple-600 font-medium mb-4">{profile.role} • {profile.specialty}</p>
                
                <div className="flex flex-wrap gap-6 text-sm text-gray-500 mb-8">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} /> {profile.loc}, {profile.country}
                  </div>
                  <div className="flex items-center gap-2">
                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                    <span className="font-bold text-black">{profile.rating}</span> ({profile.reviews} reviews)
                  </div>
                  {profile.hourlyRate && (
                    <div className="flex items-center gap-2">
                      <Briefcase size={16} /> Rate: <span className="font-bold text-black">{profile.hourlyRate}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link to="/contact"><Button variant="primary" className="px-8">Hire Me</Button></Link>
                  <Button variant="outline">Message</Button>
                  <div className="flex gap-2 ml-auto md:ml-4">
                    <button className="p-3 bg-white rounded-full border border-gray-200 hover:text-purple-600 transition-colors"><Instagram size={18} /></button>
                    <button className="p-3 bg-white rounded-full border border-gray-200 hover:text-purple-600 transition-colors"><Globe size={18} /></button>
                    <button className="p-3 bg-white rounded-full border border-gray-200 hover:text-purple-600 transition-colors"><Mail size={18} /></button>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Background Blob */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          </div>
        </FadeIn>
      </section>

      {/* 3. Stats Row */}
      <section className="container mx-auto px-6 md:px-12 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Experience', value: profile.experience || '3+ Years', icon: Clock },
            { label: 'Projects', value: '45+', icon: Briefcase },
            { label: 'Response Time', value: '< 2 hrs', icon: Mail },
            { label: 'Reliability', value: '100%', icon: Shield },
          ].map((stat, i) => (
            <div key={i} className="bg-white border border-gray-100 p-6 rounded-2xl text-center hover:shadow-sm transition-shadow">
              <stat.icon size={20} className="mx-auto mb-3 text-gray-400" />
              <p className="text-xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24">
        
        {/* 4. Left Content: Bio & Skills */}
        <div className="lg:col-span-1 space-y-12">
          <FadeIn delay={100}>
            <div>
              <h3 className="text-xl font-serif font-bold mb-4">About</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                {profile.bio || "No biography provided."}
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div>
              <h3 className="text-xl font-serif font-bold mb-4">Skills & Tools</h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills?.map((skill, i) => (
                  <span key={i} className="bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-700">
                    {skill}
                  </span>
                )) || <span className="text-gray-400 text-sm">No skills listed.</span>}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={300}>
            <div className="bg-black text-white p-8 rounded-3xl relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="font-serif font-bold text-2xl mb-2">Work with {profile.name.split(' ')[0]}</h4>
                <p className="text-gray-400 text-sm mb-6">Check availability and request a quote for your next project.</p>
                <Link to="/contact"><Button variant="white" fullWidth>Contact Now</Button></Link>
              </div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-600 rounded-full blur-3xl opacity-50 translate-y-1/3 translate-x-1/3" />
            </div>
          </FadeIn>
        </div>

        {/* 5. Right Content: Portfolio */}
        <div className="lg:col-span-2">
          <FadeIn delay={200}>
            <div className="flex justify-between items-end mb-6">
              <h3 className="text-2xl font-serif font-bold">Portfolio</h3>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Selected Works</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profile.portfolio?.map((img, i) => (
                <div key={i} className={`rounded-2xl overflow-hidden group relative cursor-pointer ${i === 0 ? 'md:col-span-2 aspect-[2/1]' : 'aspect-square'}`}>
                  <img src={img} alt={`Portfolio ${i}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <Button variant="white" size="sm" className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">View Project</Button>
                  </div>
                </div>
              )) || (
                <div className="col-span-full py-12 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                  <p className="text-gray-400">No portfolio items uploaded.</p>
                </div>
              )}
            </div>
          </FadeIn>

          {/* Reviews Snippet */}
          <div className="mt-16">
            <SectionTag>Endorsements</SectionTag>
            <h3 className="text-2xl font-serif font-bold mb-8">Client Reviews</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex gap-1 text-yellow-400 mb-4">
                  <Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" />
                </div>
                <p className="text-gray-600 text-sm italic mb-4">"Absolutely incredible eye for detail. The campaign shots were beyond our expectations."</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <div>
                    <p className="text-xs font-bold">Creative Director</p>
                    <p className="text-[10px] text-gray-400 uppercase">Zara Studios</p>
                  </div>
                </div>
              </div>
              {/* More reviews would map here */}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
