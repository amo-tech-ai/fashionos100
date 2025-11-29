
import React, { useState, useEffect, useRef } from 'react';

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

// --- Line Chart Component ---
export const ResponsiveLineChart: React.FC<ChartProps> = ({ 
  data, 
  height = 250, 
  color = '#8b5cf6',
  title
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger animation on mount
    setIsLoaded(true);
  }, []);

  if (!data || data.length === 0) return <div className="h-full flex items-center justify-center text-gray-400 text-sm">No data available</div>;

  const maxVal = Math.max(...data.map(d => d.value)) * 1.1 || 10;
  const minVal = 0;
  
  const getX = (index: number) => (index / (data.length - 1)) * 100;
  const getY = (value: number) => 100 - ((value - minVal) / (maxVal - minVal)) * 100;

  const points = data.map((d, i) => `${getX(i)},${getY(d.value)}`).join(' ');
  const areaPath = `${points} 100,100 0,100`;

  return (
    <div className="w-full flex flex-col h-full" ref={containerRef}>
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
          <polygon 
            points={areaPath} 
            fill={`url(#grad-${title?.replace(/\s/g, '') || 'chart'})`} 
            className={`transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          />

          {/* Line Path */}
          <path 
            d={`M${points.replace(/,/g, ' ').replace(/\s/g, ' L')}`} 
            fill="none" 
            stroke={color} 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            className={`transition-all duration-1000 ease-out ${isLoaded ? 'stroke-dashoffset-0' : 'stroke-dashoffset-full'}`}
            strokeDasharray="1000"
            strokeDashoffset={isLoaded ? 0 : 1000}
          />

          {/* Interactive Points */}
          {data.map((d, i) => (
            <g key={i}>
              <circle 
                cx={getX(i)} 
                cy={getY(d.value)} 
                r={hoverIndex === i ? "3" : "1.5"} 
                fill="white" 
                stroke={color} 
                strokeWidth="1.5"
                className="transition-all duration-200 cursor-pointer"
                style={{ opacity: isLoaded ? 1 : 0, transitionDelay: `${i * 50}ms` }}
              />
              {/* Invisible hit target for easier hovering */}
              <rect 
                x={getX(i) - 5} 
                y="0" 
                width="10" 
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
            className="absolute bg-gray-900 text-white text-xs py-1.5 px-3 rounded-lg shadow-xl pointer-events-none transform -translate-x-1/2 -translate-y-full z-20 transition-all duration-75"
            style={{ 
              left: `${(hoverIndex / (data.length - 1)) * 100}%`, 
              top: `${getY(data[hoverIndex].value)}%`,
              marginTop: '-12px'
            }}
          >
            <p className="font-bold text-sm">{data[hoverIndex].value.toLocaleString()}</p>
            <p className="text-[10px] opacity-80 uppercase tracking-wider">{data[hoverIndex].label}</p>
            {/* Arrow */}
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-gray-900"></div>
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
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

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
                  className="w-full rounded-t-md transition-all duration-500 ease-out relative hover:opacity-80 cursor-pointer"
                  style={{ 
                    height: isLoaded ? `${barHeight}%` : '0%', 
                    backgroundColor: color,
                    transitionDelay: `${i * 100}ms`
                  }}
                >
                   {/* Tooltip on hover */}
                   <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 whitespace-nowrap z-10 pointer-events-none shadow-lg">
                      <span className="font-bold">{d.value.toLocaleString()}</span>
                      <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-gray-900"></div>
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
