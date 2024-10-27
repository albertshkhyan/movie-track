import { NextResponse } from 'next/server';
import {
  getAllMovies,
  addMovie,
} from '@/backend/modules/movies/controllers/moviesController';
import { Movie } from '@/backend/modules/movies/entities/movie';
import { STATUS_CODES } from '@/config/constants/statusCodes';
import { ERROR_MESSAGES } from '@/config/constants/errorMessages';
import logger from '@/config/error/logger';
import { getQueryParams } from '@/config/utils/request/params';

export async function GET(req: Request) {
  try {
    // Get the query parameters
    const queryParams = getQueryParams(req.url);
    const title = queryParams.title;

    // Fetch all movies with optional title filter
    const result = await getAllMovies(title);

    return NextResponse.json(result.data, { status: result.status });
  } catch (error) {
    logger.error('Error fetching all movies', { error });
    return NextResponse.json(
      { error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR },
      { status: STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }
}

export async function POST(req: Request) {
  try {
    // Parse the movie data from the request body
    const movieDto: Movie = await req.json();

    const { title, description } = movieDto;
    logger.info('dsfsadf23 0000', { movieDto });
    if (!title || !description) {
      logger.info('dsfsadf23 1111', { movieDto });

      return NextResponse.json(
        { error: ERROR_MESSAGES.MISSING_REQUIRED_FIELDS },
        { status: STATUS_CODES.BAD_REQUEST }
      );
    }

    logger.info('dsfsadf23  22222', { movieDto });

    // Add the movie using the controller function
    const result = await addMovie(movieDto);

    // Check if the result indicates a bad request
    if (result.status === STATUS_CODES.BAD_REQUEST) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.INVALID_DATA },
        { status: STATUS_CODES.BAD_REQUEST }
      );
    }

    return NextResponse.json(result.data, { status: result.status });
  } catch (error) {
    logger.error('Error adding a new movie', { error });
    return NextResponse.json(
      { error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR },
      { status: STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }
}
