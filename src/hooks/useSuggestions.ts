import { useState, useEffect } from 'react';
import { fetchSuggestions } from '../api/pappers';
import { debounce } from '../utils/debounce.ts';

export function useSuggestions(query: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error|null>(null);

  useEffect(() => {
    // Reset error whenever query changes
    setError(null);
    
    if (!query) {
      setData(null);
      setLoading(false);
      return;
    }
    
    setLoading(true);
    const debounced = debounce(async () => {
      try {
        const json = await fetchSuggestions(query);
        setData(json);
        setError(null); // Clear any previous errors on success
      } catch (e) {
        setError(e as Error);
        setData(null); // Clear data on error
      } finally {
        setLoading(false);
      }
    }, 1000);
    
    debounced();
    return () => debounced.cancel();
  }, [query]);

  return { data, loading, error };
}