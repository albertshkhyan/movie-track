import { useCallback, useState } from 'react';
import { Movie } from '../types/movieTypes';
import { getMovies } from '../services/movieService';
import { debounce } from '@/shared/utils/debounce';

interface UseSearchReturn {
  searchResults: Movie[];
  searchTerm: string;
  loading: boolean;
  error: string | null;
  handleSearch: (term: string) => void;
  clearSearch: () => void;
}

export const useSearch = (): UseSearchReturn => {
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debounced search function to avoid rapid API calls
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchMovies = useCallback(
    debounce(async (term: string) => {
      setLoading(true);
      setError(null);
      try {
        // Directly calling getMovies from movieService
        const results = await getMovies(term); // Pass term as the title query param
        setSearchResults(results);
      } catch (e) {
        setError('Search failed');
        console.error('Search failed:', e);
      } finally {
        setLoading(false);
      }
    }, 500), // Adjust debounce delay as needed (e.g., 500ms)
    []
  );

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    debouncedFetchMovies(term); // Use debounced function
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
  };

  return {
    searchResults,
    searchTerm,
    loading,
    error,
    handleSearch,
    clearSearch,
  };
};

export default useSearch;
