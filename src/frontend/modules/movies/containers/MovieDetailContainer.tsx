import React, { useEffect, useState } from 'react';
import { useMovies } from '../hooks/useMovies';
import Typography from '@/shared/components/Typography';
import { Movie } from '../types/movieTypes';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import Box from '@/shared/components/Box';

interface MovieDetailContainerProps {
  movieId: string;
}

const MovieDetailContainer: React.FC<MovieDetailContainerProps> = ({
  movieId,
}) => {
  const { fetchMovieById, loading, error } = useMovies();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const fetchedMovie = await fetchMovieById(movieId);
      setMovie(fetchedMovie);
    };
    fetchMovie();
  }, [fetchMovieById, movieId]);

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <Typography variant="body1" color="error">
        {error}
      </Typography>
    );
  if (!movie) return <Typography variant="body1">Movie not found.</Typography>;

  return (
    <Box $display="flex" $flexDirection="column" $gap={16} $padding={16}>
      <Typography variant="h4">{movie.title}</Typography>
      <Typography variant="body1">{movie.description}</Typography>
      {movie.genre && (
        <Typography variant="subtitle1">Genre: {movie.genre}</Typography>
      )}
      {movie.releaseYear && (
        <Typography variant="subtitle2">
          Release Year: {movie.releaseYear}
        </Typography>
      )}
    </Box>
  );
};

export default MovieDetailContainer;
