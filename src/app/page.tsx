'use client';

import React from 'react';
import Box from '@/shared/components/Box';
import Button from '@/shared/components/Button';

const Home: React.FC = () => {
  return (
    <Box
      $display="flex"
      $flexDirection="column"
      $alignItems="center"
      $padding="2rem"
    >
      <Box $display="flex" $gap="1rem" $marginBottom="2rem">
        <Button
          $variant="primary"
          onClick={() => window.open('/movies', '_self')}
        >
          Go to Movies
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
