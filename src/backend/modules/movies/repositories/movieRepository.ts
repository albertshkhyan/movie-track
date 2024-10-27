import { Movie } from '../entities/movie';
import { CreateMovieDto } from '../dtos/createMovieDto';

export interface MovieRepository {
  getAllMovies(): Promise<Movie[]>;
  getMovieById(id: string): Promise<Movie | undefined>;
  addMovie(movie: CreateMovieDto): Promise<Movie>;
  updateMovie(
    id: string,
    movieDetails: Partial<Movie>
  ): Promise<Movie | undefined>;
  deleteMovieById(id: string): Promise<Movie | undefined>;
}
