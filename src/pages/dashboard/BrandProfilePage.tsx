
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Palette, Camera, Video, Target, Layers, Sparkles, BookOpen, Loader2, Plus, Instagram } from 'lucide-react';
import { FadeIn } from '../../components/FadeIn';
import { SectionTag } from '../../components/SectionTag';
import { Button } from '../../components/Button';
import { getBrandProfile, getUserBrand, generateBrandProfile } from '../../lib/brand-service';
import { FullBrandProfile } from '../../types/brand';
import { PageHeader } from '../../components/dashboard/Shared';
import { Input } from '../../components/forms/Input';
import { Textarea } from '../../components/forms/Textarea';
import { SkeletonLoader } from '../../components/SkeletonLoader';

export const BrandProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<FullBrandProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  
  // Generation Form State
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
      companyName: '',
      websiteUrl: '',
      socialUrl: '',
      description: ''
  });

  useEffect(() => {
    const loadData = async () => {
        let targetId = id;
        if (!targetId) {
            // If no ID in URL, try to find user's brand
            const userBrandId = await getUserBrand();
            if (userBrandId) {
                targetId = userBrandId;
                // Update URL so we can share it/refresh
                window.history.replaceState(null, '', `/dashboard/brand/${targetId}`);
            } else {
                // No brand found, show create form
                setShowForm(true);
                setLoading(false);
                return;
            }
        }

        if (targetId) {
            const data = await getBrandProfile(targetId);
            setProfile(data);
        }
        setLoading(false);
    };
    loadData();
  }, [id]);

  const handleGenerate = async (e: React.FormEvent) => {
      e.preventDefault();
      setGenerating(true);
      
      // Process social URLs (split by comma) - Add type check for safety
      const socialUrlString = formData.socialUrl || '';
      const socialUrls = socialUrlString
        .split(',')
        .map(url => url.trim())
        .filter(url => url.length > 0);

      const result = await generateBrandProfile({
          companyName: formData.companyName,
          websiteUrl: formData.websiteUrl,
          socialUrls: socialUrls,
          description: formData.description
      });
      
      setGenerating(false);
      if (result.success && result.companyId) {
          setShowForm(false);
          setLoading(true); // Show loading while we fetch the new data
          const data = await getBrandProfile(result.companyId);
          setProfile(data);
          setLoading(false);
          // Update URL
          navigate(`/dashboard/brand/${result.companyId}`, { replace: true });
      } else {
          alert(`Failed: ${result.error}`);
      }
  };

  if (loading) return (
    <div className="p-8 space-y-8 animate-pulse">
        <SkeletonLoader className="h-12 w-1/3 mb-8 rounded-lg" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <SkeletonLoader className="h-96 rounded-3xl" />
            <SkeletonLoader className="h-96 rounded-3xl lg:col-span-2" />
        </div>
    </div>
  );

  // --- CREATE FORM VIEW ---
  if (showForm || !profile) {
      return (
          <div className="max-w-2xl mx-auto py-12 px-6 animate-in fade-in duration-500">
              <div className="text-center mb-10">
                  <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                      <Sparkles size={32} />
                  </div>
                  <h1 className="text-3xl font-serif font-bold mb-2">Create Your Brand Profile</h1>
                  <p className="text-gray-500">AI will analyze your brand's digital presence to build a custom production guide.</p>
              </div>

              <form onSubmit={handleGenerate} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl space-y-6">
                  <Input 
                    label="Brand Name" 
                    placeholder="e.g. Atelier Noir" 
                    value={formData.companyName} 
                    onChange={e => setFormData({...formData, companyName: e.target.value})}
                    required
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input 
                        label="Website URL" 
                        placeholder="https://..." 
                        value={formData.websiteUrl} 
                        onChange={e => setFormData({...formData, websiteUrl: e.target.value})}
                    />
                    <Input 
                        label="Social Links (Comma separated)" 
                        placeholder="https://instagram.com/..., https://tiktok.com/..." 
                        value={formData.socialUrl} 
                        onChange={e => setFormData({...formData, socialUrl: e.target.value})}
                        icon={<Instagram size={16} />}
                    />
                  </div>
                  <Textarea 
                    label="Short Description" 
                    placeholder="Tell us a bit about your brand vibe (e.g. Minimalist, Sustainable, Luxury)..." 
                    value={formData.description} 
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    className="h-32"
                  />
                  
                  <Button fullWidth variant="primary" size="lg" disabled={generating}>
                      {generating ? (
                          <><Loader2 className="animate-spin mr-2" /> Analyzing Brand DNA...</>
                      ) : (
                          <><Sparkles className="mr-2" /> Generate Profile</>
                      )}
                  </Button>
              </form>
          </div>
      );
  }

  // --- DASHBOARD VIEW ---
  const { company, identity, visuals, recommendations } = profile;

  return (
    <div className="pb-20 animate-in fade-in duration-500">
      <PageHeader 
        title={company.name}
        subtitle="Brand DNA & Production Guide"
        breadcrumbs={['Dashboard', 'Brand Profile']}
        actionLabel="Update Analysis"
        onAction={() => setShowForm(true)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN - Identity & Visuals */}
        <div className="space-y-8">
          
          {/* Core Identity Card */}
          <FadeIn delay={0} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-fit">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-50 pb-4">
              <div className="bg-black text-white p-2 rounded-lg"><BookOpen size={18} /></div>
              <h3 className="font-serif font-bold text-lg">Identity</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">Core Description</p>
                <p className="text-gray-700 text-sm leading-relaxed">{identity?.core_description}</p>
              </div>
              
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">Tone of Voice</p>
                <div className="flex flex-wrap gap-2">
                  {identity?.tone_of_voice?.map((tone, i) => (
                    <span key={i} className="bg-gray-50 px-3 py-1 rounded-full text-xs font-medium text-gray-600 border border-gray-200">
                      {tone}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">Target Audience</p>
                <ul className="space-y-2">
                  {identity?.target_audience?.map((aud, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <Target size={14} className="mt-0.5 text-purple-500 shrink-0" /> {aud}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>

          {/* Visual Identity Card */}
          <FadeIn delay={100} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-fit">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-50 pb-4">
              <div className="bg-purple-100 text-purple-600 p-2 rounded-lg"><Palette size={18} /></div>
              <h3 className="font-serif font-bold text-lg">Visual DNA</h3>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-3">Color Palette</p>
                <div className="flex flex-wrap gap-3">
                  {visuals?.colors?.map((color, i) => (
                    <div key={i} className="group relative flex flex-col items-center gap-1">
                      <div 
                        className="w-12 h-12 rounded-full border border-gray-100 shadow-sm transition-transform group-hover:scale-110" 
                        style={{ backgroundColor: color.includes('#') || color.startsWith('rgb') ? color : '#ddd' }} 
                        title={color} 
                      />
                      <span className="text-[9px] text-gray-400 uppercase opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-4 bg-white px-1 rounded shadow-sm whitespace-nowrap z-10">
                        {color}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Lighting</p>
                  <p className="text-sm font-medium text-gray-800">{visuals?.lighting_style || 'Natural'}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Mood</p>
                  <p className="text-sm font-medium text-gray-800 truncate">{visuals?.moods?.[0]}</p>
                </div>
              </div>
            </div>
          </FadeIn>

        </div>

        {/* MIDDLE COLUMN - Recommendations */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Photography Guide */}
          <FadeIn delay={200} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
             <div className="flex justify-between items-center mb-8 border-b border-gray-50 pb-4">
                <div>
                    <SectionTag color="text-pink-500">Production Guide</SectionTag>
                    <h3 className="font-serif font-bold text-2xl">Photography Strategy</h3>
                </div>
                <div className="bg-pink-50 text-pink-500 p-3 rounded-2xl"><Camera size={24} /></div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                   <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                      <Layers size={14} /> Recommended Shots
                   </h4>
                   <ul className="space-y-3">
                      {recommendations?.recommended_photography.shot_types.map((shot, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-start gap-3 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                          <span className="w-1.5 h-1.5 bg-pink-500 rounded-full mt-1.5 shrink-0" />
                          {shot}
                        </li>
                      ))}
                   </ul>
                </div>
                <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                   <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Scenes & Framing</h4>
                   <div className="flex flex-wrap gap-2 mb-4">
                      {recommendations?.recommended_photography.scenes.map((scene, i) => (
                         <span key={i} className="inline-block bg-white px-3 py-1.5 rounded-lg text-xs font-bold text-gray-600 border border-gray-200 shadow-sm">
                            {scene}
                         </span>
                      ))}
                   </div>
                   <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl">
                       <p className="text-xs text-blue-800 italic leading-relaxed">
                          <span className="font-bold not-italic">Director Note: </span>
                          {recommendations?.recommended_photography.framing_guidelines.join('. ')}
                       </p>
                   </div>
                </div>
             </div>
          </FadeIn>

          {/* Video Guide */}
          <FadeIn delay={300} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
             <div className="flex justify-between items-center mb-8 border-b border-gray-50 pb-4">
                <h3 className="font-serif font-bold text-2xl">Video Strategy</h3>
                <div className="bg-blue-50 text-blue-500 p-3 rounded-2xl"><Video size={24} /></div>
             </div>

             <div className="space-y-6">
                <div className="flex gap-4 overflow-x-auto pb-2">
                   {recommendations?.recommended_video.formats.map((fmt, i) => (
                      <div key={i} className="min-w-[140px] bg-gray-900 text-white p-4 rounded-xl text-center shadow-lg">
                         <p className="text-sm font-bold">{fmt}</p>
                      </div>
                   ))}
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
                   <h4 className="font-bold text-blue-900 mb-4 text-sm uppercase tracking-wider">Platform Ideas</h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {Object.entries(recommendations?.recommended_video.platform_specific_ideas || {}).map(([platform, ideas]) => (
                         <div key={platform}>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-xs font-bold uppercase text-white bg-blue-400 px-2 py-0.5 rounded">{platform}</span>
                            </div>
                            <ul className="space-y-2">
                               {(ideas as string[]).slice(0,2).map((idea, i) => (
                                   <li key={i} className="text-sm text-blue-800 flex items-start gap-2 bg-white/60 p-2 rounded-lg">
                                       <span className="text-blue-400 mt-1">•</span> {idea}
                                   </li>
                               ))}
                            </ul>
                         </div>
                      ))}
                   </div>
                </div>
             </div>
          </FadeIn>

          {/* Campaign Ideas */}
          <FadeIn delay={400}>
             <div className="flex items-center gap-2 mb-6">
                 <Sparkles className="text-purple-500" />
                 <h3 className="font-serif font-bold text-2xl">Generated Campaign Concepts</h3>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendations?.campaign_ideas.map((idea, i) => (
                   <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 hover:border-purple-200 hover:shadow-xl transition-all group cursor-pointer">
                      <div className="flex justify-between items-start mb-4">
                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider group-hover:bg-purple-100 group-hover:text-purple-700 transition-colors">
                            {idea.channel}
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-xl mb-3 text-gray-900">{idea.title}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed mb-6">{idea.concept}</p>
                      <Button size="sm" variant="outline" className="w-full group-hover:bg-black group-hover:text-white group-hover:border-black transition-colors">
                          Start This Project
                      </Button>
                   </div>
                ))}
             </div>
          </FadeIn>

        </div>

      </div>
    </div>
  );
};
