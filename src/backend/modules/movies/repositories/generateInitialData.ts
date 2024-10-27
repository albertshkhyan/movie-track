import { faker } from '@faker-js/faker';
import { Movie } from '../entities/movie';

const generateInitialMovies = (count: number = 10): Movie[] => {
  const movies: Movie[] = [];

  for (let i = 1; i <= count; i++) {
    // Start with ID 1 and increment
    const movie: Movie = {
      id: i.toString(),
      title: faker.lorem.words(3),
      description: faker.lorem.sentences(2),
      releaseYear: faker.date.past({ years: 20 }).getFullYear(),
      genre: faker.helpers.arrayElement([
        'Action',
        'Comedy',
        'Drama',
        'Sci-Fi',
        'Horror',
      ]),
    };

    movies.push(movie);
  }

  return movies;
};

export default generateInitialMovies;
