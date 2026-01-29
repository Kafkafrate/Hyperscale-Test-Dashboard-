import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { ChartPoint } from '../types';

interface Props {
  data: ChartPoint[];
}

export const ExecutionChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-full h-full flex flex-col min-h-[250px]">
      <div className="flex justify-between items-center mb-2 px-2">
        <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">Execution Throughput</h3>
        <div className="flex gap-4 text-xs">
           <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> Transfers</div>
           <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400"></span> Swaps</div>
           <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Blobs</div>
        </div>
      </div>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorTransfers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#34d399" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#34d399" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorSwaps" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#fbbf24" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
            <XAxis 
              dataKey="time" 
              stroke="#64748b" 
              tick={{fontSize: 10}} 
              interval="preserveStartEnd"
              tickMargin={10}
            />
            <YAxis 
              stroke="#64748b" 
              tick={{fontSize: 10}} 
              tickFormatter={(value) => value >= 1000 ? `${value / 1000}k` : value}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '4px' }}
              itemStyle={{ fontSize: '12px' }}
              labelStyle={{ color: '#94a3b8', fontSize: '11px', marginBottom: '4px' }}
            />
            <Area 
              type="monotone" 
              dataKey="transfers" 
              stackId="1" 
              stroke="#34d399" 
              fill="url(#colorTransfers)" 
              strokeWidth={2}
              animationDuration={500}
            />
            <Area 
              type="monotone" 
              dataKey="swaps" 
              stackId="1" 
              stroke="#fbbf24" 
              fill="url(#colorSwaps)" 
              strokeWidth={2}
              animationDuration={500}
            />
            <Area 
              type="monotone" 
              dataKey="blobs" 
              stackId="1" 
              stroke="#3b82f6" 
              fill="#3b82f6" 
              fillOpacity={0.1}
              strokeWidth={2}
              animationDuration={500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};