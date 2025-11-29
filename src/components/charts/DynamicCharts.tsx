
import React, { useState } from 'react';

// --- Types ---
interface ChartDataPoint {
  label: string;
  value: number;
  tooltip?: string;
}

interface ChartProps {
  data: ChartDataPoint[];
  height?: number;
  color?: string;
  title?: string;
}

// --- Helper to format numbers ---
const formatValue = (val: number) => {
  if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
  if (val >= 1000) return `${(val / 1000).toFixed(1)}k`;
  return val.toString();
};

// --- Line Chart Component ---
export const ResponsiveLineChart: React.FC<ChartProps> = ({ 
  data, 
  height = 250, 
  color = '#8b5cf6',
  title
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  if (!data || data.length === 0) return <div className="h-full flex items-center justify-center text-gray-400 text-sm">No data available</div>;

  const maxVal = Math.max(...data.map(d => d.value)) * 1.1 || 10;
  const minVal = 0;
  
  const getX = (index: number) => (index / (data.length - 1)) * 100;
  const getY = (value: number) => 100 - ((value - minVal) / (maxVal - minVal)) * 100;

  const points = data.map((d, i) => `${getX(i)},${getY(d.value)}`).join(' ');
  const areaPath = `${points} 100,100 0,100`;

  return (
    <div className="w-full flex flex-col h-full">
      {title && <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">{title}</h4>}
      <div className="relative flex-grow" style={{ height }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
          {/* Grid Lines */}
          {[0, 25, 50, 75, 100].map(y => (
            <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#f3f4f6" strokeWidth="0.5" />
          ))}

          {/* Area Fill */}
          <defs>
            <linearGradient id={`grad-${title?.replace(/\s/g, '') || 'chart'}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.2" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points={areaPath} fill={`url(#grad-${title?.replace(/\s/g, '') || 'chart'})`} />

          {/* Line Path */}
          <polyline 
            points={points} 
            fill="none" 
            stroke={color} 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />

          {/* Interactive Points */}
          {data.map((d, i) => (
            <g key={i}>
              <circle 
                cx={getX(i)} 
                cy={getY(d.value)} 
                r="1.5" 
                fill="white" 
                stroke={color} 
                strokeWidth="1"
                className="transition-all duration-200"
                style={{ r: hoverIndex === i ? 3 : 1.5 }}
              />
              {/* Invisible hit target for easier hovering */}
              <rect 
                x={getX(i) - 2} 
                y="0" 
                width="4" 
                height="100" 
                fill="transparent" 
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
                className="cursor-pointer"
              />
            </g>
          ))}
        </svg>

        {/* Tooltip */}
        {hoverIndex !== null && (
          <div 
            className="absolute bg-gray-900 text-white text-xs py-1 px-2 rounded shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-full z-10"
            style={{ 
              left: `${(hoverIndex / (data.length - 1)) * 100}%`, 
              top: `${getY(data[hoverIndex].value)}%`,
              marginTop: '-8px'
            }}
          >
            <p className="font-bold">{data[hoverIndex].value.toLocaleString()}</p>
            <p className="text-[9px] opacity-80">{data[hoverIndex].label}</p>
          </div>
        )}
      </div>
      
      {/* X Axis Labels */}
      <div className="flex justify-between mt-2 text-[10px] text-gray-400 px-1">
        {data.filter((_, i) => i % Math.ceil(data.length / 6) === 0).map((d, i) => (
          <span key={i}>{d.label}</span>
        ))}
      </div>
    </div>
  );
};

// --- Bar Chart Component ---
export const ResponsiveBarChart: React.FC<ChartProps> = ({ 
  data, 
  height = 250, 
  color = '#ec4899',
  title
}) => {
  if (!data || data.length === 0) return <div className="h-full flex items-center justify-center text-gray-400 text-sm">No data available</div>;

  const maxVal = Math.max(...data.map(d => d.value)) * 1.1 || 10;
  
  return (
    <div className="w-full flex flex-col h-full">
      {title && <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">{title}</h4>}
      <div className="flex items-end justify-between gap-2 relative" style={{ height }}>
        {/* Y Axis Grid lines background */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
           {[...Array(5)].map((_, i) => (
             <div key={i} className="w-full border-t border-gray-50 h-0" />
           ))}
        </div>

        {data.map((d, i) => {
           const barHeight = (d.value / maxVal) * 100;
           return (
             <div key={i} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                <div 
                  className="w-full bg-opacity-20 rounded-t-md transition-all duration-300 group-hover:opacity-100 relative"
                  style={{ height: `${barHeight}%`, backgroundColor: color }}
                >
                   {/* Tooltip on hover */}
                   <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                      {d.value.toLocaleString()}
                   </div>
                </div>
                <span className="text-[10px] text-gray-400 mt-2 truncate w-full text-center block">{d.label}</span>
             </div>
           );
        })}
      </div>
    </div>
  );
};
