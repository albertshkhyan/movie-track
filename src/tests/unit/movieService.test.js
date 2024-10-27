/* eslint-disable */
import {
  addMovie,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
} from '../../backend/modules/movies/services/moviesService';
import db from '../../db/lowdb'; // Assuming a database module or mock here

jest.mock('../../db/lowdb');

describe('Movie Service Unit Tests', () => {
  const mockMovie = {
    id: '1',
    title: 'Test Movie',
    description: 'A test movie',
    genre: 'Drama',
    releaseYear: 2023,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should add a movie', async () => {
    db.insert.mockResolvedValue({ ...mockMovie });

    const result = await addMovie(mockMovie);
    expect(result).toEqual(expect.objectContaining(mockMovie));
    expect(db.insert).toHaveBeenCalledWith(expect.objectContaining(mockMovie));
  });

  it('should get all movies', async () => {
    db.find.mockResolvedValue([mockMovie]);

    const result = await getMovies();
    expect(result).toEqual([mockMovie]);
    expect(db.find).toHaveBeenCalled();
  });

  it('should get a movie by ID', async () => {
    db.findById.mockResolvedValue(mockMovie);

    const result = await getMovieById(mockMovie.id);
    expect(result).toEqual(mockMovie);
    expect(db.findById).toHaveBeenCalledWith(mockMovie.id);
  });

  it('should update a movie', async () => {
    const updatedData = { title: 'Updated Movie Title' };
    db.update.mockResolvedValue({ ...mockMovie, ...updatedData });

    const result = await updateMovie(mockMovie.id, updatedData);
    expect(result).toEqual(expect.objectContaining(updatedData));
    expect(db.update).toHaveBeenCalledWith(mockMovie.id, updatedData);
  });

  it('should delete a movie', async () => {
    db.remove.mockResolvedValue(true);

    const result = await deleteMovie(mockMovie.id);
    expect(result).toBe(true);
    expect(db.remove).toHaveBeenCalledWith(mockMovie.id);
  });
});
