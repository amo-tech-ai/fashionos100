
import React from 'react';

// --- Line Chart ---
interface LineChartProps {
  data: number[];
  labels: string[];
  height?: number;
  color?: string;
}

export const SimpleLineChart: React.FC<LineChartProps> = ({ 
  data, 
  labels, 
  height = 200, 
  color = '#c084fc' 
}) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  
  const points = data.map((val, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((val - min) / range) * 80 - 10; // 10% padding top/bottom
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="w-full relative" style={{ height }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
        {/* Gradient Definition */}
        <defs>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Area */}
        <path 
          d={`M0,100 L${points.replace(/,/g, ' ')} L100,100 Z`} 
          fill="url(#lineGradient)" 
          stroke="none"
        />
        
        {/* Line */}
        <polyline 
          points={points} 
          fill="none" 
          stroke={color} 
          strokeWidth="2" 
          vectorEffect="non-scaling-stroke" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        
        {/* Points */}
        {data.map((val, i) => {
           const x = (i / (data.length - 1)) * 100;
           const y = 100 - ((val - min) / range) * 80 - 10;
           return (
             <circle key={i} cx={x} cy={y} r="1.5" fill="#fff" stroke={color} strokeWidth="1" className="hover:r-3 transition-all" />
           );
        })}
      </svg>
      
      {/* X-Axis Labels */}
      <div className="flex justify-between mt-2 px-1">
        {labels.map((label, i) => (
          <span key={i} className="text-[10px] text-gray-400">{label}</span>
        ))}
      </div>
    </div>
  );
};

// --- Donut Chart ---
interface DonutSegment {
  label: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  data: DonutSegment[];
  size?: number;
}

export const SimpleDonutChart: React.FC<DonutChartProps> = ({ data, size = 160 }) => {
  const total = data.reduce((acc, curr) => acc + curr.value, 0);
  let cumulativePercent = 0;

  function getCoordinatesForPercent(percent: number) {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  }

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg viewBox="-1 -1 2 2" className="transform -rotate-90 w-full h-full">
        {data.map((segment, i) => {
          const startPercent = cumulativePercent;
          const slicePercent = segment.value / total;
          cumulativePercent += slicePercent;
          const endPercent = cumulativePercent;

          const [startX, startY] = getCoordinatesForPercent(startPercent);
          const [endX, endY] = getCoordinatesForPercent(endPercent);
          const largeArcFlag = slicePercent > 0.5 ? 1 : 0;

          const pathData = `M ${startX} ${startY} A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY} L 0 0`;

          // Handle single item case (full circle)
          if (data.length === 1) {
             return <circle key={i} cx="0" cy="0" r="1" fill={segment.color} />;
          }

          return (
            <path
              key={i}
              d={pathData}
              fill={segment.color}
              stroke="white"
              strokeWidth="0.05"
            />
          );
        })}
        <circle cx="0" cy="0" r="0.6" fill="white" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
         <span className="text-xs text-gray-400 font-medium uppercase">Total</span>
         <span className="text-lg font-bold text-gray-900">{total.toLocaleString()}</span>
      </div>
    </div>
  );
};
