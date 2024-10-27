import React from 'react';
import Card from '@/shared/components/Card';
import Typography from '@/shared/components/Typography';
import Button from '@/shared/components/Button';
import { Movie } from '../types/movieTypes';

interface MovieCardProps {
  movie: Movie;
  onDelete: (id: string) => void;
  onEdit: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onDelete, onEdit }) => {
  return (
    <Card>
      <Typography variant="h5">{movie.title}</Typography>
      <Typography variant="body2">{movie.description}</Typography>
      {movie.genre && (
        <Typography variant="subtitle2">Genre: {movie.genre}</Typography>
      )}
      {movie.releaseYear && (
        <Typography variant="subtitle2">
          Release Year: {movie.releaseYear}
        </Typography>
      )}
      <Button $variant="secondary" onClick={() => onEdit(movie)}>
        Edit
      </Button>
      <Button $variant="primary" onClick={() => onDelete(movie.id)}>
        Delete
      </Button>
    </Card>
  );
};

export default MovieCard;
