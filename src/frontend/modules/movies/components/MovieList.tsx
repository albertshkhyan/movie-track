import React from 'react';
import styled from 'styled-components';
import { Movie } from '../types/movieTypes';
import Card from '@/shared/components/Card';
import Button from '@/shared/components/Button';
import Typography from '@/shared/components/Typography';
import LoadingSpinner from '@/shared/components/LoadingSpinner';

interface MovieListProps {
  movies: Movie[];
  loading: boolean;
  onDelete: (id: string) => void;
  onEdit: (movie: Movie) => void;
}

const ListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap; /* Wrap items to the next row if they exceed container width */
  gap: 1rem;
  justify-content: space-between; /* Spread items evenly across the row */
`;

const MovieCard = styled(Card)`
  width: 31.33%; /* Each item will take exactly 1/3 of the row */
  box-sizing: border-box; /* Ensure padding/border don't affect width */

  /* Add responsiveness for smaller screens */
  @media (max-width: 768px) {
    width: 100%; /* Stack items on smaller screens */
  }
`;

const MovieCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const ActionsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
`;

const MovieList: React.FC<MovieListProps> = ({
  movies,
  loading,
  onDelete,
  onEdit,
}) => {
  if (loading) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
      </LoadingContainer>
    );
  }

  if (movies.length === 0) {
    return <Typography variant="body1">No movies found.</Typography>;
  }

  return (
    <ListWrapper>
      {movies.map((movie) => (
        <MovieCard key={movie.id}>
          <MovieCardContent>
            <Typography variant="h5">{movie.title}</Typography>
            <Typography variant="body1">{movie.description}</Typography>
            {movie.genre && (
              <Typography variant="subtitle1">Genre: {movie.genre}</Typography>
            )}
            {movie.releaseYear && (
              <Typography variant="subtitle2">
                Release Year: {movie.releaseYear}
              </Typography>
            )}
          </MovieCardContent>
          <ActionsContainer>
            <Button $variant="primary" onClick={() => onEdit(movie)}>
              Edit
            </Button>
            <Button $variant="secondary" onClick={() => onDelete(movie.id)}>
              Delete
            </Button>
          </ActionsContainer>
        </MovieCard>
      ))}
    </ListWrapper>
  );
};

// Export both the default and named export
export default MovieList;
