import React, { useState, useEffect, useRef } from 'react';
import { NodeMetrics, ChartPoint, LatencyPoint } from './types';
import { ArcGauge } from './components/ArcGauge';
import { ExecutionChart } from './components/ExecutionChart';
import { FinalityChart } from './components/FinalityChart';
import { InfoCard } from './components/InfoCard';
import { 
  Server, 
  Database, 
  Clock, 
  Layers,
  Hash,
  Box,
  Activity
} from 'lucide-react';

const App: React.FC = () => {
  const [metrics, setMetrics] = useState<NodeMetrics>({
    nodeIdentity: '5ejjzCGpQTUETitTfXpWMzZ616cCjiMKotf6wa8...',
    uptime: '1:28:03',
    nodeShard: 68,
    totalShards: 96,
    proposalTime: new Date().toLocaleTimeString(),
    proposalHeight: '5,345 / 5,346',
    proposalSize: '0.19 MB',
    proposalHash: '00000000000014e1c0a3a12f7a4d9ae2ae9b673a9b45e4b4aa92a2bd378f3b57',
    shardTps: 5475,
    totalTps: 516230,
    localFinality: 14462,
    consensusFinality: 11153,
    phase: '288 ms',
    pendingTx: 12450,
    failedTx: 2,
    crossShard: 8943,
    txPerShard: 5377,
    totalTx: 892341223,
  });

  const [tpsHistory, setTpsHistory] = useState<ChartPoint[]>([]);
  const [latencyHistory, setLatencyHistory] = useState<LatencyPoint[]>([]);
  const [synced, setSynced] = useState(true);

  // Simulation Logic
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour12: true, hour: '2-digit', minute:'2-digit', second:'2-digit' });

      // Generate realistic noise
      const noise = Math.random();
      const sineWave = Math.sin(now.getTime() / 2000); 

      // TPS Calculation (Mocking high throughput)
      const baseTotalTps = 500000;
      const newTotalTps = Math.floor(baseTotalTps + (sineWave * 50000) + (noise * 10000));
      const newShardTps = Math.floor(newTotalTps / 96);

      // Latency Calculation
      const baseLatency = 12000;
      const newConsensusLatency = Math.floor(baseLatency + (sineWave * 2000) - (noise * 1000));
      const newLocalLatency = newConsensusLatency + Math.floor(Math.random() * 3000);

      // Update current metrics
      setMetrics(prev => ({
        ...prev,
        proposalTime: now.toLocaleString(),
        shardTps: newShardTps,
        totalTps: newTotalTps,
        localFinality: newLocalLatency,
        consensusFinality: newConsensusLatency,
        totalTx: prev.totalTx + newTotalTps,
        uptime: '1:28:' + now.getSeconds().toString().padStart(2, '0') // simple mock
      }));

      // Update Chart History (Keep last 30 points)
      const newChartPoint: ChartPoint = {
        time: timeStr,
        transfers: Math.floor(newTotalTps * 0.6),
        swaps: Math.floor(newTotalTps * 0.3),
        blobs: Math.floor(newTotalTps * 0.08),
        other: Math.floor(newTotalTps * 0.02),
      };

      const newLatencyPoint: LatencyPoint = {
        time: timeStr,
        consensus: newConsensusLatency,
        client: newLocalLatency,
      };

      setTpsHistory(prev => [...prev.slice(-30), newChartPoint]);
      setLatencyHistory(prev => [...prev.slice(-30), newLatencyPoint]);

    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen text-slate-200 p-4 md:p-6 relative overflow-x-hidden selection:bg-cyan-500/30">
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-[-1] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black"></div>
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150"></div>
      
      {/* --- HEADER --- */}
      <header className="mb-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 uppercase italic">
            Radix Hyperscale <span className="text-white not-italic text-sm bg-cyan-600 px-2 py-0.5 rounded ml-2 align-middle font-sans font-bold tracking-normal">ALPHA</span>
          </h1>
          <p className="text-slate-500 text-sm mt-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            System Operational
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
           {/* Total TPS Header Display */}
           <div className="flex items-center gap-3 bg-cyan-950/30 border border-cyan-500/30 px-4 py-2 rounded-lg shadow-[0_0_15px_rgba(8,145,178,0.2)] w-full sm:w-auto justify-between sm:justify-start">
             <div className="flex items-center gap-2">
               <Activity size={18} className="text-cyan-400" />
               <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total TPS</span>
             </div>
             <span className="text-xl md:text-2xl font-mono font-bold text-cyan-300">
               {metrics.totalTps.toLocaleString()}
             </span>
           </div>

           {/* Synced Status Indicator */}
           <div className="flex items-center gap-3 bg-slate-900/50 px-4 py-3 rounded-lg border border-slate-800 w-full sm:w-auto justify-center sm:justify-start">
              <div className={`w-3 h-3 rounded-full ${synced ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-red-500'}`}></div>
              <span className="text-sm font-bold uppercase tracking-wider text-slate-300">
                {synced ? 'Synced' : 'Not Synced'}
              </span>
           </div>
        </div>
      </header>

      {/* --- TOP METRICS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <InfoCard 
          label="Node Identity" 
          value={metrics.nodeIdentity} 
          icon={<Server size={14} className="text-cyan-400"/>}
        />
        <InfoCard 
          label="Node Uptime" 
          value={metrics.uptime} 
          icon={<Clock size={14} className="text-green-400"/>}
        />
        <InfoCard 
          label="Node Shard" 
          value={metrics.nodeShard} 
          subValue={`/ ${metrics.totalShards}`}
          icon={<Database size={14} className="text-purple-400"/>}
        />
        <InfoCard 
          label="Total Shards" 
          value={metrics.totalShards} 
          highlight
          icon={<Layers size={14} className="text-white"/>}
        />
      </div>

      {/* --- PROPOSAL DETAILS --- */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-900/40 p-2 rounded border-l-2 border-cyan-500 pl-4">
          <div className="text-slate-500 text-[10px] uppercase tracking-wider">Proposal Time</div>
          <div className="text-sm font-mono text-slate-300">{metrics.proposalTime}</div>
        </div>
        <div className="bg-slate-900/40 p-2 rounded border-l-2 border-slate-700 pl-4">
           <div className="text-slate-500 text-[10px] uppercase tracking-wider">Proposal Height</div>
           <div className="text-sm font-mono text-slate-300">{metrics.proposalHeight}</div>
        </div>
        <div className="bg-slate-900/40 p-2 rounded border-l-2 border-slate-700 pl-4">
           <div className="text-slate-500 text-[10px] uppercase tracking-wider">Proposal Size</div>
           <div className="text-sm font-mono text-slate-300">{metrics.proposalSize}</div>
        </div>
        <div className="bg-slate-900/40 p-2 rounded border-l-2 border-slate-700 pl-4 truncate">
           <div className="text-slate-500 text-[10px] uppercase tracking-wider">Proposal Hash</div>
           <div className="text-sm font-mono text-slate-300 truncate" title={metrics.proposalHash}>{metrics.proposalHash}</div>
        </div>
      </div>

      {/* --- MAIN DASHBOARD AREA --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* ROW 1: THROUGHPUT */}
        <div className="lg:col-span-3 glass-panel rounded-xl p-4 relative overflow-hidden">
          <ArcGauge 
            value={metrics.shardTps} 
            max={10000} 
            label="Shard Throughput" 
            unit="TPS"
            color="cyan"
          />
        </div>

        <div className="lg:col-span-3 glass-panel rounded-xl p-4 relative overflow-hidden">
          <ArcGauge 
            value={metrics.totalTps} 
            max={1000000} 
            label="Total Throughput" 
            unit="TPS"
            color="cyan"
          />
        </div>

        <div className="lg:col-span-6 glass-panel rounded-xl p-4 border border-slate-800">
          <ExecutionChart data={tpsHistory} />
        </div>

        {/* ROW 2: FINALITY */}
        <div className="lg:col-span-3 glass-panel rounded-xl p-4 border border-slate-800 relative overflow-hidden">
          <ArcGauge 
            value={metrics.localFinality} 
            max={20000} 
            label="Local Finality" 
            unit="ms"
            color="purple"
          />
        </div>

        <div className="lg:col-span-3 glass-panel rounded-xl p-4 border border-slate-800 relative overflow-hidden">
          <ArcGauge 
            value={metrics.consensusFinality} 
            max={20000} 
            label="Consensus Finality" 
            unit="ms"
            color="purple"
          />
        </div>

        <div className="lg:col-span-6 glass-panel rounded-xl p-4 border border-slate-800">
          <FinalityChart data={latencyHistory} />
        </div>

      </div>

      {/* --- FOOTER SPACER & METRICS --- */}
      {/* Extra spacer div to ensure content clears the fixed footer */}
      <div className="h-48 md:h-56 lg:h-64 pointer-events-none" aria-hidden="true"></div>

      <div className="fixed bottom-0 left-0 right-0 bg-slate-950/90 border-t border-slate-800 backdrop-blur-md p-2 z-50">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 max-w-[1920px] mx-auto text-center md:text-left">
            <FooterMetric label="Phase" value={metrics.phase} />
            <FooterMetric label="Pending Tx" value={metrics.pendingTx.toLocaleString()} color="text-amber-400" />
            <FooterMetric label="Failed Tx" value={metrics.failedTx} color="text-red-400" />
            <FooterMetric label="Cross Shard" value={metrics.crossShard.toLocaleString()} />
            <FooterMetric label="Tx / Shard" value={metrics.txPerShard.toLocaleString()} />
            <FooterMetric label="Total Transactions" value={metrics.totalTx.toLocaleString()} highlight />
        </div>
      </div>
    </div>
  );
};

// Helper for footer
const FooterMetric = ({ label, value, color = "text-slate-200", highlight = false }: { label: string, value: string | number, color?: string, highlight?: boolean }) => (
  <div className={`flex flex-col px-4 py-1 ${highlight ? 'bg-cyan-900/20 rounded border border-cyan-800/50' : ''}`}>
    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">{label}</span>
    <span className={`font-mono text-sm md:text-base font-bold ${color} truncate`}>{value}</span>
  </div>
);

export default App;