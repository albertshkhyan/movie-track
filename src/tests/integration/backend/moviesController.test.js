/* eslint-disable */
/* eslint-disable @typescript-eslint/no-require-imports */
// moviesController.test.js

const request = require('supertest');
const app = require('../../../app');
const { Movie } = require('../../../backend/modules/movies/entities/movie');
const { db } = require('../../../db/lowdb');

// Mock data
const sampleMovie = {
  title: 'Sample Movie',
  description: 'A test movie description',
  genre: 'Drama',
  releaseYear: 2021,
};

describe('Movies Controller', () => {
  let movieId;

  // Create a movie before each test that needs it
  beforeEach(async () => {
    const movie = await Movie.create(sampleMovie);
    movieId = movie._id;
  });

  // Clean up after each test
  afterEach(async () => {
    await Movie.deleteMany({});
  });

  // Test GET /movies
  describe('GET /api/movies', () => {
    it('should return all movies', async () => {
      const response = await request(app).get('/api/movies');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('movies');
      expect(Array.isArray(response.body.movies)).toBe(true);
    });
  });

  // Test GET /movies/:id
  describe('GET /api/movies/:id', () => {
    it('should return a movie by ID', async () => {
      const response = await request(app).get(`/api/movies/${movieId}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('movie');
      expect(response.body.movie.title).toBe(sampleMovie.title);
    });

    it('should return 404 if movie not found', async () => {
      const response = await request(app).get(
        `/api/movies/123456789012345678901234`
      );
      expect(response.status).toBe(404);
    });
  });

  // Test POST /movies
  describe('POST /api/movies', () => {
    it('should create a new movie', async () => {
      const newMovie = {
        title: 'New Movie',
        description: 'Another movie description',
        genre: 'Action',
        releaseYear: 2022,
      };

      const response = await request(app).post('/api/movies').send(newMovie);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('movie');
      expect(response.body.movie.title).toBe(newMovie.title);
    });

    it('should return 400 if required fields are missing', async () => {
      const response = await request(app).post('/api/movies').send({});
      expect(response.status).toBe(400);
    });
  });

  // Test PUT /movies/:id
  describe('PUT /api/movies/:id', () => {
    it('should update an existing movie', async () => {
      const updatedData = {
        title: 'Updated Movie Title',
        genre: 'Thriller',
      };

      const response = await request(app)
        .put(`/api/movies/${movieId}`)
        .send(updatedData);
      expect(response.status).toBe(200);
      expect(response.body.movie.title).toBe(updatedData.title);
      expect(response.body.movie.genre).toBe(updatedData.genre);
    });

    it('should return 404 if movie not found', async () => {
      const response = await request(app)
        .put('/api/movies/123456789012345678901234')
        .send({
          title: 'Nonexistent Movie',
        });
      expect(response.status).toBe(404);
    });
  });

  // Test DELETE /movies/:id
  describe('DELETE /api/movies/:id', () => {
    it('should delete a movie by ID', async () => {
      const response = await request(app).delete(`/api/movies/${movieId}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty(
        'message',
        'Movie deleted successfully'
      );
    });

    it('should return 404 if movie not found', async () => {
      const response = await request(app).delete(
        '/api/movies/123456789012345678901234'
      );
      expect(response.status).toBe(404);
    });
  });
});
