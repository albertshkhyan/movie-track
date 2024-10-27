import React, { useState } from 'react';
import Modal from '@/shared/components/Modal';
import Typography from '@/shared/components/Typography';
import Button from '@/shared/components/Button';
import Box from '@/shared/components/Box';

interface MovieDeleteContainerProps {
  onConfirm: () => void;
  onClose: () => void;
}

const MovieDeleteContainer: React.FC<MovieDeleteContainerProps> = ({
  onConfirm,
  onClose,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  // Handle delete action with confirmation
  const handleDelete = async () => {
    setIsDeleting(true);
    onConfirm(); // Trigger the delete action from MoviesListContainer
    setIsDeleting(false);
    onClose(); // Close the modal after deletion
  };

  return (
    <Modal isOpen onClose={onClose}>
      <Box
        $display="flex"
        $flexDirection="column"
        $alignItems="center"
        $gap={1}
      >
        <Typography variant="h6">Confirm Delete</Typography>
        <Typography variant="body1">
          Are you sure you want to delete this movie?
        </Typography>
        <Box $display="flex" $gap={1} $marginTop={2}>
          <Button
            $variant="primary"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Yes, Delete'}
          </Button>
          <Button $variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default MovieDeleteContainer;
