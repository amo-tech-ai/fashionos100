
import React, { useState } from 'react';
import { 
  BarChart3, TrendingUp, Globe, Share2, Eye, MousePointerClick, 
  CheckCircle, Calendar, Plus, Package, Layout, Monitor, Zap, 
  Trash2, ChevronDown, ArrowRight, Heart, ArrowUpRight, Download,
  MoreHorizontal, PieChart
} from 'lucide-react';
import { FadeIn } from '../../components/FadeIn';
import { PageHeader, StatCard } from '../../components/dashboard/Shared';
import { Button } from '../../components/Button';
import { Input } from '../../components/forms/Input';
import { Select } from '../../components/forms/Select';
import { Textarea } from '../../components/forms/Textarea';
import { CalendarPicker } from '../../components/CalendarPicker';

// --- MOCK DATA FOR SPONSOR PORTAL ---
const PORTAL_DELIVERABLES = [
  { id: 1, task: "Upload High-Res Logo (Vector)", due: "Oct 15", status: "Completed" },
  { id: 2, task: "Approve Booth Mockup", due: "Oct 20", status: "Pending" },
  { id: 3, task: "Submit Video Ad (15s)", due: "Nov 01", status: "Pending" },
];

const MOCK_ACTIVATION_ITEMS = [
  { id: 1, type: "Booth Setup", category: "Furniture", item: "Lounge Seating (White)", date: "Oct 24, 2025" },
  { id: 2, type: "Branding", category: "Print", item: "Backdrop Wall (8x10)", date: "Oct 24, 2025" },
  { id: 3, type: "Tech", category: "AV", item: "65-inch 4K Display", date: "Oct 25, 2025" },
];

// --- CHART COMPONENTS (Custom Built) ---

