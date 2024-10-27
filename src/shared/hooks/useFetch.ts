import { useState, useEffect } from 'react';
import apiClient from '@/config/apiClient';

type UseFetchResult<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
};

function useFetch<T>(
  endpoint: string,
  params?: Record<string, string | number>
): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await apiClient.get<T>(endpoint, params);
        setData(result);
        setError(null);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [endpoint, params]);

  return { data, error, loading };
}

export default useFetch;
