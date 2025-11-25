
import React, { useState } from 'react';
import { 
  BarChart3, TrendingUp, Globe, Share2, Eye, MousePointerClick, 
  CheckCircle, Calendar, Plus, Package, Layout, Monitor, Zap, 
  Trash2, ChevronDown, ArrowRight, Heart, ArrowUpRight, Download,
  MoreHorizontal, PieChart, Upload, FileText, Image as ImageIcon, 
  Video, Lock, HelpCircle, Mail, Clock, MapPin, User
} from 'lucide-react';
import { FadeIn } from '../../components/FadeIn';
import { PageHeader, StatCard } from '../../components/dashboard/Shared';
import { Button } from '../../components/Button';
import { Input } from '../../components/forms/Input';
import { Select } from '../../components/forms/Select';
import { Textarea } from '../../components/forms/Textarea';
import { CalendarPicker } from '../../components/CalendarPicker';

// --- MOCK DATA FOR SPONSOR PORTAL ---
const SPONSOR_KPI_DATA = [
  { label: 'Total Impressions', value: '2.4M', trend: '+38% vs target', icon: Eye, color: 'text-purple-600 bg-purple-50' },
  { label: 'Engagement Rate', value: '7.8%', trend: '+1.2% vs average', icon: Heart, color: 'text-pink-600 bg-pink-50' },
  { label: 'Social Reach', value: '1.8M', trend: '+42% vs target', icon: Share2, color: 'text-blue-600 bg-blue-50' },
  { label: 'ROI', value: '385%', trend: 'Above average', icon: TrendingUp, color: 'text-green-600 bg-green-50' },
];

const REQUIRED_UPLOADS = [
  { id: 1, title: "Brand Logo (High-Res)", date: "Uploaded: Nov 10, 2025", status: "completed", type: "image" },
  { id: 2, title: "Social Media Assets", date: "Uploaded: Nov 15, 2025", status: "completed", type: "image" },
  { id: 3, title: "VIP Guest List", date: "Due: Dec 20, 2025", status: "pending", type: "doc" },
];

const AVAILABLE_DOWNLOADS = [
  { id: 1, title: "Event Day Photos", date: "Available: Jan 24, 2026", status: "available", type: "image" },
  { id: 2, title: "Activation Video", date: "Expected: Jan 28, 2026", status: "in-progress", type: "video" },
  { id: 3, title: "ROI Analytics Report", date: "Available: Jan 30, 2026", status: "available", type: "doc" },
];

const SPONSOR_ACTIVATIONS = [
  { id: 1, name: "VIP Lounge", location: "Grand Palais - VIP Area", date: "Jan 15-23, 2026", attendees: "500 attendees", status: "confirmed" },
  { id: 2, name: "Runway Branding", location: "Main Runway", date: "Jan 15-23, 2026", attendees: "1200 attendees", status: "confirmed" },
  { id: 3, name: "After Party", location: "Musée Rodin", date: "Jan 23, 2026", attendees: "400 attendees", status: "pending" },
];

const MOCK_PLANNER_ITEMS = [
  { id: 1, type: "Booth Setup", category: "Furniture", item: "Lounge Seating (White)", date: new Date(2025, 9, 24) },
  { id: 2, type: "Branding", category: "Print", item: "Backdrop Wall (8x10)", date: new Date(2025, 9, 24) },
  { id: 3, type: "Tech", category: "AV", item: "65-inch 4K Display", date: new Date(2025, 9, 25) },
];

// --- HELPER COMPONENTS ---

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    completed: "bg-green-100 text-green-700",
    available: "bg-green-100 text-green-700",
    confirmed: "bg-green-100 text-green-700",
    pending: "bg-blue-50 text-blue-600",
    "in-progress": "bg-amber-100 text-amber-700",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${styles[status.toLowerCase()] || "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
};

