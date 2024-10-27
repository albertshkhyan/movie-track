import { Movie } from '../entities/movie';
import { CreateMovieDto } from '../dtos/createMovieDto';
import { MovieRepository } from '../repositories/movieRepository';
import { movieDataJson } from '../repositories/movieDataJson';
import { ERROR_MESSAGES } from '@/config/constants/errorMessages';
import { STATUS_CODES } from '@/config/constants/statusCodes';
import logger from '@/config/error/logger';

export class MoviesService {
  constructor(private readonly movieRepository: MovieRepository) {}

  async getAllMovies(title?: string) {
    try {
      const movies = await this.movieRepository.getAllMovies();

      // If title is provided, filter movies by title
      const filteredMovies = title
        ? movies.filter((movie) =>
            movie.title.toLowerCase().includes(title.toLowerCase())
          )
        : movies;

      logger.info('Fetched all movies', { count: filteredMovies.length });
      return { status: STATUS_CODES.OK, data: filteredMovies };
    } catch (error) {
      logger.error('Error fetching movies', { error });
      return {
        status: STATUS_CODES.INTERNAL_SERVER_ERROR,
        data: { error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR },
      };
    }
  }

  async getMovieById(id: string) {
    if (!id) {
      return {
        status: STATUS_CODES.BAD_REQUEST,
        data: { error: ERROR_MESSAGES.MISSING_MOVIE_ID },
      };
    }
    try {
      const movie = await this.movieRepository.getMovieById(id);
      if (!movie) {
        logger.warn(`Movie with ID ${id} not found`);
        return {
          status: STATUS_CODES.NOT_FOUND,
          data: { error: ERROR_MESSAGES.MOVIE_NOT_FOUND },
        };
      }
      logger.info(`Fetched movie with ID: ${id}`);
      return { status: STATUS_CODES.OK, data: movie };
    } catch (error) {
      logger.error('Error fetching movie by ID', { error });
      return {
        status: STATUS_CODES.INTERNAL_SERVER_ERROR,
        data: { error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR },
      };
    }
  }

  async addMovie(movieDto: CreateMovieDto) {
    // logger.info('dsafsdfesa3 CreateMovieDto = Movie added', movieDto);
    if (!movieDto || !movieDto.title || !movieDto.description) {
      logger.info('dsafsdfesa3 IFFFFF CASE = Movie added', movieDto);

      return {
        status: STATUS_CODES.BAD_REQUEST,
        data: { error: ERROR_MESSAGES.INVALID_DATA },
      };
    }
    try {
      const newMovie = await this.movieRepository.addMovie(movieDto);
      logger.info('Movie added', newMovie);
      return { status: STATUS_CODES.CREATED, data: newMovie };
    } catch (error) {
      logger.error('Error adding movie', { error });
      return {
        status: STATUS_CODES.INTERNAL_SERVER_ERROR,
        data: { error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR },
      };
    }
  }

  async updateMovie(id: string, movieDetails: Partial<Movie>) {
    if (!id) {
      return {
        status: STATUS_CODES.BAD_REQUEST,
        data: { error: ERROR_MESSAGES.MISSING_MOVIE_ID },
      };
    }
    if (!movieDetails) {
      return {
        status: STATUS_CODES.BAD_REQUEST,
        data: { error: ERROR_MESSAGES.MISSING_MOVIE_DETAILS },
      };
    }
    try {
      const updatedMovie = await this.movieRepository.updateMovie(
        id,
        movieDetails
      );
      if (!updatedMovie) {
        logger.warn(`Movie with ID ${id} not found for update`);
        return {
          status: STATUS_CODES.NOT_FOUND,
          data: { error: ERROR_MESSAGES.MOVIE_NOT_FOUND },
        };
      }
      logger.info(`Updated movie with ID: ${id}`, updatedMovie);
      return { status: STATUS_CODES.OK, data: updatedMovie };
    } catch (error) {
      logger.error('Error updating movie', { error });
      return {
        status: STATUS_CODES.INTERNAL_SERVER_ERROR,
        data: { error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR },
      };
    }
  }

  async deleteMovieById(id: string) {
    if (!id) {
      return {
        status: STATUS_CODES.BAD_REQUEST,
        data: { error: ERROR_MESSAGES.MISSING_MOVIE_ID },
      };
    }
    try {
      const deletedMovie = await this.movieRepository.deleteMovieById(id);
      if (!deletedMovie) {
        logger.warn(`Movie with ID ${id} not found for deletion`);
        return {
          status: STATUS_CODES.NOT_FOUND,
          data: { error: ERROR_MESSAGES.MOVIE_NOT_FOUND },
        };
      }
      logger.info(`Deleted movie with ID: ${id}`);
      return { status: STATUS_CODES.OK, data: deletedMovie };
    } catch (error) {
      logger.error('Error deleting movie', { error });
      return {
        status: STATUS_CODES.INTERNAL_SERVER_ERROR,
        data: { error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR },
      };
    }
  }
}

// Instantiate the service with the repository
export const moviesService = new MoviesService(movieDataJson);
