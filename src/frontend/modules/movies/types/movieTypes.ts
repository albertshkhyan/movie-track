export interface Movie {
  id: string;
  title: string;
  description: string;
  genre?: string;
  releaseYear?: number;
}

export type MovieInput = Omit<Movie, 'id'>;
