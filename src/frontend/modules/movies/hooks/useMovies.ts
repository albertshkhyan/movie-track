import { useState } from 'react';
import { Movie, MovieInput } from '../types/movieTypes';
import {
  addMovie,
  deleteMovie,
  getMovieById,
  getMovies,
  updateMovie,
} from '../services/movieService';

export interface UseMoviesReturn {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  fetchMovies: (title?: string) => Promise<Movie[]>;
  fetchMovieById: (id: string) => Promise<Movie | null>;
  createMovie: (movie: MovieInput) => Promise<void>;
  modifyMovie: (id: string, movie: MovieInput) => Promise<void>;
  removeMovie: (id: string) => Promise<void>;
}

export const useMovies = (): UseMoviesReturn => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = async (title?: string): Promise<Movie[]> => {
    setLoading(true);
    setError(null);
    try {
      const moviesList = await getMovies(title);
      console.log('Fetched movies list from API:', moviesList);
      setMovies(moviesList); // Update the state with the fetched movies
      return moviesList; // Return fetched movies for direct access if needed
    } catch (err) {
      console.error('Error fetching movies:', err);
      setError('Failed to fetch movies');
      return []; // Return an empty array in case of an error
    } finally {
      setLoading(false);
    }
  };

  // Add a new movie
  const createMovie = async (movie: MovieInput): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const newMovie = await addMovie(movie);
      console.log('Movie added successfully:', newMovie);
      setMovies((prevMovies) => [...prevMovies, newMovie]);
    } catch (err) {
      console.error('Error adding movie:', err);
      setError('Failed to add movie');
    } finally {
      setLoading(false);
    }
  };

  // Update an existing movie by ID
  const modifyMovie = async (id: string, movie: MovieInput): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await updateMovie(id, movie);
      console.log(`Movie with ID ${id} updated, refetching movies...`);
      await fetchMovies(); // Ensure fresh fetch after modification
    } catch (err) {
      console.error('Error updating movie:', err);
      setError('Failed to update movie');
    } finally {
      setLoading(false);
    }
  };

  // Delete a movie by ID and re-fetch the updated list
  const removeMovie = async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await deleteMovie(id);
      console.log(`Movie with ID ${id} deleted, refetching movies...`);
      await fetchMovies(); // Fetch updated list after deletion
    } catch (err) {
      console.error('Error deleting movie:', err);
      setError('Failed to delete movie');
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single movie by its ID
  const fetchMovieById = async (id: string): Promise<Movie | null> => {
    setLoading(true);
    setError(null);
    try {
      return await getMovieById(id);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Failed to fetch movie by ID');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    movies,
    loading,
    error,
    fetchMovies,
    fetchMovieById,
    createMovie,
    modifyMovie,
    removeMovie,
  };
};
