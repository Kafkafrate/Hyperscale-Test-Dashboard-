import React from 'react';

interface ArcGaugeProps {
  value: number;
  max: number;
  label: string;
  unit: string;
  color: 'cyan' | 'purple';
}

export const ArcGauge: React.FC<ArcGaugeProps> = ({ value, max, label, unit, color }) => {
  // SVG Configuration
  // Increased radius further to 130 to make pies larger and fill the card
  const radius = 130; 
  const stroke = 16;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  // We want a semi-circle (arch) roughly 220 degrees
  const arcLength = circumference * 0.6; 
  const strokeDashoffset = arcLength - (Math.min(value, max) / max) * arcLength;
  
  // Rotation to position the arc correctly (open at bottom)
  const rotation = 145; // degrees

  const primaryColor = color === 'cyan' ? '#22d3ee' : '#c084fc';
  
  return (
    <div className="flex flex-col items-center justify-center relative w-full h-full min-h-[280px]">
      <div className="absolute top-4 left-6 text-slate-400 text-sm font-medium uppercase tracking-wider">
        {label}
      </div>
      
      <div className="relative flex items-center justify-center">
        <svg
          height={radius * 2.2}
          width={radius * 2.2}
          className="transform rotate-[0deg] translate-y-6"
          viewBox={`0 0 ${radius * 2} ${radius * 2}`}
          style={{ overflow: 'visible' }}
        >
          {/* Gradient Definition - No filters/glow */}
          <defs>
            <linearGradient id={`grad-${color}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={color === 'cyan' ? '#0891b2' : '#7e22ce'} />
              <stop offset="100%" stopColor={primaryColor} />
            </linearGradient>
          </defs>

          {/* Background Track */}
          <circle
            stroke="#1e293b"
            strokeWidth={stroke}
            strokeDasharray={`${arcLength} ${circumference}`}
            style={{ strokeDashoffset: 0, transform: `rotate(${rotation}deg)`, transformOrigin: '50% 50%' }}
            r={normalizedRadius}
            cx="50%"
            cy="50%"
            fill="transparent"
            strokeLinecap="round"
          />

          {/* Value Arc */}
          <circle
            stroke={`url(#grad-${color})`}
            strokeWidth={stroke}
            strokeDasharray={`${arcLength} ${circumference}`}
            style={{ 
              strokeDashoffset, 
              transform: `rotate(${rotation}deg)`, 
              transformOrigin: '50% 50%',
              transition: 'stroke-dashoffset 0.5s ease-out'
            }}
            r={normalizedRadius}
            cx="50%"
            cy="50%"
            fill="transparent"
            strokeLinecap="round"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2 text-center">
          <div className={`text-5xl font-bold font-mono tracking-tighter ${color === 'cyan' ? 'text-cyan-400' : 'text-purple-400'}`}>
            {value.toLocaleString()}
          </div>
          <div className="text-slate-400 font-bold text-sm mt-1">{unit}</div>
        </div>
      </div>
    </div>
  );
};