const FileIcon = ({ type }: { type: string }) => {
  if (type === 'image') return <ImageIcon size={18} className="text-purple-500" />;
  if (type === 'video') return <Video size={18} className="text-pink-500" />;
  return <FileText size={18} className="text-blue-500" />;
};

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
          <div className="mt-4 text-center text-xs text-purple-600 font-bold uppercase tracking-wider flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-sm" /> ROI %
          </div>
        </div>

        {/* B. Monthly Revenue Trend */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-serif font-bold text-xl text-gray-900">Monthly Revenue Trend</h3>
            <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal size={20} /></button>
          </div>
          <SimpleLineChart />
          <div className="mt-4 text-center text-xs text-pink-500 font-bold uppercase tracking-wider flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-pink-500 rounded-full" /> Revenue ($M)
          </div>
        </div>
      </div>

      {/* 4. Lower Section - Three Wide Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* A. Engagement by Channel */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="font-serif font-bold text-lg text-gray-900 mb-4">Engagement by Channel</h3>
          <EngagementPieChart />
        </div>

        {/* B. Top Performing Sponsors */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="font-serif font-bold text-lg text-gray-900 mb-6">Top Performing Sponsors</h3>
          <div className="space-y-6">
            {[
              { name: 'Chanel', event: 'Paris Fashion Week SS25', roi: '385%', imp: '2.4M', eng: '185K', reach: '1.8M' },
              { name: 'Gucci', event: 'New York Designer Series', roi: '420%', imp: '3.1M', eng: '220K', reach: '2.2M' },
              { name: 'Dior', event: 'Milan Digital Showcase', roi: '340%', imp: '1.8M', eng: '142K', reach: '1.4M' },
            ].map((s, i) => (
              <div key={i} className="border-b border-gray-50 last:border-0 pb-4 last:pb-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold text-gray-900">{s.name}</h4>
                    <p className="text-xs text-gray-500">{s.event}</p>
                  </div>
                  <span className="bg-green-50 text-green-600 px-2 py-1 rounded-md text-xs font-bold">{s.roi} ROI</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  <div>
                    <p className="text-gray-400">Impressions</p>
                    <p className="font-bold">{s.imp}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Engagement</p>
                    <p className="font-bold">{s.eng}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Reach</p>
                    <p className="font-bold">{s.reach}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Sentiment</p>
                    <span className="text-green-500 font-bold bg-green-50 px-1.5 rounded">positive</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* C. Sponsor Impressions Breakdown */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="font-serif font-bold text-lg text-gray-900 mb-4">Sponsor Impressions Breakdown</h3>
          <HorizontalBarChart />
        </div>
      </div>
    </div>
  );
};

// --- ACTIVATION PLANNER COMPONENT ---
const ActivationPlanner = () => {
  const [items, setItems] = useState(MOCK_PLANNER_ITEMS);
  const [newItem, setNewItem] = useState({ type: '', category: '', item: '', date: new Date() });
  const [showCalendar, setShowCalendar] = useState(false);

  const handleAddItem = () => {
    if (!newItem.type || !newItem.item) return;
    setItems([...items, { ...newItem, id: items.length + 1 }]);
    setNewItem({ type: '', category: '', item: '', date: new Date() });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left: Form */}
      <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm h-fit">
        <h3 className="font-serif font-bold text-xl mb-6">Plan Activation</h3>
        <div className="space-y-4">
          <Select 
            label="Activation Type"
            options={["Booth Setup", "Branding", "Tech", "Staffing", "Catering"]}
            value={newItem.type}
            onChange={(e) => setNewItem({...newItem, type: e.target.value})}
            className="bg-gray-50"
          />
          <Input 
            label="Category" 
            placeholder="e.g. Furniture, AV, Print" 
            value={newItem.category}
            onChange={(e) => setNewItem({...newItem, category: e.target.value})}
            className="bg-gray-50"
          />
          <Input 
            label="Item Details" 
            placeholder="e.g. White Lounge Sofa" 
            value={newItem.item}
            onChange={(e) => setNewItem({...newItem, item: e.target.value})}
            className="bg-gray-50"
          />
          
          <div className="relative">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1 mb-1.5 block">Required Date</label>
            <button 
              onClick={() => setShowCalendar(!showCalendar)}
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium flex items-center justify-between text-gray-700"
            >
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-purple-500" />
                {newItem.date.toLocaleDateString()}
              </div>
              <ChevronDown size={16} className="text-gray-400" />
            </button>
            {showCalendar && (
              <div className="absolute top-full left-0 z-20 mt-2">
                <CalendarPicker 
                  initialStart={newItem.date} 
                  initialEnd={null}
                  onClose={() => setShowCalendar(false)}
                  onApply={(start) => {
                    if (start) setNewItem({...newItem, date: start});
                    setShowCalendar(false);
                  }}
                />
              </div>
            )}
          </div>

          <Button fullWidth variant="primary" onClick={handleAddItem} className="mt-2">
            <Plus size={16} className="mr-2" /> Add to Plan
          </Button>
        </div>
      </div>

      {/* Right: Schedule List */}
      <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-serif font-bold text-xl">Activation Schedule</h3>
          <Button variant="white" size="sm" className="text-xs">Download PDF</Button>
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-purple-200 transition-all group">
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center bg-white p-2 rounded-xl border border-gray-200 min-w-[60px]">
                  <span className="text-xs font-bold text-purple-600 uppercase">{item.date.toLocaleDateString('en-US', { month: 'short' })}</span>
                  <span className="text-xl font-bold text-gray-900">{item.date.getDate()}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-gray-900">{item.type}</h4>
                    <span className="text-[10px] bg-white border border-gray-200 px-2 py-0.5 rounded-full text-gray-500 uppercase tracking-wide">{item.category}</span>
                  </div>
                  <p className="text-sm text-gray-600">{item.item}</p>
                </div>
              </div>
              <button className="p-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          {items.length === 0 && (
            <div className="text-center py-12 text-gray-400 border-2 border-dashed border-gray-200 rounded-2xl">
              No items planned yet. Use the form to add details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- 2. SPONSOR PORTAL ---
export const SponsorPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'planner'>('dashboard');

  return (
    <div className="animate-in fade-in duration-500 pb-20 font-sans">
      
      {/* 1. Hero Header Card */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-[2rem] p-8 md:p-12 text-white shadow-2xl mb-8 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                <div className="w-10 h-10 bg-blue-500 rotate-45 rounded-lg" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2">Sponsor Portal</h1>
                <p className="text-purple-100 text-lg">Welcome back, <span className="font-bold text-white">Chanel</span></p>
              </div>
            </div>
            <div className="flex flex-col items-end text-right bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
              <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest mb-1">
                <Calendar size={14} /> Paris Fashion Week SS25
              </div>
              <div className="text-xs text-purple-100 mb-2">Platinum Package • $500K</div>
              <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white w-3/4" />
              </div>
            </div>
          </div>

          {/* KPI Mini Cards inside Header */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SPONSOR_KPI_DATA.map((kpi, i) => (
              <div key={i} className="bg-white text-gray-900 p-4 rounded-2xl shadow-lg flex items-center gap-4">
                <div className={`p-3 rounded-xl ${kpi.color}`}>
                  <kpi.icon size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">{kpi.label}</p>
                  <p className="text-xl font-bold">{kpi.value}</p>
                  <p className="text-[10px] text-green-600 font-medium">{kpi.trend}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-4 mb-8 border-b border-gray-200 pb-1">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`pb-3 px-2 text-sm font-bold uppercase tracking-wider transition-colors border-b-2 ${activeTab === 'dashboard' ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
        >
          Overview
        </button>
        <button 
          onClick={() => setActiveTab('planner')}
          className={`pb-3 px-2 text-sm font-bold uppercase tracking-wider transition-colors border-b-2 ${activeTab === 'planner' ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
        >
          Activation Planner
        </button>
      </div>

      {/* 2. Main Content Body */}
      <FadeIn key={activeTab}>
        {activeTab === 'dashboard' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Deliverables (2/3 width) */}
            <div className="lg:col-span-2 space-y-8">
              
              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-2xl font-serif font-bold">Your Deliverables</h2>
                  <span className="text-xs font-bold bg-gray-100 text-gray-600 px-3 py-1 rounded-full">3 Pending</span>
                </div>
                <p className="text-gray-500 mb-8">Upload required assets and download event materials.</p>

                {/* A. Required Uploads */}
                <div className="space-y-6">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Required Uploads</h3>
                  {REQUIRED_UPLOADS.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-2xl border border-gray-100 hover:border-purple-100 hover:shadow-md transition-all bg-white group">
                      <div className="flex items-center gap-4 w-full sm:w-auto">
                        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-purple-50 transition-colors">
                          {item.status === 'completed' ? <CheckCircle className="text-green-500" size={24} /> : <Upload className="text-purple-500" size={24} />}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">{item.title}</h4>
                          <p className="text-xs text-gray-500">{item.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 w-full sm:w-auto mt-4 sm:mt-0 justify-between sm:justify-end">
                        <StatusBadge status={item.status} />
                        <Button variant={item.status === 'completed' ? 'outline' : 'primary'} size="sm" className={item.status === 'pending' ? "bg-[#ec4899] hover:bg-[#db2777] border-none text-white" : ""}>
                          {item.status === 'completed' ? 'View' : 'Upload'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* B. Available Downloads */}
                <div className="space-y-6 mt-10 pt-10 border-t border-gray-50">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Available Downloads</h3>
                  {AVAILABLE_DOWNLOADS.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-2xl border border-gray-100 hover:border-purple-100 hover:shadow-md transition-all bg-white group">
                      <div className="flex items-center gap-4 w-full sm:w-auto">
                        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                          <FileIcon type={item.type} />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">{item.title}</h4>
                          <p className="text-xs text-gray-500">{item.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 w-full sm:w-auto mt-4 sm:mt-0 justify-between sm:justify-end">
                        <StatusBadge status={item.status} />
                        <Button 
                          variant="primary" 
                          size="sm" 
                          className="bg-[#ec4899] hover:bg-[#db2777] border-none text-white disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={item.status === 'in-progress'}
                        >
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Activations & Actions (1/3 width) */}
            <div className="space-y-8">
              
              {/* Your Activations */}
              <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                <h3 className="font-serif font-bold text-xl mb-6">Your Activations</h3>
                <div className="space-y-4">
                  {SPONSOR_ACTIVATIONS.map((act) => (
                    <div key={act.id} className="p-4 border border-gray-100 rounded-2xl hover:shadow-md transition-all cursor-pointer group">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors">{act.name}</h4>
                        <StatusBadge status={act.status} />
                      </div>
                      <div className="text-xs text-gray-500 space-y-1">
                        <p className="flex items-center gap-2"><MapPin size={12} /> {act.location}</p>
                        <p className="flex items-center gap-2"><Calendar size={12} /> {act.date}</p>
                        <p className="flex items-center gap-2"><User size={12} /> {act.attendees}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                <h3 className="font-serif font-bold text-xl mb-6">Quick Actions</h3>
                <div className="space-y-3">
                  <Button fullWidth className="bg-[#ec4899] hover:bg-[#db2777] border-none text-white justify-center gap-2">
                    <Upload size={16} /> Upload Assets
                  </Button>
                  <Button fullWidth className="bg-[#c084fc] hover:bg-[#a855f7] border-none text-white justify-center gap-2">
                    <Download size={16} /> Download Reports
                  </Button>
                  <Button fullWidth variant="outline" className="justify-center gap-2">
                    <FileText size={16} /> View Contract
                  </Button>
                </div>
              </div>

              {/* Support Footer */}
              <div className="bg-purple-50 p-6 rounded-[2rem] border border-purple-100 text-center">
                <h4 className="font-serif font-bold text-lg text-purple-900 mb-2">Need Help?</h4>
                <p className="text-xs text-purple-700/70 mb-4">Our sponsorship team is here to assist you with any questions.</p>
                <Button variant="white" fullWidth className="text-purple-700 border-purple-200 hover:bg-white">
                  Contact Support
                </Button>
              </div>

            </div>
          </div>
        ) : (
          <ActivationPlanner />
        )}
      </FadeIn>
    </div>
  );
};
