
import React from 'react';
import { Check, RefreshCw, AlertTriangle, X } from 'lucide-react';
import { QAImage } from '../../types/qa';
import { Button } from '../Button';

interface QACardProps {
  item: QAImage;
  onAction: (id: string, action: 'approve' | 'retouch' | 'pending') => void;
}

const getScoreColor = (score: number) => {
  if (score >= 90) return 'bg-green-500';
  if (score >= 75) return 'bg-yellow-500';
  return 'bg-red-500';
};

const getGradeColor = (grade: string) => {
  if (grade === 'A') return 'text-green-600 bg-green-50 border-green-200';
  if (grade === 'B') return 'text-yellow-600 bg-yellow-50 border-yellow-200';
  return 'text-red-600 bg-red-50 border-red-200';
};

const MetricBar = ({ label, value }: { label: string; value: number }) => (
  <div className="flex items-center gap-2 text-xs mb-1.5">
    <span className="w-20 text-gray-500 capitalize">{label.replace('_', ' ')}</span>
    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
      <div 
        className={`h-full rounded-full ${getScoreColor(value)}`} 
        style={{ width: `${value}%` }}
      />
    </div>
    <span className="w-6 text-right font-bold text-gray-700">{value}</span>
  </div>
);

export const QACard: React.FC<QACardProps> = ({ item, onAction }) => {
  const isProcessed = item.status !== 'pending';

  return (
    <div className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden group relative flex flex-col h-full ${
      item.status === 'approved' ? 'border-green-200 ring-2 ring-green-50 opacity-75 hover:opacity-100' :
      item.status === 'retouch' ? 'border-yellow-200 ring-2 ring-yellow-50 opacity-90 hover:opacity-100' :
      'border-gray-100 hover:shadow-xl'
    }`}>
      {/* Image Thumbnail */}
      <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
        <img 
            src={item.url} 
            alt={item.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        />
        
        {/* Overlay Grade */}
        <div className="absolute top-3 right-3 z-10">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-serif font-bold text-lg border-2 shadow-sm bg-white ${getGradeColor(item.grade)}`}>
            {item.grade}
          </div>
        </div>

        {/* Processed Overlay */}
        {isProcessed && (
           <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px] flex items-center justify-center z-20 pointer-events-none">
              <div className={`px-4 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-2 backdrop-blur-md ${
                  item.status === 'approved' ? 'bg-green-100/90 text-green-800 border border-green-200' : 'bg-yellow-100/90 text-yellow-800 border border-yellow-200'
              }`}>
                  {item.status === 'approved' ? <Check size={16}/> : <RefreshCw size={16}/>}
                  {item.status === 'approved' ? 'Ready for Delivery' : 'Retouch Queue'}
              </div>
           </div>
        )}
        
        {/* Hover Action: Undo */}
        {isProcessed && (
            <button 
                onClick={(e) => { e.stopPropagation(); onAction(item.id, 'pending'); }}
                className="absolute top-3 left-3 z-30 p-1.5 bg-white/80 hover:bg-white rounded-full text-gray-500 hover:text-black shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                title="Reset Status"
            >
                <X size={14} />
            </button>
        )}
      </div>

      {/* Metrics Body */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
           <div>
              <h4 className="font-bold text-gray-900 text-sm truncate pr-2">{item.name}</h4>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">AI Analysis</p>
           </div>
           <div className="text-right shrink-0">
              <span className={`text-2xl font-serif font-bold ${item.overall_score > 80 ? 'text-gray-900' : 'text-gray-500'}`}>{item.overall_score}</span>
              <span className="text-[9px] text-gray-400 block uppercase">Total</span>
           </div>
        </div>

        {/* Bars */}
        <div className="space-y-1.5 mb-4">
          {Object.entries(item.metrics).map(([key, val]) => (
            <MetricBar key={key} label={key} value={val as number} />
          ))}
        </div>

        {/* Issues Tags */}
        <div className="flex-grow mb-6">
            {item.detected_issues.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
                {item.detected_issues.map((issue, i) => (
                <span key={i} className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-red-50 text-red-600 text-[10px] font-bold border border-red-100 uppercase tracking-wide">
                    <AlertTriangle size={8} /> {issue}
                </span>
                ))}
            </div>
            ) : (
            <div className="p-2 bg-green-50 text-green-700 text-xs font-medium rounded-lg flex items-center justify-center gap-2 border border-green-100">
                <Check size={12} /> All checks passed
            </div>
            )}
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 mt-auto">
            <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onAction(item.id, 'retouch')} 
                className={`border-yellow-200 text-yellow-700 hover:bg-yellow-50 ${isProcessed && item.status !== 'retouch' ? 'opacity-50' : ''}`}
                disabled={isProcessed}
            >
               <RefreshCw size={14} className="mr-2" /> Retouch
            </Button>
            <Button 
                variant="primary" 
                size="sm" 
                onClick={() => onAction(item.id, 'approve')} 
                className={`bg-green-600 border-green-600 hover:bg-green-700 ${isProcessed && item.status !== 'approved' ? 'opacity-50' : ''}`}
                disabled={isProcessed}
            >
               <Check size={14} className="mr-2" /> Accept
            </Button>
        </div>
      </div>
    </div>
  );
};
