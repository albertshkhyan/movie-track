/* eslint-disable */
import request from 'supertest';
import expressApp from '../../../../expressApp'; // Import your Express app

// Mock Next.js
jest.mock('next', () => {
  return () => ({
    prepare: jest.fn(),
    getRequestHandler: jest.fn(() => (req, res) => {
      if (req.url === '/api/movies' && req.method === 'GET') {
        // Mock response for the movies API
        res.status(200).json([{ id: 1, title: 'Inception' }]);
      } else {
        res.status(404).send('Not Found');
      }
    }),
  });
});

describe('E2E Backend Test: Movies API', () => {
  // Test: Fetch all movies
  it('should fetch all movies', async () => {
    const response = await request(expressApp).get('/api/movies');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty('title');
  });

  // Additional tests...
});
