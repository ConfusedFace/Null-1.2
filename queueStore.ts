import { create } from 'zustand';

export interface GenerationJob {
  id: string;
  prompt: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  error?: string;
}

interface QueueState {
  jobs: GenerationJob[];
  queueDepth: number;
  averageWaitTime: number;
  addJob: (job: GenerationJob) => void;
  updateJob: (id: string, updates: Partial<GenerationJob>) => void;
  removeJob: (id: string) => void;
  setQueueStatus: (depth: number, waitTime: number) => void;
}

export const useQueueStore = create<QueueState>((set) => ({
  jobs: [],
  queueDepth: 0,
  averageWaitTime: 0,
  addJob: (job) => set((state) => ({ jobs: [...state.jobs, job] })),
  updateJob: (id, updates) => set((state) => ({
    jobs: state.jobs.map(job => job.id === id ? { ...job, ...updates } : job)
  })),
  removeJob: (id) => set((state) => ({
    jobs: state.jobs.filter(job => job.id !== id)
  })),
  setQueueStatus: (depth, waitTime) => set({ queueDepth: depth, averageWaitTime: waitTime }),
}));
