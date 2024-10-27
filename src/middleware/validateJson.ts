import { NextRequest, NextResponse } from 'next/server';
import { STATUS_CODES } from '@/config/constants/statusCodes';
import { ERROR_MESSAGES } from '@/config/constants/errorMessages';

/**
 * Middleware function to validate the JSON request body
 * Checks if the body is well-formed JSON and contains required fields for applicable methods
 *
 * @param req - Incoming request
 * @param requiredFields - List of required fields to check in the request body
 */
export async function validateJson(req: NextRequest, requiredFields: string[]) {
  // Skip JSON validation for GET and DELETE methods
  if (req.method === 'GET' || req.method === 'DELETE') {
    return { isValid: true, data: null };
  }

  try {
    const body = await req.json();

    // Check for required fields in the JSON body
    for (const field of requiredFields) {
      if (!(field in body)) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: STATUS_CODES.BAD_REQUEST }
        );
      }
    }

    // Return the parsed body if validation passed
    return { isValid: true, data: body };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: ERROR_MESSAGES.INVALID_JSON },
      { status: STATUS_CODES.BAD_REQUEST }
    );
  }
}
