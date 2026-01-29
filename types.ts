export interface ChartPoint {
  time: string;
  transfers: number;
  swaps: number;
  blobs: number;
  other: number;
}

export interface LatencyPoint {
  time: string;
  consensus: number;
  client: number;
}

export interface NodeMetrics {
  nodeIdentity: string;
  uptime: string;
  nodeShard: number;
  totalShards: number;
  proposalTime: string;
  proposalHeight: string;
  proposalSize: string;
  proposalHash: string;
  shardTps: number;
  totalTps: number;
  localFinality: number;
  consensusFinality: number;
  phase: string;
  pendingTx: number;
  failedTx: number;
  crossShard: number;
  txPerShard: number;
  totalTx: number;
}