import { NextApiResponse } from 'next';
import { NextServer } from 'next/dist/server/next';

const mockNext: jest.Mock<
  {
    prepare: jest.Mock;
    getRequestHandler: jest.Mock<
      (req: never, res: never, _parsedUrl: never) => void,
      []
    >;
  },
  [],
  () => Partial<NextServer> extends (this: infer C, ...args: never[]) => never
    ? C
    : never
> = jest.fn(() => ({
  prepare: jest.fn(),
  getRequestHandler: jest.fn(() => {
    // Return a function that matches the type of RequestHandler
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handler: (req: never, res: never, _parsedUrl: never) => void = (
      req,
      res,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _parsedUrl
    ) => {
      (res as NextApiResponse).status(200).json({ message: 'Mock response' });
    };
    return handler;
  }),
}));

export default mockNext;
