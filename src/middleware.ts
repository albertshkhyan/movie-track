import { NextRequest, NextResponse } from 'next/server';
import { validateJson } from './middleware/validateJson';

export async function middleware(req: NextRequest) {
  // Define required fields based on request type
  let requiredFields: string[] = [];

  if (req.method === 'POST' || req.method === 'PUT') {
    requiredFields = ['title', 'description'];
  }

  // Run JSON validation and check response
  const jsonValidationResult = await validateJson(req, requiredFields);

  // If jsonValidationResult is a NextResponse (error), return it immediately
  if (jsonValidationResult instanceof NextResponse) {
    return jsonValidationResult;
  }

  // If validation passed, continue with the request
  return NextResponse.next();
}

// Apply middleware to API routes
export const config = {
  matcher: ['/api/:path*'],
};
