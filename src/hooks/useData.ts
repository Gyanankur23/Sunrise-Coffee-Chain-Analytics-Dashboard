import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { loadAllData, type LoadingProgress } from '../services/dataLoader';
import { DataTransformer } from '../services/dataTransformer';

export function useData() {
  return useQuery({
    queryKey: ['data'],
    queryFn: async () => {
      const data = await loadAllData();
      const transformer = new DataTransformer(data);
      return {
        raw: data,
        transformer,
      };
    },
    staleTime: Infinity,
  });
}

export function useLoadingProgress() {
  const [progress, setProgress] = useState<LoadingProgress | null>(null);

  const loadData = async () => {
    return loadAllData((p) => setProgress(p));
  };

  return { progress, loadData };
}
