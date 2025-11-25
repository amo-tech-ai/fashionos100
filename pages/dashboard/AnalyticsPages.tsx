
import React from 'react';
import { BarChart3, TrendingUp, Globe, Share2, Eye, MousePointerClick, CheckCircle } from 'lucide-react';
import { FadeIn } from '../../components/FadeIn';
import { PageHeader, StatCard, ContentCard } from '../../components/dashboard/Shared';
import { DonutChart, CustomBarChart } from '../../components/dashboard/Widgets'; // Reusing existing widgets

// --- MOCK DATA ---
const PORTAL_DELIVERABLES = [
  { id: 1, task: "Upload High-Res Logo (Vector)", due: "Oct 15", status: "Completed" },
  { id: 2, task: "Approve Booth Mockup", due: "Oct 20", status: "Pending" },
  { id: 3, task: "Submit Video Ad (15s)", due: "Nov 01", status: "Pending" },
];

// --- 1. ROI PAGE ---
export const DashboardROI: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <PageHeader 
        title="ROI & Analytics" 
        subtitle="Measure event impact and sponsor performance." 
        breadcrumbs={['Dashboard', 'ROI']}
        actionLabel="Export PDF"
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Impressions" value="4.2M" icon={Eye} color="bg-indigo-50 text-indigo-600" trend="+24%" trendUp />
        <StatCard label="Social Engagement" value="850k" icon={Share2} color="bg-pink-50 text-pink-600" trend="+12%" trendUp />
        <StatCard label="Website Traffic" value="125k" icon={Globe} color="bg-blue-50 text-blue-600" />
        <StatCard label="Conversion Rate" value="3.8%" icon={MousePointerClick} color="bg-green-50 text-green-600" trend="+0.5%" trendUp />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-xl font-serif font-bold mb-6">Revenue & Media Value</h3>
          <CustomBarChart />
        </div>
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-xl font-serif font-bold mb-6">Audience Demographics</h3>
          <DonutChart />
          <div className="mt-8 space-y-4">
            <div className="flex justify-between text-sm"><span className="text-gray-500">Gen Z (18-24)</span><span className="font-bold">45%</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Millennials (25-34)</span><span className="font-bold">35%</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Gen X (35-50)</span><span className="font-bold">20%</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 2. SPONSOR PORTAL (External View Simulation) ---
export const SponsorPortal: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500 pb-20 max-w-6xl mx-auto">
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8 md:p-12 rounded-3xl mb-12 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 flex justify-between items-end">
          <div>
            <div className="inline-block bg-yellow-500/20 text-yellow-300 border border-yellow-500/50 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4">
              Gold Partner
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-2">Luxe Beauty</h1>
            <p className="text-gray-400">Partner Dashboard • Summer Fashion Week 2025</p>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-3xl font-bold">85%</p>
            <p className="text-xs uppercase tracking-wider text-gray-400">Onboarding Complete</p>
          </div>
        </div>
        {/* Decorative Circle */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Deliverables Checklist */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-serif font-bold mb-6">Pending Deliverables</h3>
            <div className="space-y-4">
              {PORTAL_DELIVERABLES.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${item.status === 'Completed' ? 'bg-green-500 text-white' : 'border-2 border-gray-300'}`}>
                      {item.status === 'Completed' && <CheckCircle size={14} />}
                    </div>
                    <div>
                      <p className={`font-bold text-sm ${item.status === 'Completed' ? 'text-gray-400 line-through' : 'text-gray-900'}`}>{item.task}</p>
                      <p className="text-xs text-gray-500">Due: {item.due}</p>
                    </div>
                  </div>
                  <button className={`text-xs font-bold px-4 py-2 rounded-lg transition-colors ${item.status === 'Completed' ? 'text-green-600 bg-green-50' : 'bg-black text-white hover:bg-gray-800'}`}>
                    {item.status === 'Completed' ? 'Done' : 'Upload'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Live Stats */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-serif font-bold mb-6">Campaign Performance</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-purple-50 rounded-xl text-center">
                <p className="text-2xl font-bold text-purple-700">125k</p>
                <p className="text-[10px] font-bold uppercase text-purple-400">Impressions</p>
              </div>
              <div className="p-4 bg-pink-50 rounded-xl text-center">
                <p className="text-2xl font-bold text-pink-700">3.4k</p>
                <p className="text-[10px] font-bold uppercase text-pink-400">Clicks</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-xl text-center">
                <p className="text-2xl font-bold text-orange-700">450</p>
                <p className="text-[10px] font-bold uppercase text-orange-400">Leads</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h4 className="font-bold mb-4">Your Account Team</h4>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div>
                <p className="text-sm font-bold">Elena Rossi</p>
                <p className="text-xs text-gray-500">Account Manager</p>
              </div>
            </div>
            <button className="w-full py-2 border border-gray-200 rounded-xl text-xs font-bold hover:bg-gray-50">Contact Support</button>
          </div>

          <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
            <h4 className="font-bold text-blue-900 mb-2">Upcoming Deadlines</h4>
            <p className="text-xs text-blue-700 mb-4">Your video ad spot is due in 3 days. Please ensure it meets the 4K spec.</p>
            <a href="#" className="text-xs font-bold text-blue-600 underline">View Specs</a>
          </div>
        </div>
      </div>
    </div>
  );
};
