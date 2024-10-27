import { ERROR_MESSAGES } from '@/config/constants/errorMessages';

/**
 * Extracts the message from an unknown error.
 * If the error is an instance of Error, it returns the error message.
 * Otherwise, it returns a default internal server error message.
 * @param error - The error to extract the message from
 * @returns The error message as a string
 */
export function getErrorMessage(error: unknown): string {
  return error instanceof Error
    ? error.message
    : ERROR_MESSAGES.INTERNAL_SERVER_ERROR;
}
