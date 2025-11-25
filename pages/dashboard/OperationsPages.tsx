
import React from 'react';
import { 
  FileText, CheckCircle, Image as ImageIcon, MapPin, Calendar, AlertCircle, 
  Upload, Download, ArrowRight, Clock, DollarSign, MoreHorizontal, File,
  Zap, Armchair, Sparkles, Store, Monitor, PartyPopper, Users, ChevronRight,
  Video, Camera, BarChart3, Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { FadeIn } from '../../components/FadeIn';
import { Button } from '../../components/Button';

// --- MOCK DATA FOR CONTRACTS ---
const KPI_STATS = [
  { label: 'Active Contracts', value: '2', icon: CheckCircle, color: 'text-green-600 bg-green-50' },
  { label: 'Pending Signature', value: '1', icon: Clock, color: 'text-amber-600 bg-amber-50' },
  { label: 'Payments Received', value: '1', icon: DollarSign, color: 'text-green-600 bg-green-50' },
  { label: 'Draft Contracts', value: '1', icon: FileText, color: 'text-gray-600 bg-gray-50' },
];

const SPONSOR_CONTRACTS = [
  {
    id: 1,
    sponsor: "Chanel",
    status: "active",
    event: "Paris Fashion Week SS25",
    package: "Platinum Package",
    value: "$500K",
    paymentStatus: "paid",
    signedDate: "Nov 1, 2025",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/92/Chanel_logo_interlocking_cs.svg/1200px-Chanel_logo_interlocking_cs.svg.png", 
    deliverables: [
      { name: "VIP Lounge Setup", due: "Jan 10, 2026", status: "completed" },
      { name: "Runway Branding", due: "Jan 14, 2026", status: "in-progress" },
      { name: "Social Media Content", due: "Jan 20, 2026", status: "pending" }
    ]
  },
  {
    id: 2,
    sponsor: "Dior",
    status: "pending signature",
    event: "Milan Digital Showcase",
    package: "Gold Package",
    value: "$300K",
    paymentStatus: "pending",
    signedDate: "Not signed yet",
    deliverables: [] 
  },
  {
    id: 3,
    sponsor: "Gucci",
    status: "active",
    event: "New York Designer Series",
    package: "Platinum Package",
    value: "$500K",
    paymentStatus: "partial",
    signedDate: "Oct 28, 2025",
    deliverables: [
      { name: "Exhibition Booth", due: "Mar 1, 2026", status: "in-progress" },
      { name: "Digital Campaign", due: "Mar 4, 2026", status: "pending" }
    ]
  },
  {
    id: 4,
    sponsor: "Louis Vuitton",
    status: "draft",
    event: "Paris Fashion Week SS25",
    package: "Gold Package",
    value: "$300K",
    paymentStatus: "pending",
    signedDate: "Not signed yet",
    deliverables: [] 
  }
];

const ACTIVATION_KPIS = [
  { label: 'Total Activations', value: '6', icon: Zap, color: 'text-gray-600 bg-gray-50' },
  { label: 'Completed', value: '1', icon: CheckCircle, color: 'text-green-600 bg-green-50' },
  { label: 'In Progress', value: '2', icon: Clock, color: 'text-amber-600 bg-amber-50' },
  { label: 'Planned', value: '3', icon: Calendar, color: 'text-blue-600 bg-blue-50' },
];

const ACTIVATIONS_LIST = [
  {
    id: 1,
    name: "VIP Lounge",
    sponsor: "Chanel",
    event: "Paris Fashion Week SS25",
    location: "Grand Palais - VIP Area",
    attendees: "500",
    budget: "$150K",
    completion: 75,
    status: "in-progress",
    icon: Armchair,
    iconBg: "bg-blue-50 text-blue-600"
  },
  {
    id: 2,
    name: "Runway Branding",
    sponsor: "Dior",
    event: "Paris Fashion Week SS25",
    location: "Main Runway",
    attendees: "1,200",
    budget: "$200K",
    completion: 100,
    status: "completed",
    icon: Sparkles,
    iconBg: "bg-yellow-50 text-yellow-600"
  },
  {
    id: 3,
    name: "Exhibition Booth",
    sponsor: "Gucci",
    event: "New York Designer Series",
    location: "Exhibition Hall A",
    attendees: "800",
    budget: "$180K",
    completion: 30,
    status: "planned",
    icon: Store,
    iconBg: "bg-green-50 text-green-600"
  },
  {
    id: 4,
    name: "Digital Showcase",
    sponsor: "Louis Vuitton",
    event: "Milan Digital Showcase",
    location: "Virtual Platform",
    attendees: "5,000",
    budget: "$250K",
    completion: 60,
    status: "in-progress",
    icon: Monitor,
    iconBg: "bg-gray-100 text-gray-600"
  },
  {
    id: 5,
    name: "VIP Lounge",
    sponsor: "Prada",
    event: "Milan Digital Showcase",
    location: "Palazzo Reale - Lounge",
    attendees: "300",
    budget: "$120K",
    completion: 20,
    status: "planned",
    icon: Armchair,
    iconBg: "bg-blue-50 text-blue-600"
  },
  {
    id: 6,
    name: "After Party",
    sponsor: "Hermès",
    event: "Paris Fashion Week SS25",
    location: "Musée Rodin",
    attendees: "400",
    budget: "$175K",
    completion: 45,
    status: "planned",
    icon: PartyPopper,
    iconBg: "bg-purple-50 text-purple-600"
  }
];

// --- MOCK DATA FOR MEDIA KANBAN ---
const MEDIA_DELIVERABLES = {
  requested: [
    { id: 101, title: "VIP Lounge Photos", sponsor: "Chanel", event: "Paris Fashion Week SS25", team: "Photo Team", due: "Jan 24, 2026", priority: "high", type: "image" },
    { id: 102, title: "Runway Video Highlight", sponsor: "Dior", event: "Paris Fashion Week SS25", team: "Video Team", due: "Jan 25, 2026", priority: "high", type: "video" },
    { id: 103, title: "Social Media Package", sponsor: "Gucci", event: "New York Designer Series", team: "Social Team", due: "Mar 10, 2026", priority: "medium", type: "doc" },
  ],
  inProduction: [
    { id: 201, title: "Booth Setup Photos", sponsor: "Louis Vuitton", event: "Milan Digital Showcase", team: "Photo Team", due: "Feb 12, 2026", priority: "medium", type: "image" },
    { id: 202, title: "Brand Impact Video", sponsor: "Prada", event: "Milan Digital Showcase", team: "Video Team", due: "Feb 14, 2026", priority: "high", type: "video" },
  ],
  inReview: [
    { id: 301, title: "Event Highlights Reel", sponsor: "Hermès", event: "Paris Fashion Week SS25", team: "Video Team", due: "Jan 27, 2026", priority: "high", type: "video" },
    { id: 302, title: "Analytics Report PDF", sponsor: "Chanel", event: "Paris Fashion Week SS25", team: "Analytics Team", due: "Jan 28, 2026", priority: "medium", type: "doc" },
  ],
  delivered: [
    { id: 401, title: "Pre-Event Promotional Photos", sponsor: "Chanel", event: "Paris Fashion Week SS25", team: "Photo Team", due: "Jan 10, 2026", priority: "high", type: "image" },
    { id: 402, title: "Sponsor Announcement Video", sponsor: "Dior", event: "Paris Fashion Week SS25", team: "Video Team", due: "Dec 20, 2025", priority: "medium", type: "video" },
    { id: 403, title: "Activation Photos", sponsor: "Gucci", event: "New York Designer Series", team: "Photo Team", due: "Mar 8, 2026", priority: "medium", type: "image" },
  ]
};

// --- HELPER COMPONENTS ---

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    active: "bg-green-100 text-green-700 border-green-200",
    completed: "bg-green-100 text-green-700 border-green-200",
    paid: "bg-green-100 text-green-700 border-green-200",
    "pending signature": "bg-amber-100 text-amber-700 border-amber-200",
    pending: "bg-blue-50 text-blue-600 border-blue-100",
    "in-progress": "bg-amber-50 text-amber-600 border-amber-100",
    partial: "bg-amber-100 text-amber-700 border-amber-200",
    draft: "bg-gray-100 text-gray-600 border-gray-200",
    planned: "bg-blue-50 text-blue-600 border-blue-100",
  };

  const baseClass = "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border";
  const specificClass = styles[status.toLowerCase()] || styles.draft;

  return <span className={`${baseClass} ${specificClass}`}>{status}</span>;
};