const SimpleBarChart = () => {
  const data = [
    { label: 'Chanel', value: 85, color: 'bg-purple-400' },
    { label: 'Dior', value: 65, color: 'bg-purple-400' },
    { label: 'Gucci', value: 95, color: 'bg-purple-500' },
    { label: 'LV', value: 55, color: 'bg-purple-400' },
    { label: 'Prada', value: 60, color: 'bg-purple-400' },
  ];

  return (
    <div className="h-64 flex items-end justify-between gap-4 pt-6 px-2">
      {data.map((item, i) => (
        <div key={i} className="flex flex-col items-center gap-2 flex-1 group cursor-pointer">
          <div className="relative w-full bg-gray-100 rounded-t-lg h-full flex items-end overflow-hidden">
             <div 
               className={`w-full rounded-t-lg transition-all duration-1000 ${item.color} group-hover:opacity-80`} 
               style={{ height: `${item.value}%` }}
             />
             <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
               {item.value}%
             </div>
          </div>
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

const SimpleLineChart = () => {
  // Simple SVG Line Chart
  const points = [20, 40, 35, 60, 55, 80, 90]; // normalized 0-100
  const labels = ['Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Generate SVG path
  const width = 100;
  const height = 100;
  const step = width / (points.length - 1);
  
  const pathData = points.map((p, i) => {
    const x = i * step;
    const y = height - p;
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  return (
    <div className="h-64 w-full relative pt-6">
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
        {/* Grid Lines */}
        <line x1="0" y1="25" x2="100" y2="25" stroke="#f3f4f6" strokeWidth="0.5" />
        <line x1="0" y1="50" x2="100" y2="50" stroke="#f3f4f6" strokeWidth="0.5" />
        <line x1="0" y1="75" x2="100" y2="75" stroke="#f3f4f6" strokeWidth="0.5" />
        
        {/* Line */}
        <path d={pathData} fill="none" stroke="#ec4899" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        
        {/* Points */}
        {points.map((p, i) => (
          <circle 
            key={i} 
            cx={i * step} 
            cy={100 - p} 
            r="1.5" 
            fill="#ec4899" 
            stroke="white" 
            strokeWidth="0.5" 
            className="hover:r-2 transition-all cursor-pointer"
          />
        ))}
      </svg>
      {/* X-Axis Labels */}
      <div className="flex justify-between mt-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
        {labels.map((l, i) => <span key={i}>{l}</span>)}
      </div>
    </div>
  );
};

const EngagementPieChart = () => {
  // Using conic-gradient for a CSS-only pie chart
  const segments = [
    { label: 'Social Media', value: 35, color: '#c084fc' }, // Purple
    { label: 'Live Event', value: 30, color: '#ec4899' },   // Pink
    { label: 'Digital Streaming', value: 20, color: '#3b82f6' }, // Blue
    { label: 'Email Campaign', value: 15, color: '#10b981' }, // Green
  ];

  let currentAngle = 0;
  const gradientParts = segments.map(seg => {
    const start = currentAngle;
    const end = currentAngle + (seg.value * 3.6); // 360deg / 100%
    currentAngle = end;
    return `${seg.color} ${start}deg ${end}deg`;
  }).join(', ');

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div 
        className="w-40 h-40 rounded-full relative"
        style={{ background: `conic-gradient(${gradientParts})` }}
      >
        {/* Inner Circle for Donut Effect */}
        <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
           <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Channels</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-6 w-full">
        {segments.map((seg, i) => (
          <div key={i} className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: seg.color }} />
              <span className="text-gray-600">{seg.label}</span>
            </div>
            <span className="font-bold text-gray-900">{seg.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const HorizontalBarChart = () => {
  const data = [
    { label: 'Chanel', value: 2.4, color: 'bg-blue-500' },
    { label: 'Dior', value: 1.8, color: 'bg-blue-500' },
    { label: 'Gucci', value: 3.1, color: 'bg-blue-500' },
    { label: 'Louis Vuitton', value: 1.5, color: 'bg-blue-500' },
    { label: 'Prada', value: 0.9, color: 'bg-blue-500' },
  ];
  
  const maxVal = Math.max(...data.map(d => d.value));

  return (
    <div className="space-y-4 pt-2">
      {data.map((item, i) => (
        <div key={i} className="group">
          <div className="flex justify-between text-xs mb-1">
            <span className="font-bold text-gray-700">{item.label}</span>
            <span className="text-gray-500">{item.value}M</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <div 
              className={`h-full rounded-full ${item.color} transition-all duration-1000 ease-out`}
              style={{ width: `${(item.value / maxVal) * 100}%` }}
            />
          </div>
        </div>
      ))}
      <div className="flex justify-between text-[10px] text-gray-400 pt-2">
        <span>0</span>
        <span>0.8</span>
        <span>1.6</span>
        <span>2.4</span>
        <span>3.2</span>
      </div>
      <div className="text-center text-[10px] font-bold uppercase text-blue-500 mt-1 flex items-center justify-center gap-1">
        <div className="w-2 h-2 bg-blue-500 rounded-sm" /> Impressions (M)
      </div>
    </div>
  );
};

// --- 1. ROI PAGE ---
export const DashboardROI: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500 pb-20 font-sans">
      {/* 1. Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">ROI & Analytics Dashboard</h1>
          <p className="text-gray-500">Track sponsor performance and return on investment</p>
        </div>
        <div className="flex gap-3">
           <Button variant="white" className="gap-2 rounded-full text-gray-600 border-gray-200">
             <Calendar size={16} /> Oct 2025
           </Button>
           <Button variant="outline" className="gap-2 rounded-full text-gray-600 border-gray-200">
             <Download size={16} /> Export Report
           </Button>
        </div>
      </div>

      {/* 2. KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          label="Average ROI" 
          value="340%" 
          icon={TrendingUp} 
          color="text-green-600 bg-green-50" 
          trend="+25% from last quarter" 
          trendUp 
        />
        <StatCard 
          label="Total Impressions" 
          value="12.5M" 
          icon={Eye} 
          color="text-purple-600 bg-purple-50" 
          trend="+3% from last month" 
          trendUp 
        />
        <StatCard 
          label="Engagement Rate" 
          value="7.8%" 
          icon={Heart} 
          color="text-pink-600 bg-pink-50" 
          trend="+1.2% from last month" 
          trendUp 
        />
        <StatCard 
          label="Social Reach" 
          value="8.2M" 
          icon={Share2} 
          color="text-blue-600 bg-blue-50" 
          trend="+42% from last month" 
          trendUp 
        />
      </div>

      {/* 3. Chart Section (Two Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* A. Sponsor ROI Performance */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-serif font-bold text-xl text-gray-900">Sponsor ROI Performance</h3>
            <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal size={20} /></button>
          </div>
          <SimpleBarChart />
          <div className="flex justify-center items-center gap-2 mt-4">
             <div className="w-3 h-3 bg-purple-400 rounded-sm" />
             <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">ROI %</span>
          </div>
        </div>

        {/* B. Monthly Revenue Trend */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-serif font-bold text-xl text-gray-900">Monthly Revenue Trend</h3>
            <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal size={20} /></button>
          </div>
          <SimpleLineChart />
          <div className="flex justify-center items-center gap-2 mt-4">
             <div className="w-3 h-3 bg-pink-500 rounded-full" />
             <span className="text-xs font-bold text-pink-500 uppercase tracking-wider">Revenue ($M)</span>
          </div>
        </div>
      </div>

      {/* 4. Lower Section — Three Wide Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* A. Engagement by Channel */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col">
          <h3 className="font-serif font-bold text-xl text-gray-900 mb-6">Engagement by Channel</h3>
          <div className="flex-grow">
            <EngagementPieChart />
          </div>
        </div>

        {/* B. Top Performing Sponsors */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col">
          <h3 className="font-serif font-bold text-xl text-gray-900 mb-6">Top Performing Sponsors</h3>
          <div className="space-y-6 flex-grow">
            {[
              { name: 'Chanel', imp: '2.4M', eng: '185K', reach: '1.8M' },
              { name: 'Gucci', imp: '3.1M', eng: '220K', reach: '2.2M' },
              { name: 'Dior', imp: '1.8M', eng: '142K', reach: '1.4M' }
            ].map((sponsor, i) => (
              <div key={i} className="border-b border-gray-50 last:border-0 pb-4 last:pb-0">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-lg">{sponsor.name}</h4>
                  <span className="bg-green-100 text-green-700 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full">Positive</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="block text-gray-400 mb-0.5">Impressions</span>
                    <span className="font-bold">{sponsor.imp}</span>
                  </div>
                  <div>
                    <span className="block text-gray-400 mb-0.5">Engagement</span>
                    <span className="font-bold">{sponsor.eng}</span>
                  </div>
                  <div>
                    <span className="block text-gray-400 mb-0.5">Reach</span>
                    <span className="font-bold">{sponsor.reach}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* C. Sponsor Impressions Breakdown */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col">
          <h3 className="font-serif font-bold text-xl text-gray-900 mb-6">Sponsor Impressions Breakdown</h3>
          <div className="flex-grow">
            <HorizontalBarChart />
          </div>
        </div>

      </div>
    </div>
  );
};

// --- HELPER: ACTIVATION PLANNER COMPONENT (Internal Tool) ---
const ActivationPlanner = () => {
  const [plannedItems, setPlannedItems] = useState(MOCK_ACTIVATION_ITEMS);
  const [showCalendar, setShowCalendar] = useState(false);
  const [newItem, setNewItem] = useState({
    type: 'Booth Setup',
    category: 'Furniture',
    item: '',
    date: null as Date | null
  });

  const handleAddItem = () => {
    if (!newItem.item || !newItem.date) return;
    const item = {
      id: Math.random(),
      type: newItem.type,
      category: newItem.category,
      item: newItem.item,
      date: newItem.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    setPlannedItems([...plannedItems, item]);
    setNewItem({ ...newItem, item: '', date: null });
  };

  const removeItem = (id: number) => {
    setPlannedItems(plannedItems.filter(i => i.id !== id));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* 1. Planning Form */}
      <div className="lg:col-span-1">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm sticky top-24">
          <div className="flex items-center gap-2 mb-6 text-purple-600">
            <Layout size={20} />
            <h3 className="font-serif font-bold text-xl text-gray-900">Plan Details</h3>
          </div>
          
          <div className="space-y-5">
            <Select 
              label="Activation Context"
              options={["Booth Setup", "VIP Lounge", "Runway Branding", "Digital Screen"]}
              value={newItem.type}
              onChange={(e) => setNewItem({...newItem, type: e.target.value})}
              className="bg-gray-50"
            />
            
            <Select 
              label="Resource Category"
              options={["Furniture", "Branding / Print", "Audio / Visual", "Staffing", "Giveaways"]}
              value={newItem.category}
              onChange={(e) => setNewItem({...newItem, category: e.target.value})}
              className="bg-gray-50"
            />

            <div className="relative">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1 mb-1.5 block">Date Required</label>
              <button 
                onClick={() => setShowCalendar(!showCalendar)}
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-left flex justify-between items-center hover:border-purple-300 transition-colors"
              >
                <span className={newItem.date ? "text-gray-900" : "text-gray-400"}>
                  {newItem.date ? newItem.date.toLocaleDateString() : "Select Date"}
                </span>
                <Calendar size={16} className="text-gray-400" />
              </button>
              {showCalendar && (
                <div className="absolute top-full left-0 mt-2 z-50">
                  <CalendarPicker 
                    initialStart={newItem.date}
                    initialEnd={null}
                    onClose={() => setShowCalendar(false)}
                    onApply={(start) => {
                      setNewItem({...newItem, date: start});
                      setShowCalendar(false);
                    }}
                  />
                </div>
              )}
            </div>

            <Textarea 
              label="Item Details / Specs"
              placeholder="e.g. White leather sofa, approx 6ft wide."
              value={newItem.item}
              onChange={(e) => setNewItem({...newItem, item: e.target.value})}
              className="bg-gray-50 h-24"
            />

            <Button 
              fullWidth 
              variant="primary" 
              onClick={handleAddItem}
              disabled={!newItem.item || !newItem.date}
              className="mt-2"
            >
              <Plus size={16} className="mr-2" /> Add to Plan
            </Button>
          </div>
        </div>
      </div>

      {/* 2. Planned Items List */}
      <div className="lg:col-span-2">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm min-h-[600px]">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-serif font-bold text-xl">Activation Schedule</h3>
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 size={14} /> Share with Team
            </Button>
          </div>

          {plannedItems.length > 0 ? (
            <div className="space-y-4">
              {plannedItems.map((item) => (
                <div key={item.id} className="group flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-sm transition-all bg-white">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-purple-50 group-hover:text-purple-600 transition-colors shrink-0">
                    {item.category === 'Furniture' && <Package size={20} />}
                    {item.category === 'AV' && <Monitor size={20} />}
                    {item.category === 'Print' && <Layout size={20} />}
                    {item.category === 'Staffing' && <Zap size={20} />}
                    {!['Furniture', 'AV', 'Print', 'Staffing'].includes(item.category) && <Zap size={20} />}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-gray-900 truncate">{item.item}</h4>
                      <span className="text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-full">{item.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="font-semibold text-purple-600">{item.type}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-300" />
                      <span>{item.category}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center border-2 border-dashed border-gray-100 rounded-2xl bg-gray-50/50">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
                <Layout size={24} />
              </div>
              <p className="text-gray-900 font-medium mb-1">No items planned yet</p>
              <p className="text-sm text-gray-500">Use the form to add resources to your activation.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- 2. SPONSOR PORTAL (External View Simulation) ---
export const SponsorPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'planner'>('dashboard');

  return (
    <div className="animate-in fade-in duration-500 pb-20 max-w-6xl mx-auto">
      
      {/* Header Card */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8 md:p-12 rounded-3xl mb-8 relative overflow-hidden shadow-2xl">
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

      {/* Tab Navigation */}
      <div className="flex gap-4 mb-8 border-b border-gray-200 pb-1 overflow-x-auto">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`pb-3 px-2 text-sm font-bold uppercase tracking-wider transition-all border-b-2 ${activeTab === 'dashboard' ? 'text-black border-black' : 'text-gray-400 border-transparent hover:text-gray-600'}`}
        >
          Overview
        </button>
        <button 
          onClick={() => setActiveTab('planner')}
          className={`pb-3 px-2 text-sm font-bold uppercase tracking-wider transition-all border-b-2 flex items-center gap-2 ${activeTab === 'planner' ? 'text-purple-600 border-purple-600' : 'text-gray-400 border-transparent hover:text-gray-600'}`}
        >
          Activation Planner <span className="bg-purple-100 text-purple-600 text-[9px] px-1.5 py-0.5 rounded-full">New</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="min-h-[500px]">
        {activeTab === 'dashboard' ? (
          <FadeIn>
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
          </FadeIn>
        ) : (
          <FadeIn>
            <ActivationPlanner />
          </FadeIn>
        )}
      </div>
    </div>
  );
};
