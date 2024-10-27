import React, { useEffect, useState } from 'react';
import { useMovies } from '../hooks/useMovies';
import { useSearch } from '../hooks/useSearch';
import MovieList from '../components/MovieList';
import SearchBar from '../components/SearchBar';
import Typography from '@/shared/components/Typography';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import Modal from '@/shared/components/Modal';
import MovieForm from '../components/MovieForm';
import MovieDeleteContainer from './MovieDeleteContainer';
import { Movie, MovieInput } from '../types/movieTypes';
import Box from '@/shared/components/Box';
import Button from '@/shared/components/Button';

const MoviesListContainer: React.FC = () => {
  const {
    movies,
    loading,
    error,
    fetchMovies,
    modifyMovie,
    createMovie,
    removeMovie,
  } = useMovies();
  const {
    searchResults,
    searchTerm,
    loading: searchLoading,
    handleSearch,
    clearSearch,
  } = useSearch();

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    fetchMovies(); // Fetch movies on component mount
    // eslint-disable-next-line
  }, []);

  const displayMovies = searchTerm ? searchResults : movies;

  const handleEdit = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (updatedMovie: MovieInput) => {
    if (selectedMovie) {
      await modifyMovie(selectedMovie.id, updatedMovie);
      setIsEditModalOpen(false);
      setSelectedMovie(null);
      await fetchMovies(); // Refresh movies list after editing
    }
  };

  const handleDelete = (id: string) => {
    setSelectedMovie(movies.find((movie) => movie.id === id) || null);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedMovie) {
      await removeMovie(selectedMovie.id); // Remove the movie
      setIsDeleteModalOpen(false);
      setSelectedMovie(null);
      await fetchMovies(); // Refresh movies list after deletion
    }
  };

  const handleAdd = () => setIsAddModalOpen(true);

  const handleAddSubmit = async (newMovie: MovieInput) => {
    await createMovie(newMovie);
    setIsAddModalOpen(false);
    await fetchMovies(); // Refresh movies list after adding
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setIsAddModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <Box $padding="16px">
      <Typography variant="h4" $marginBottom="16px">
        Movies
      </Typography>

      <Box
        $display="flex"
        $alignItems="center"
        $gap="16px"
        $marginBottom="16px"
      >
        <Button $variant="primary" onClick={handleAdd}>
          Add New Movie
        </Button>
        <SearchBar onSearch={handleSearch} onClear={clearSearch} />
      </Box>

      {loading || searchLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      ) : (
        <MovieList
          movies={displayMovies}
          loading={loading || searchLoading}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}

      {/* Modals */}
      {isEditModalOpen && selectedMovie && (
        <Modal isOpen={isEditModalOpen} onClose={closeModal}>
          <Typography variant="h5" $marginBottom="16px">
            Edit Movie
          </Typography>
          <MovieForm
            initialValues={selectedMovie}
            onSubmit={handleEditSubmit}
            onCancel={closeModal}
            submitButtonLabel="Save"
          />
        </Modal>
      )}

      {isAddModalOpen && (
        <Modal isOpen={isAddModalOpen} onClose={closeModal}>
          <Typography variant="h5" $marginBottom="16px">
            Add New Movie
          </Typography>
          <MovieForm
            onSubmit={handleAddSubmit}
            onCancel={closeModal}
            submitButtonLabel="Add"
          />
        </Modal>
      )}

      {isDeleteModalOpen && selectedMovie && (
        <MovieDeleteContainer
          onConfirm={handleDeleteConfirm}
          onClose={closeModal}
        />
      )}
    </Box>
  );
};

export default MoviesListContainer;
