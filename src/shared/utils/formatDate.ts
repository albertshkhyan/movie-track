/**
 * Formats a JavaScript Date object into a readable string.
 * @param date - The date to format
 * @returns A string representing the formatted date
 */
export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}
