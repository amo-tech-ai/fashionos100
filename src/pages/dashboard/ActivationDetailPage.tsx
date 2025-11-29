
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  ArrowLeft, Calendar, MapPin, Users, DollarSign, CheckCircle, 
  Clock, Circle, FileText, Image as ImageIcon, Camera, File, 
  MoreHorizontal, ChevronRight
} from 'lucide-react';
import { FadeIn } from '../../components/FadeIn';
import { Button } from '../../components/Button';

// Mock Data based on the screenshot reference
const ACTIVATION_DATA = {
  id: 1,
  name: "VIP Lounge",
  sponsor: "Chanel",
  event: "Paris Fashion Week SS25",
  description: "Exclusive VIP lounge experience featuring Chanel branding, luxury seating, champagne bar, and private viewing area for runway shows. The space will be designed to reflect Chanel's timeless elegance and modern sophistication.",
  status: "in-progress",
  date: "Jan 15-23, 2026",
  location: "Grand Palais - VIP Area",
  attendees: "500",
  budget: "$150K",
  spent: 112500,
  totalBudget: 150000,
  progress: 75,
  tasksCompleted: 2,
  totalTasks: 6,
  tasks: [
    { id: 1, name: "Space Design & Layout", dept: "Design Team", due: "Dec 15, 2025", status: "completed" },
    { id: 2, name: "Furniture & Décor Setup", dept: "Events Team", due: "Jan 5, 2026", status: "completed" },
    { id: 3, name: "Branding Installation", dept: "Production Team", due: "Jan 12, 2026", status: "in-progress" },
    { id: 4, name: "F&B Coordination", dept: "Catering Team", due: "Jan 14, 2026", status: "in-progress" },
    { id: 5, name: "Staff Briefing", dept: "Operations Team", due: "Jan 14, 2026", status: "pending" },
    { id: 6, name: "Final Walkthrough", dept: "Project Manager", due: "Jan 14, 2026", status: "pending" }
  ],
  media: [
    { id: 1, name: "Floor Plan & Renders", due: "Dec 10, 2025", status: "delivered", type: "file" },
    { id: 2, name: "Branding Mockups", due: "Dec 20, 2025", status: "delivered", type: "image" },
    { id: 3, name: "Setup Photos", due: "Jan 13, 2026", status: "pending", type: "file" },
    { id: 4, name: "Event Day Photos", due: "Jan 24, 2026", status: "pending", type: "file" },
    { id: 5, name: "Post-Event Report", due: "Jan 30, 2026", status: "pending", type: "file" }
  ]
};

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    completed: "bg-green-100 text-green-700 border-green-200",
    delivered: "bg-green-100 text-green-700 border-green-200",
    "in-progress": "bg-amber-100 text-amber-700 border-amber-200",
    pending: "bg-blue-50 text-blue-600 border-blue-100",
  };
  
  const baseClass = "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border";
  const specificClass = styles[status.toLowerCase()] || "bg-gray-100 text-gray-600";

  return <span className={`${baseClass} ${specificClass}`}>{status}</span>;
};

const TaskIcon = ({ status }: { status: string }) => {
  if (status === 'completed') return <CheckCircle className="text-green-500" size={20} />;
  if (status === 'in-progress') return <Clock className="text-amber-500" size={20} />;
  return <Circle className="text-blue-300" size={20} />;
};

const MediaIcon = ({ type }: { type: string }) => {
  if (type === 'image') return <ImageIcon size={18} className="text-purple-600" />;
  if (type === 'camera') return <Camera size={18} className="text-purple-600" />;
  return <FileText size={18} className="text-gray-500" />;
};

