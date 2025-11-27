
import React from 'react';
import { Check, RefreshCw, AlertTriangle, Maximize2, Eye } from 'lucide-react';
import { QAImage, QAMetrics } from '../../types/qa';
import { Button } from '../Button';

interface QACardProps {
  item: QAImage;
  onAction: (id: string, action: 'approve' | 'retouch' | 'pending') => void;
}

export const QACard: React.FC<QACardProps> = ({ item, onAction }) => {
  
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

  const isProcessed = item.status !== 'pending';

  return (
    <div className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden group ${
      item.status === 'approved' ? 'border-green-200 ring-2 ring-green-100 opacity-60' :
      item.status === 'retouch' ? 'border-yellow-200 ring-2 ring-yellow-100' :
      'border-gray-100 hover:shadow-lg'
    }`}>
      {/* Image Thumbnail */}
      <div className="relative aspect-[3/4] bg-gray-100">
        <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
        
        {/* Overlay Grade */}
        <div className="absolute top-3 right-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-serif font-bold text-lg border-2 shadow-sm ${getGradeColor(item.grade)}`}>
            {item.grade}
          </div>
        </div>

        {/* Processed Overlay */}
        {isProcessed && (
           <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] flex items-center justify-center">
              <div className={`px-4 py-2 rounded-full font-bold text-sm shadow-sm flex items-center gap-2 ${
                  item.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                  {item.status === 'approved' ? <Check size={16}/> : <RefreshCw size={16}/>}
                  {item.status === 'approved' ? 'Approved' : 'Queued for Retouch'}
              </div>
           </div>
        )}

        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
             <button className="w-full bg-black/70 backdrop-blur text-white py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-black">
                <Maximize2 size={14} /> View Full Res
             </button>
        </div>
      </div>

      {/* Metrics Body */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
           <div>
              <h4 className="font-bold text-gray-900 text-sm">{item.name}</h4>
              <p className="text-xs text-gray-400">Analyzed by Gemini Pro Vision</p>
           </div>
           <div className="text-right">
              <span className="text-2xl font-serif font-bold text-gray-900">{item.overall_score}</span>
              <span className="text-[10px] text-gray-400 block uppercase tracking-wider">Score</span>
           </div>
        </div>

        {/* Bars */}
        <div className="space-y-1 mb-4">
          {Object.entries(item.metrics).map(([key, val]) => (
            <MetricBar key={key} label={key} value={val} />
          ))}
        </div>

        {/* Issues Tags */}
        {item.detected_issues.length > 0 ? (
          <div className="mb-6 flex flex-wrap gap-2">
            {item.detected_issues.map((issue, i) => (
              <span key={i} className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-red-50 text-red-600 text-[10px] font-bold border border-red-100 uppercase tracking-wide">
                <AlertTriangle size={10} /> {issue}
              </span>
            ))}
          </div>
        ) : (
          <div className="mb-6 p-2 bg-green-50 text-green-700 text-xs font-medium rounded-lg flex items-center justify-center gap-2">
             <Check size={14} /> No issues detected
          </div>
        )}

        {/* Actions */}
        {!isProcessed ? (
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" size="sm" onClick={() => onAction(item.id, 'retouch')} className="border-yellow-200 text-yellow-700 hover:bg-yellow-50">
               <RefreshCw size={14} className="mr-2" /> Retouch
            </Button>
            <Button variant="primary" size="sm" onClick={() => onAction(item.id, 'approve')} className="bg-green-600 border-green-600 hover:bg-green-700">
               <Check size={14} className="mr-2" /> Accept
            </Button>
          </div>
        ) : (
            <div className="text-center">
                <button 
                    onClick={() => onAction(item.id, 'pending')}
                    className="text-xs text-gray-400 hover:text-black underline"
                >
                    Undo Decision
                </button>
            </div>
        )}
      </div>
    </div>
  );
};
