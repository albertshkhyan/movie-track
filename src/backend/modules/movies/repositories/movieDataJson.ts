import db from '@/db/lowdb';
import { Movie } from '../entities/movie';
import { CreateMovieDto } from '../dtos/createMovieDto';
import { MovieRepository } from './movieRepository';
import { v4 as uuidv4 } from 'uuid'; // Install UUID library for better ID generation
import { ERROR_MESSAGES } from '@/config/constants/errorMessages';
import logger from '@/config/error/logger';

export const movieDataJson: MovieRepository = {
  // Fetch all movies with proper error handling
  getAllMovies: async (): Promise<Movie[]> => {
    try {
      await db.read();
      return db.data.movies;
    } catch (error) {
      logger.error('Error reading movies from database', { error });
      throw new Error(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
    }
  },

  // Fetch a single movie by ID with error handling
  getMovieById: async (id: string): Promise<Movie | undefined> => {
    try {
      await db.read();
      return db.data.movies.find((movie) => movie.id === id);
    } catch (error) {
      logger.error(`Error fetching movie with ID ${id}`, { error });
      throw new Error(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
    }
  },

  // Add a new movie with ID generation and validation
  addMovie: async (movieDto: CreateMovieDto): Promise<Movie> => {
    console.log('addMovie function called');
    logger.info('Initiating addMovie function');

    // Step 1: Read the database
    await db.read();
    logger.info('Database read successfully', {
      currentMoviesCount: db.data.movies.length,
    });

    // Step 2: Validate required fields
    if (!movieDto.title || !movieDto.description) {
      logger.warn('Validation failed: Missing required fields', {
        providedData: movieDto,
      });
      throw new Error(ERROR_MESSAGES.INVALID_DATA);
    }
    logger.info('Validation successful', { validatedData: movieDto });

    // Step 3: Generate a unique UUID for the new movie
    const newMovie: Movie = {
      id: uuidv4(),
      ...movieDto,
    };
    logger.info('Generated unique ID for new movie', { newMovie });

    // Step 4: Add new movie to the database and write changes
    try {
      db.data.movies.push(newMovie);
      await db.write();
      logger.info('Movie added successfully', {
        newMovie,
        totalMoviesAfterAdd: db.data.movies.length,
      });
      return newMovie;
    } catch (error) {
      logger.error('Error writing new movie to the database', { error });
      throw new Error(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
    }
  },

  // Update an existing movie with error handling
  updateMovie: async (
    id: string,
    movieDetails: Partial<Movie>
  ): Promise<Movie | undefined> => {
    await db.read();
    const movieIndex = db.data.movies.findIndex((movie) => movie.id === id);
    if (movieIndex === -1) return undefined;

    // Merge existing movie data with new details immutably
    const updatedMovie = { ...db.data.movies[movieIndex], ...movieDetails };

    try {
      db.data.movies[movieIndex] = updatedMovie;
      await db.write();
      logger.info(`Movie with ID ${id} updated successfully`, {
        movie: updatedMovie,
      });
      return updatedMovie;
    } catch (error) {
      logger.error(`Error updating movie with ID ${id}`, { error });
      throw new Error(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
    }
  },

  // Delete a movie by ID with error handling
  deleteMovieById: async (id: string): Promise<Movie | undefined> => {
    await db.read();
    const movieIndex = db.data.movies.findIndex((movie) => movie.id === id);
    if (movieIndex === -1) return undefined;

    // Remove the movie safely with immutability
    const deletedMovie = { ...db.data.movies[movieIndex] };
    db.data.movies = db.data.movies.filter((movie) => movie.id !== id);

    try {
      await db.write();
      logger.info(`Movie with ID ${id} deleted successfully`, {
        movie: deletedMovie,
      });
      return deletedMovie;
    } catch (error) {
      logger.error(`Error deleting movie with ID ${id}`, { error });
      throw new Error(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
    }
  },
};
