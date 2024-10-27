// src/config/apiClient.ts
// noinspection JSUnusedGlobalSymbols

import queryStringify from '@/shared/utils/queryStringify';

/**
 * Custom error class for handling API errors.
 */
class ApiError extends Error {
  constructor(
    public message: string,
    public status: number
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

class ApiClient {
  private readonly baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   * Set the authorization token for authenticated requests.
   * @param token - The token to be set in headers.
   */
  setToken(token: string) {
    this.token = token;
  }

  /**
   * Generate headers for the request. Adds Content-Type and Authorization if available.
   * @param customHeaders - Optional custom headers to merge with default headers.
   * @returns The merged headers.
   */
  private getHeaders(customHeaders?: Record<string, string>) {
    return {
      'Content-Type': 'application/json',
      ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
      ...customHeaders,
    };
  }

  /**
   * Perform a GET request.
   * @param endpoint - The API endpoint.
   * @param params - Optional query parameters for the request.
   * @returns The response data of type R.
   */
  async get<T, R = T>(
    endpoint: string,
    params?: Record<string, string | number>
  ): Promise<R> {
    const query = params ? `?${queryStringify(params)}` : '';
    const url = `${this.baseUrl}${endpoint}${query}`;

    const response = await fetch(url, {
      headers: this.getHeaders(),
    });
    return this.handleResponse<R>(response);
  }

  /**
   * Perform a POST request.
   * @param endpoint - The API endpoint.
   * @param body - The request body.
   * @returns The response data of type R.
   */
  async post<T, R>(endpoint: string, body: T): Promise<R> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });
    return this.handleResponse<R>(response);
  }

  /**
   * Perform a PUT request.
   * @param endpoint - The API endpoint.
   * @param body - The request body.
   * @returns The response data of type R.
   */
  async put<T, R>(endpoint: string, body: T): Promise<R> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });
    return this.handleResponse<R>(response);
  }

  /**
   * Perform a DELETE request.
   * @param endpoint - The API endpoint.
   * @returns The response data of type R.
   */
  async delete<R>(endpoint: string): Promise<R> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    return this.handleResponse<R>(response);
  }

  /**
   * Handle the response from a fetch request.
   * Parses JSON and throws an error if the response status is not ok.
   * @param response - The response object from fetch.
   * @returns The response data of type T.
   * @throws ApiError - If the response status is not ok.
   */
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      try {
        const error = await response.json();
        throw new ApiError(
          error.message || 'An error occurred',
          response.status
        );
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        throw new ApiError(
          'An error occurred, but no details were provided',
          response.status
        );
      }
    }
    return (await response.json()) as T;
  }
}

// Create an instance of ApiClient with a default base URL
const apiClient = new ApiClient(
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
);

export default apiClient;
