import apiClient from '@/config/apiClient';
import { Movie, MovieInput } from '../types/movieTypes';

// Fetch all movies, optionally filtering by title (for search functionality)
export const getMovies = async (title?: string): Promise<Movie[]> => {
  // Prepare the params object for query, including the optional title parameter
  const params = title ? { title } : undefined;

  // Fetch movies from the API with the optional search parameter
  return await apiClient.get<Movie[], Movie[]>('/api/movies', params);
};

// Fetch a single movie by its ID
export const getMovieById = async (id: string): Promise<Movie> => {
  return await apiClient.get<void, Movie>(`/api/movies/${id}`);
};

// Add a new movie
export const addMovie = async (movie: MovieInput): Promise<Movie> => {
  return await apiClient.post<MovieInput, Movie>('/api/movies', movie);
};

// Update an existing movie by ID
export const updateMovie = async (
  id: string,
  movie: MovieInput
): Promise<Movie> => {
  return await apiClient.put<MovieInput, Movie>(`/api/movies/${id}`, movie);
};

// Delete a movie by its ID
export const deleteMovie = async (id: string): Promise<void> => {
  return await apiClient.delete<void>(`/api/movies/${id}`);
};
