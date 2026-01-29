import React from 'react';

interface InfoCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  icon?: React.ReactNode;
  highlight?: boolean;
}

export const InfoCard: React.FC<InfoCardProps> = ({ label, value, subValue, icon, highlight }) => {
  return (
    <div className={`glass-panel p-3 rounded-md flex flex-col justify-between h-full ${highlight ? 'border-cyan-500/30 bg-cyan-950/20' : 'border-slate-800'}`}>
      <div className="text-slate-500 text-xs uppercase font-bold tracking-widest mb-1 flex items-center gap-2">
        {icon}
        {label}
      </div>
      <div className="flex items-baseline gap-2 overflow-hidden">
        <span className={`text-lg md:text-xl font-mono font-bold truncate ${highlight ? 'text-cyan-400' : 'text-slate-200'}`}>
          {value}
        </span>
        {subValue && (
          <span className="text-xs text-slate-500 font-mono truncate">
            {subValue}
          </span>
        )}
      </div>
    </div>
  );
};