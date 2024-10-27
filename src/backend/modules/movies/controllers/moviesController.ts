import { moviesService } from '../services/moviesService';
import { Movie } from '../entities/movie';
import { CreateMovieDto } from '../dtos/createMovieDto';
import { STATUS_CODES } from '@/config/constants/statusCodes';
import { ERROR_MESSAGES } from '@/config/constants/errorMessages';
import logger from '@/config/error/logger';

/**
 * Controller function to fetch all movies with optional title filtering
 * Returns structured result with data and status
 */
export const getAllMovies = async (title?: string) => {
  try {
    const result = await moviesService.getAllMovies(title);

    if (Array.isArray(result.data)) {
      logger.info(`Fetched all movies`, { count: result.data.length });
      return { status: result.status, data: result.data };
    } else {
      logger.error('Failed to fetch movies', { error: result.data.error });
      return {
        status: STATUS_CODES.INTERNAL_SERVER_ERROR,
        data: { error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR },
      };
    }
  } catch (error) {
    logger.error('Unexpected error fetching all movies', { error });
    return {
      status: STATUS_CODES.INTERNAL_SERVER_ERROR,
      data: { error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR },
    };
  }
};

/**
 * Controller function to fetch a movie by ID
 * Returns structured result with data and status
 */
export const getMovieById = async (id: string) => {
  try {
    const movie = await moviesService.getMovieById(id);
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
};

/**
 * Controller function to add a new movie
 * Returns structured result with data and status
 */
export const addMovie = async (movieDto: CreateMovieDto) => {
  try {
    const newMovie = await moviesService.addMovie(movieDto);
    logger.info('Movie added', newMovie);
    return { status: STATUS_CODES.CREATED, data: newMovie };
  } catch (error) {
    logger.error('Error adding movie', { error });
    return {
      status: STATUS_CODES.BAD_REQUEST,
      data: { error: ERROR_MESSAGES.INVALID_DATA },
    };
  }
};

/**
 * Controller function to update a movie by ID
 * Returns structured result with data and status
 */
export const updateMovie = async (id: string, movieDetails: Partial<Movie>) => {
  try {
    const updatedMovie = await moviesService.updateMovie(id, movieDetails);
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
};

/**
 * Controller function to delete a movie by ID
 * Returns structured result with data and status
 */
export const deleteMovie = async (id: string) => {
  try {
    const deletedMovie = await moviesService.deleteMovieById(id);
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
};
