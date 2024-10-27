/**
 * Helper function to convert an object to a query string.
 * @param params - An object containing query parameters
 * @returns A query string
 */
function queryStringify(params: Record<string, string | number>): string {
  const searchParams = new URLSearchParams();
  for (const key in params) {
    searchParams.append(key, String(params[key]));
  }
  return searchParams.toString();
}

export default queryStringify;