const PriorityBadge = ({ priority }: { priority: string }) => {
  const styles = {
    high: "bg-pink-100 text-pink-700 border-pink-200",
    medium: "bg-amber-100 text-amber-700 border-amber-200",
    low: "bg-blue-50 text-blue-600 border-blue-100",
  };
  return <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${styles[priority as keyof typeof styles]}`}>{priority}</span>;
};

const MediaTypeIcon = ({ type }: { type: string }) => {
  const styles = {
    image: { icon: ImageIcon, color: "bg-purple-50 text-purple-600" },
    video: { icon: Video, color: "bg-blue-50 text-blue-600" },
    doc: { icon: FileText, color: "bg-green-50 text-green-600" },
  };
  const Config = styles[type as keyof typeof styles] || styles.doc;
  const Icon = Config.icon;
  
  return (
    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${Config.color}`}>
      <Icon size={16} />
    </div>
  );
};

const KanbanCard = ({ item }: { item: any }) => (
  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
    <div className="flex justify-between items-start mb-3">
      <MediaTypeIcon type={item.type} />
      <PriorityBadge priority={item.priority} />
    </div>
    <h4 className="font-serif font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">{item.title}</h4>
    <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">{item.sponsor}</p>
    <p className="text-xs text-gray-500 mb-3 line-clamp-1">{item.event}</p>
    
    <div className="pt-3 border-t border-gray-50 flex justify-between items-center">
      <span className="flex items-center gap-1.5 text-xs text-gray-500">
        <Users size={12} /> {item.team}
      </span>
      <span className="flex items-center gap-1.5 text-xs text-gray-500">
        <Calendar size={12} /> {item.due}
      </span>
    </div>
  </div>
);

