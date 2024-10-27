/**
 * Extracts query parameters from a URL as an object.
 *
 * @param url - The URL from which to extract query parameters
 * @returns An object with query parameters as key-value pairs
 */
export function getQueryParams(
  url: string
): Record<string, string | undefined> {
  const params = new URL(url).searchParams;
  return Object.fromEntries(params.entries());
}
