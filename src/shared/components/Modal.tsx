import React, { useEffect, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  $width?: string;
  $padding?: string;
  $background?: string;
}

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
`;

const ModalContent = styled.div<{
  $width?: string;
  $padding?: string;
  $background?: string;
}>`
  background: ${({ theme, $background }) =>
    $background || theme.palette.background.paper};
  padding: ${({ $padding }) => $padding || '2rem'};
  border-radius: 8px;
  max-width: ${({ $width }) => $width || '500px'};
  width: 100%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.3s ease-out;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.palette.primary.main};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.palette.primary.contrastText};
  &:hover {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  $width,
  $padding,
  $background,
}) => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalContent
        onClick={(e) => e.stopPropagation()}
        $width={$width}
        $padding={$padding}
        $background={$background}
      >
        {title && (
          <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
            <CloseButton onClick={onClose}>&times;</CloseButton>
          </ModalHeader>
        )}
        {children}
      </ModalContent>
    </Overlay>
  );
};

export default Modal;
