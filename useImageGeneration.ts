import { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useQueueStore, type GenerationJob } from '../store/queueStore';
import { useImageStore } from '../store/imageStore';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export function useImageGeneration() {
  const [_, setSocket] = useState<Socket | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 100, message: '' });
  const [error, setError] = useState<string | null>(null);
  const [currentImages, setCurrentImages] = useState<Array<{ src: string; text: string; cached?: boolean; jobId: string }>>([]);
  const activeJobIdsRef = useRef<Set<string>>(new Set());
  
  const addJob = useQueueStore(state => state.addJob);
  const updateJob = useQueueStore(state => state.updateJob);
  const setQueueStatus = useQueueStore(state => state.setQueueStatus);
  const addImageToStore = useImageStore(state => state.addImage);

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const newSocket = io(API_URL);
    setSocket(newSocket);

    newSocket.on('queue:updated', ({ queueDepth, averageWaitTime }) => {
      setQueueStatus(queueDepth, averageWaitTime);
    });

    newSocket.on('job:queued', (job: GenerationJob) => {
      addJob(job);
    });

    newSocket.on('job:started', (job: GenerationJob) => {
      updateJob(job.id, { status: 'processing' });
      if (activeJobIdsRef.current.has(job.id)) {
        setProgress({ current: 10, total: 100, message: 'Processing started...' });
      }
    });

    newSocket.on('job:progress', ({ jobId, current, total, message }) => {
      if (activeJobIdsRef.current.has(jobId)) {
        setProgress({ current, total, message });
      }
    });

    newSocket.on('job:completed', ({ jobId, image, text, generationTimeMs, cached }) => {
      updateJob(jobId, { status: 'completed' });
      
      if (activeJobIdsRef.current.has(jobId)) {
        setCurrentImages(prev => [...prev, { src: image, text, cached, jobId }]);
        activeJobIdsRef.current.delete(jobId);
        
        if (activeJobIdsRef.current.size === 0) {
          setIsLoading(false);
          setProgress({ current: 100, total: 100, message: 'Done!' });
        }
      }
      
      // Add to gallery
      addImageToStore({
        id: jobId,
        prompt: text,
        config: {},
        imageUrl: image,
        textOutput: text,
        createdAt: new Date().toISOString(),
        generationTimeMs,
        cached
      });
    });

    newSocket.on('job:failed', ({ jobId, error }) => {
      updateJob(jobId, { status: 'failed', error });
      if (activeJobIdsRef.current.has(jobId)) {
        activeJobIdsRef.current.delete(jobId);
        setError(error);
        if (activeJobIdsRef.current.size === 0) {
          setIsLoading(false);
        }
      }
    });

    return () => {
      newSocket.close();
    };
  }, [addJob, updateJob, setQueueStatus, addImageToStore]);

  const generate = async (prompt: string, config: any) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    setIsLoading(true);
    setError(null);
    setCurrentImages([]);
    activeJobIdsRef.current.clear();
    setProgress({ current: 0, total: 100, message: 'Queuing jobs...' });

    try {
      const count = config.generationCount || 2;
      // Fire parallel jobs based on requested count
      for (let i = 0; i < count; i++) {
        // We append a hidden random tag so the backend caches them differently
        // if using the Pollinations seed logic, this ensures 3 unique images
        const fetchConfig = { ...config, _batchIndex: i, seedOffset: Math.random() };
        
        fetch(`${API_URL}/api/generate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt, config: fetchConfig }),
          signal: abortControllerRef.current.signal
        })
        .then(res => {
          if (!res.ok) throw new Error('Failed to queue generation');
          return res.json();
        })
        .then(data => {
          activeJobIdsRef.current.add(data.jobId);
        })
        .catch(err => {
          if (err.name !== 'AbortError') {
             console.error(err);
             setError(err.message);
          }
        });
      }

    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setError(err.message);
        setIsLoading(false);
      }
    }
  };

  const cancel = async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    // Cancel all active jobs
    activeJobIdsRef.current.forEach(async (jobId) => {
      try {
        await fetch(`${API_URL}/api/jobs/${jobId}/cancel`, { method: 'POST' });
      } catch (e) {}
    });
    
    activeJobIdsRef.current.clear();
    setIsLoading(false);
    setError('Cancelled by user');
  };

  return {
    generate,
    cancel,
    isLoading,
    progress,
    error,
    currentImages
  };
}