export const ActivationDetailPage: React.FC = () => {
  const { id } = useParams();
  // In a real app, fetch data based on ID. For now using mock object.
  const data = ACTIVATION_DATA;

  return (
    <div className="animate-in fade-in duration-500 pb-20 font-sans">
      
      {/* 1. Back Navigation */}
      <div className="mb-6">
        <Link to="/dashboard/activations" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-fashion-black transition-colors">
          <ArrowLeft size={16} className="mr-2" /> Back to Activations
        </Link>
      </div>

      {/* 2. Activation Hero Card */}
      <FadeIn>
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mb-8 relative overflow-hidden">
          {/* Decorative background blob */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-50 rounded-full blur-3xl opacity-50 -mr-16 -mt-16 pointer-events-none" />
          
          <div className="relative z-10">
            {/* Header Row */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white border border-gray-100 rounded-2xl shadow-sm flex items-center justify-center p-3">
                   <img src="https://upload.wikimedia.org/wikipedia/en/thumb/9/92/Chanel_logo_interlocking_cs.svg/1200px-Chanel_logo_interlocking_cs.svg.png" alt="Logo" className="w-full h-full object-contain opacity-80" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h1 className="text-3xl font-serif font-bold text-gray-900">{data.name}</h1>
                    <StatusBadge status={data.status} />
                  </div>
                  <p className="text-gray-500 text-sm">{data.sponsor} • {data.event}</p>
                </div>
              </div>
              <div className="flex gap-3">
                 <Button variant="white" size="sm">Edit Details</Button>
                 <Button variant="primary" size="sm">View Contract</Button>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed max-w-4xl mb-8 text-sm md:text-base">
              {data.description}
            </p>

            {/* Info Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Event Date', value: data.date, icon: Calendar, color: 'bg-blue-50 text-blue-600' },
                { label: 'Location', value: data.location, icon: MapPin, color: 'bg-purple-50 text-purple-600' },
                { label: 'Expected Attendees', value: data.attendees, icon: Users, color: 'bg-pink-50 text-pink-600' },
                { label: 'Budget', value: data.budget, icon: DollarSign, color: 'bg-green-50 text-green-600' },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100 flex items-center gap-4 hover:bg-white hover:shadow-sm transition-all">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
                    <item.icon size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-0.5">{item.label}</p>
                    <p className="text-sm font-bold text-gray-900 truncate">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 3. Overall Progress Section */}
            <div className="mt-8 pt-8 border-t border-gray-100">
              <div className="flex justify-between items-end mb-3">
                <h3 className="font-serif font-bold text-xl">Overall Progress</h3>
                <span className="text-3xl font-bold text-gray-900">{data.progress}%</span>
              </div>
              
              <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden mb-4">
                <div 
                  className="h-full bg-gradient-to-r from-[#c084fc] to-[#ec4899] rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: `${data.progress}%` }}
                />
              </div>

              <div className="flex justify-between text-xs font-medium text-gray-500">
                <span>Budget Spent: ${data.spent.toLocaleString()} / ${data.totalBudget.toLocaleString()}</span>
                <span>{data.tasksCompleted} / {data.totalTasks} tasks completed</span>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* 4. Two-Column Layout: Tasks & Media */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Column 1: Tasks */}
        <FadeIn delay={100}>
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm h-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif font-bold text-2xl text-gray-900">Tasks & Milestones</h3>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {data.tasks.map((task) => (
                <div key={task.id} className="group flex items-start gap-4 p-4 rounded-2xl border border-gray-100 hover:border-purple-200 hover:bg-purple-50/30 transition-all cursor-pointer">
                  <div className="mt-1 shrink-0">
                    <TaskIcon status={task.status} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-gray-900 text-sm group-hover:text-purple-700 transition-colors">{task.name}</h4>
                      <StatusBadge status={task.status} />
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{task.dept}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span>Due: {task.due}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <Button variant="outline" size="sm" fullWidth>View All Tasks</Button>
            </div>
          </div>
        </FadeIn>

        {/* Column 2: Media Deliverables */}
        <FadeIn delay={200}>
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm h-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif font-bold text-2xl text-gray-900">Media Deliverables</h3>
              <Button variant="white" size="sm" className="text-xs h-8">
                + Add New
              </Button>
            </div>

            <div className="space-y-4">
              {data.media.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-md transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-gray-200 shadow-sm group-hover:border-purple-200 group-hover:text-purple-600 transition-colors">
                      <MediaIcon type={item.type} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-900 mb-0.5">{item.name}</h4>
                      <p className="text-xs text-gray-500">Due: {item.due}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={item.status} />
                    <ChevronRight size={16} className="text-gray-300 group-hover:text-purple-400 transition-colors" />
                  </div>
                </div>
              ))}
            </div>

            {/* Upload Area */}
            <div className="mt-8 pt-8 border-t border-gray-100">
              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center hover:border-purple-300 hover:bg-purple-50/30 transition-all cursor-pointer group">
                <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <File size={18} />
                </div>
                <p className="text-sm font-bold text-gray-700 mb-1">Upload Deliverables</p>
                <p className="text-xs text-gray-400">Drag & drop or click to browse</p>
              </div>
            </div>
          </div>
        </FadeIn>

      </div>
    </div>
  );
};
