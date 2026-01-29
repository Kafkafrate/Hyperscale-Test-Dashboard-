import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { LatencyPoint } from '../types';

interface Props {
  data: LatencyPoint[];
}

export const FinalityChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-full h-full flex flex-col min-h-[250px]">
      <div className="flex justify-between items-center mb-2 px-2">
        <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">Finality Latency (ms)</h3>
      </div>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
            <XAxis 
              dataKey="time" 
              stroke="#64748b" 
              tick={{fontSize: 10}}
              tickMargin={10} 
            />
            <YAxis 
              stroke="#64748b" 
              tick={{fontSize: 10}}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '4px' }}
              itemStyle={{ fontSize: '12px' }}
              labelStyle={{ color: '#94a3b8', fontSize: '11px', marginBottom: '4px' }}
            />
            <Legend wrapperStyle={{fontSize: '12px', paddingTop: '10px'}} />
            <Line 
              type="monotone" 
              dataKey="consensus" 
              stroke="#f97316" 
              strokeWidth={2} 
              dot={false}
              activeDot={{ r: 4, fill: '#f97316' }}
              isAnimationActive={false} // Performance optimization for real-time
            />
            <Line 
              type="monotone" 
              dataKey="client" 
              stroke="#2dd4bf" 
              strokeWidth={2} 
              dot={false}
              activeDot={{ r: 4, fill: '#2dd4bf' }}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};