// --- 1. CONTRACTS PAGE ---
export const DashboardContracts: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-700 pb-20 font-sans">
      
      {/* 1. HEADER AREA */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">Contracting & Agreements</h1>
          <p className="text-gray-500">Manage sponsorship contracts and track deliverables</p>
        </div>
        <Button className="bg-[#ec4899] hover:bg-[#db2777] text-white border-none shadow-lg shadow-pink-500/20 gap-2 px-6 rounded-lg">
          <Upload size={16} /> Upload Contract
        </Button>
      </div>

      {/* 2. KPI SUMMARY ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {KPI_STATS.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-32 relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-24 h-24 rounded-full opacity-10 -mr-6 -mt-6 transition-transform group-hover:scale-110 ${stat.color.split(' ')[1]}`}></div>
            <div className="flex justify-between items-start relative z-10">
              <div className={`p-3 rounded-xl ${stat.color}`}>
                <stat.icon size={20} />
              </div>
            </div>
            <div className="relative z-10">
              <p className="text-gray-500 text-xs font-medium mb-1">{stat.label}</p>
              <h3 className="text-3xl font-serif font-bold text-gray-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* 3. CONTRACT BLOCKS */}
      <div className="space-y-6">
        {SPONSOR_CONTRACTS.map((contract) => (
          <FadeIn key={contract.id}>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              
              {/* A. Sponsor Header Row */}
              <div className="p-6 md:p-8 border-b border-gray-50 bg-gradient-to-r from-pink-50/30 to-transparent">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-sm text-xl font-serif font-bold text-gray-300">
                      {contract.logo ? (
                         <FileText size={24} className="text-gray-400" />
                      ) : (
                         contract.sponsor[0]
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-2xl font-serif font-bold text-gray-900">{contract.sponsor}</h3>
                        <StatusBadge status={contract.status} />
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                        <span>{contract.event}</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span>{contract.package}</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span className="text-green-600 font-bold">{contract.value}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-200">
                      <Download size={18} />
                    </button>
                    <Button size="sm" className="bg-[#ec4899] hover:bg-[#db2777] text-white border-none rounded-lg px-6">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>

              {/* 4. Contract Status Strip */}
              <div className="px-6 md:px-8 py-4 bg-white border-b border-gray-50 flex flex-wrap gap-x-12 gap-y-4">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Contract Status</p>
                  <StatusBadge status={contract.status} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Payment Status</p>
                  <StatusBadge status={contract.paymentStatus} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Signed Date</p>
                  <p className="text-sm font-medium text-gray-700">{contract.signedDate}</p>
                </div>
              </div>

              {/* 5 & 6. Deliverables & Empty State */}
              <div className="p-6 md:p-8">
                <h4 className="font-serif font-bold text-lg text-gray-900 mb-6">Deliverables Tracking</h4>
                
                {contract.deliverables.length > 0 ? (
                  <div className="space-y-3">
                    {contract.deliverables.map((item, idx) => (
                      <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50/50 transition-all">
                        <div className="flex items-center gap-4 mb-2 sm:mb-0">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${item.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                            {item.status === 'completed' ? <CheckCircle size={16} /> : <Clock size={16} />}
                          </div>
                          <div>
                            <p className="font-bold text-sm text-gray-900">{item.name}</p>
                            <p className="text-xs text-gray-500">Due: {item.due}</p>
                          </div>
                        </div>
                        <StatusBadge status={item.status} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-10 text-center border-2 border-dashed border-gray-100 rounded-xl bg-gray-50/30">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
                      <File size={24} />
                    </div>
                    <p className="text-gray-900 font-medium mb-1">Contract is in draft</p>
                    <p className="text-sm text-gray-500">No deliverables assigned yet.</p>
                  </div>
                )}
              </div>

            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
};

// --- 2. ACTIVATIONS PAGE ---
export const DashboardActivations: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-700 pb-20 font-sans">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">Brand Activations</h1>
          <p className="text-gray-500">Manage sponsor activations and experiences</p>
        </div>
        <Button className="bg-[#ec4899] hover:bg-[#db2777] text-white border-none shadow-lg shadow-pink-500/20 gap-2 px-6 rounded-lg">
          <Zap size={16} /> Create Activation
        </Button>
      </div>

      {/* 2. KPI Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {ACTIVATION_KPIS.map((kpi, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${kpi.color}`}>
                <kpi.icon size={20} />
              </div>
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">{kpi.label}</p>
                <h3 className="text-2xl font-serif font-bold text-gray-900">{kpi.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Activation Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {ACTIVATIONS_LIST.map((act, i) => (
          <FadeIn key={act.id} delay={i * 50}>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all p-6 flex flex-col h-full">
              
              {/* A. Activation Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${act.iconBg}`}>
                    <act.icon size={22} />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-xl text-gray-900">{act.name}</h3>
                    <p className="text-sm text-gray-500">{act.sponsor}</p>
                  </div>
                </div>
                <StatusBadge status={act.status} />
              </div>

              {/* B. Activation Details Block */}
              <div className="bg-gray-50/50 rounded-xl p-4 mb-6 space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Calendar size={16} className="text-gray-400" />
                  <span className="font-medium">Event:</span> {act.event}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <MapPin size={16} className="text-gray-400" />
                  <span className="font-medium">Location:</span> {act.location}
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-100 mt-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Users size={16} className="text-gray-400" />
                    <span className="text-gray-500 text-xs uppercase font-bold tracking-wide">Attendees</span>
                    <span className="font-bold text-gray-900">{act.attendees}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign size={16} className="text-gray-400" />
                    <span className="text-gray-500 text-xs uppercase font-bold tracking-wide">Budget</span>
                    <span className="font-bold text-gray-900">{act.budget}</span>
                  </div>
                </div>
              </div>

              {/* C. Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Completion</span>
                  <span className="text-sm font-bold text-purple-600">{act.completion}%</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${act.status === 'completed' ? 'bg-green-500' : 'bg-[#c084fc]'}`} 
                    style={{ width: `${act.completion}%` }}
                  />
                </div>
              </div>

              {/* D. Bottom Action Area */}
              <div className="mt-auto">
                <Link to={`/dashboard/activations/${act.id}`} className="w-full py-2.5 border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 hover:text-black transition-colors flex items-center justify-center gap-2">
                  View Details <ChevronRight size={14} />
                </Link>
              </div>

            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
};

// --- 3. MEDIA DELIVERABLES BOARD ---
export const DashboardMedia: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-700 pb-20 font-sans h-full flex flex-col">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">Media Deliverables Board</h1>
          <p className="text-gray-500">Track and manage sponsor media deliverables</p>
        </div>
        <Button className="bg-[#ec4899] hover:bg-[#db2777] text-white border-none shadow-lg shadow-pink-500/20 gap-2 px-6 rounded-lg">
          <Plus size={16} /> New Deliverable
        </Button>
      </div>

      {/* 2. KPI Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Requested', count: 3 },
          { label: 'In Production', count: 2 },
          { label: 'In Review', count: 2 },
          { label: 'Delivered', count: 3 },
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-sm font-medium text-gray-500">{kpi.label}</p>
            <h3 className="text-3xl font-serif font-bold text-gray-900">{kpi.count}</h3>
          </div>
        ))}
      </div>

      {/* 3. Kanban Board */}
      <div className="flex-grow overflow-x-auto pb-4">
        <div className="flex flex-col md:flex-row gap-6 min-w-full md:min-w-[1000px]">
          
          {/* Column: Requested */}
          <div className="flex-1 min-w-[280px]">
            <div className="flex justify-between items-center mb-4 px-1">
              <h3 className="font-serif font-bold text-lg">Requested</h3>
              <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded-full">3</span>
            </div>
            <div className="space-y-4">
              {MEDIA_DELIVERABLES.requested.map((item) => (
                <KanbanCard key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Column: In Production */}
          <div className="flex-1 min-w-[280px]">
            <div className="flex justify-between items-center mb-4 px-1">
              <h3 className="font-serif font-bold text-lg">In Production</h3>
              <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded-full">2</span>
            </div>
            <div className="space-y-4">
              {MEDIA_DELIVERABLES.inProduction.map((item) => (
                <KanbanCard key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Column: In Review */}
          <div className="flex-1 min-w-[280px]">
            <div className="flex justify-between items-center mb-4 px-1">
              <h3 className="font-serif font-bold text-lg">In Review</h3>
              <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded-full">2</span>
            </div>
            <div className="space-y-4">
              {MEDIA_DELIVERABLES.inReview.map((item) => (
                <KanbanCard key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Column: Delivered */}
          <div className="flex-1 min-w-[280px]">
            <div className="flex justify-between items-center mb-4 px-1">
              <h3 className="font-serif font-bold text-lg">Delivered</h3>
              <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded-full">3</span>
            </div>
            <div className="space-y-4">
              {MEDIA_DELIVERABLES.delivered.map((item) => (
                <KanbanCard key={item.id} item={item} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
