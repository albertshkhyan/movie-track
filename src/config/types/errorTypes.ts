// Define a custom error interface with additional fields
export interface CustomError extends Error {
  statusCode?: number;
  message: string;
  details?: string;
}

// Enum to categorize common error types
export enum ErrorType {
  VALIDATION_ERROR = 'ValidationError',
  DATABASE_ERROR = 'DatabaseError',
  NETWORK_ERROR = 'NetworkError',
  NOT_FOUND = 'NotFoundError',
  UNAUTHORIZED = 'UnauthorizedError',
  UNKNOWN_ERROR = 'UnknownError',
}

// Error response structure commonly sent to the client
export interface ErrorResponse {
  type: ErrorType;
  message: string;
  statusCode: number;
  details?: string;
}

// Helper function to create error responses
export const createErrorResponse = (
  type: ErrorType,
  message: string,
  statusCode: number,
  details?: string
): ErrorResponse => ({
  type,
  message,
  statusCode,
  details,
});

// Example usage of CustomError for throwing errors
export const throwCustomError = (
  message: string,
  type: ErrorType = ErrorType.UNKNOWN_ERROR,
  statusCode: number = 500,
  details?: string
): never => {
  const error: CustomError = new Error(message);
  error.statusCode = statusCode;
  error.name = type;
  error.details = details;
  throw error;
};
