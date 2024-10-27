// src/frontend/modules/movies/components/SearchBar.tsx

import React, { useState } from 'react';
import styled from 'styled-components';
import TextInput from '@/shared/components/TextInput';
import Button from '@/shared/components/Button';

interface SearchBarProps {
  onSearch: (term: string) => void;
  onClear: () => void;
}

// Styling for the search bar container
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onClear }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Handle input change and update the search term
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    onSearch(term); // Trigger the search with the updated term
  };

  // Clear the search input and reset search term
  const handleClear = () => {
    setSearchTerm('');
    onClear();
  };

  return (
    <SearchContainer>
      <TextInput
        placeholder="Search movies..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <Button $variant="primary" onClick={() => onSearch(searchTerm)}>
        Search
      </Button>
      <Button $variant="secondary" onClick={handleClear}>
        Clear
      </Button>
    </SearchContainer>
  );
};

export default SearchBar;
