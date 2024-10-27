import React from 'react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import MovieList from '@/frontend/modules/movies/components/MovieList';
import { mockTheme } from '../../__mocks__/themeMock';

describe('MovieList Component', () => {
  const sampleMovies = [
    {
      id: '1',
      title: 'Movie 1',
      description: 'Description 1',
      genre: 'Genre 1',
      releaseYear: 2001,
    },
    {
      id: '2',
      title: 'Movie 2',
      description: 'Description 2',
      genre: 'Genre 2',
      releaseYear: 2002,
    },
  ];

  const mockOnDelete = jest.fn();
  const mockOnEdit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithTheme = (component) => {
    return renderer.create(
      <ThemeProvider theme={mockTheme}>{component}</ThemeProvider>
    );
  };

  it('matches snapshot when loading is true', () => {
    const tree = renderWithTheme(
      <MovieList
        movies={[]}
        loading={true}
        onDelete={jest.fn()}
        onEdit={jest.fn()}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders loading spinner when loading is true', () => {
    const component = renderWithTheme(
      <MovieList
        movies={[]}
        loading={true}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders "No movies found" when there are no movies', () => {
    const component = renderWithTheme(
      <MovieList
        movies={[]}
        loading={false}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a list of movies', () => {
    const component = renderWithTheme(
      <MovieList
        movies={sampleMovies}
        loading={false}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls onEdit when the Edit button is clicked', async () => {
    renderWithTheme(
      <MovieList
        movies={sampleMovies}
        loading={false}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    );

    const editButtons = screen.getAllByText('Edit');
    fireEvent.click(editButtons[0]);

    await waitFor(() => {
      expect(mockOnEdit).toHaveBeenCalledTimes(1);
      expect(mockOnEdit).toHaveBeenCalledWith(sampleMovies[0]);
    });
  });

  it('calls onDelete when the Delete button is clicked', async () => {
    renderWithTheme(
      <MovieList
        movies={sampleMovies}
        loading={false}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    );

    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(mockOnDelete).toHaveBeenCalledTimes(1);
      expect(mockOnDelete).toHaveBeenCalledWith(sampleMovies[0].id);
    });
  });
});
