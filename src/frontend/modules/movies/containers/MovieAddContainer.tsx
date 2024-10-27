import React, { useState } from 'react';
import { useMovies } from '../hooks/useMovies';
import MovieForm from '../components/MovieForm';
import Modal from '@/shared/components/Modal';
import Typography from '@/shared/components/Typography';
import Button from '@/shared/components/Button';
import Box from '@/shared/components/Box';
import { MovieInput } from '../types/movieTypes';

interface MovieAddContainerProps {
  onClose: () => void;
}

const MovieAddContainer: React.FC<MovieAddContainerProps> = ({ onClose }) => {
  const { createMovie } = useMovies();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    onClose();
  };

  // Handle form submission for adding a new movie
  const handleAddSubmit = async (newMovie: MovieInput) => {
    await createMovie(newMovie);
    closeModal();
  };

  return (
    <Box>
      <Button onClick={openModal} $variant="primary">
        Add New Movie
      </Button>

      {/* Add Movie Modal */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <Typography variant="h5" $marginBottom="1rem">
            Add Movie
          </Typography>
          <MovieForm onSubmit={handleAddSubmit} onCancel={closeModal} />
        </Modal>
      )}
    </Box>
  );
};

export default MovieAddContainer;
