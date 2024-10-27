import { NextResponse } from 'next/server';

/**
 * Returns a 404 Not Found response with a standard error message.
 * @param message The error message to send
 * @returns A NextResponse with a 404 status
 */
export function notFoundResponse(message: string = 'Resource not found') {
  return NextResponse.json({ error: message }, { status: 404 });
}

/**
 * Returns a 500 Internal Server Error response with a standard error message.
 * @param message The error message to send
 * @returns A NextResponse with a 500 status
 */
export function internalServerErrorResponse(
  message: string = 'An internal server error occurred'
) {
  return NextResponse.json({ error: message }, { status: 500 });
}
