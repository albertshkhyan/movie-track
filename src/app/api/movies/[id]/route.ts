import {
  getMovieById,
  updateMovie,
  deleteMovie,
} from '@/backend/modules/movies/controllers/moviesController';
import { STATUS_CODES } from '@/config/constants/statusCodes';
import { ERROR_MESSAGES } from '@/config/constants/errorMessages';
import { logger } from '@/config/error/logger';
import { NextResponse } from 'next/server';
import { Movie } from '@/backend/modules/movies/entities/movie';

/**
 * GET: Fetch a movie by ID
 */
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop(); // Extract ID from the URL
    if (!id) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.MISSING_MOVIE_ID },
        { status: STATUS_CODES.BAD_REQUEST }
      );
    }

    const result = await getMovieById(id);
    return NextResponse.json(result.data, { status: result.status });
  } catch (error) {
    logger.error('Error fetching movie by ID', { error });
    return NextResponse.json(
      { error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR },
      { status: STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }
}

/**
 * PUT: Update a movie by ID
 */
export async function PUT(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();
    const movieDetails = await req.json(); // Extract body for PUT request

    if (!id) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.MISSING_MOVIE_ID },
        { status: STATUS_CODES.BAD_REQUEST }
      );
    }

    // Validate required fields: title and description
    const { title, description, releaseYear, genre } = movieDetails;
    if (!title || !description) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.MISSING_REQUIRED_FIELDS },
        { status: STATUS_CODES.BAD_REQUEST }
      );
    }

    // Construct update details with only defined fields
    const updateData: Partial<Movie> = {
      title,
      description,
      ...(releaseYear !== undefined && { releaseYear }), // Optional
      ...(genre !== undefined && { genre }), // Optional
    };

    const result = await updateMovie(id, updateData);
    return NextResponse.json(result.data, { status: result.status });
  } catch (error) {
    logger.error('Error updating movie by ID', { error });
    return NextResponse.json(
      { error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR },
      { status: STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }
}

/**
 * DELETE: Remove a movie by ID
 */
export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();

    if (!id) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.MISSING_MOVIE_ID },
        { status: STATUS_CODES.BAD_REQUEST }
      );
    }

    const result = await deleteMovie(id);
    return NextResponse.json(result.data, { status: result.status });
  } catch (error) {
    logger.error('Error deleting movie by ID', { error });
    return NextResponse.json(
      { error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR },
      { status: STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }
}
