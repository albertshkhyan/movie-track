import { NextApiRequest, NextApiResponse } from 'next';
import { RequestHandler } from 'express';

// Accept a single middleware or an array of middlewares
export function applyMiddleware(
  middlewares: RequestHandler | RequestHandler[]
) {
  return (req: NextApiRequest, res: NextApiResponse) =>
    new Promise((resolve, reject) => {
      // Normalize middlewares to an array
      const middlewareArray = Array.isArray(middlewares)
        ? middlewares
        : [middlewares];

      const runMiddleware = (index: number) => {
        if (index === middlewareArray.length) return resolve(null);

        const middleware = middlewareArray[index];

        // eslint-disable-next-line
                middleware(req as any, res as any, (result: unknown) => {
          if (result instanceof Error) {
            return reject(result);
          }

          if (result !== 'next') {
            return resolve(result);
          }

          // Proceed to the next middleware in the array
          runMiddleware(index + 1);
        });
      };

      runMiddleware(0);
    });
}
