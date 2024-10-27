'use client';

import React, { useState } from 'react';
import Card from '@/shared/components/Card';
import Button from '@/shared/components/Button';
import TextInput from '@/shared/components/TextInput';
import Modal from '@/shared/components/Modal';
import LoadingSpinner from '@/shared/components/LoadingSpinner';

const ExamplePage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleButtonClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000); // Simulate loading
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Example Page</h1>

      <Card>
        <h2>Shared Components Demo</h2>
        <TextInput
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type something..."
        />

        <Button onClick={() => setModalOpen(true)} $variant="primary">
          Open Modal
        </Button>

        <Button onClick={handleButtonClick} $variant="secondary">
          {loading ? <LoadingSpinner /> : 'Submit'}
        </Button>
      </Card>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h2>Modal Content</h2>
        <p>This is an example modal.</p>
        <Button onClick={() => setModalOpen(false)}>Close</Button>
      </Modal>
    </div>
  );
};

export default ExamplePage;
