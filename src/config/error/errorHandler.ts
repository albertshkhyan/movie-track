import { NextApiResponse } from 'next';
import logger from './logger';

export const handleError = (
  res: NextApiResponse,
  statusCode: number,
  message: string
) => {
  logger.error(message);
  return res.status(statusCode).json({ error: message });
};
