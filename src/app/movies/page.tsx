'use client';

import React from 'react';
import MoviesListContainer from '@/frontend/modules/movies/containers/MoviesListContainer';
import Box from '@/shared/components/Box';
import Typography from '@/shared/components/Typography';

const MoviesPage: React.FC = () => {
  return (
    <Box $display="flex" $flexDirection="column" $padding="2rem">
      <Typography variant="h4" $marginBottom="1rem" align="center">
        Movie Collection
      </Typography>
      <MoviesListContainer />
    </Box>
  );
};

export default MoviesPage;
