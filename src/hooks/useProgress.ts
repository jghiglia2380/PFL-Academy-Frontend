import { useState, useEffect } from 'react';

export function useProgress(standardId: string) {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading progress data
    setLoading(true);
    const timer = setTimeout(() => {
      // This is a placeholder - in a real app, you'd fetch actual progress data
      setProgress(Math.floor(Math.random() * 100));
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [standardId]);

  return { progress, loading };
}