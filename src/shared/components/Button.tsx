import React from 'react';
import styled from 'styled-components';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  children: React.ReactNode;
  $variant?: 'primary' | 'secondary';
  $width?: string;
  $padding?: string;
  $fontSize?: string;
}

const StyledButton = styled.button<{
  $variant: 'primary' | 'secondary';
  $customWidth: string;
  $customPadding: string;
  $customFontSize: string;
}>`
  padding: ${({ $customPadding }) => $customPadding || '0.5rem 1rem'};
  border: none;
  border-radius: 4px;
  font-size: ${({ $customFontSize }) => $customFontSize || '1rem'};
  font-weight: 500;
  cursor: pointer;
  width: ${({ $customWidth }) => $customWidth || 'auto'};
  background-color: ${({ theme, $variant }) =>
    $variant === 'primary'
      ? theme.palette.primary.main
      : theme.palette.secondary.main};
  color: ${({ theme, $variant }) =>
    $variant === 'primary'
      ? theme.palette.primary.contrastText
      : theme.palette.secondary.contrastText};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme, $variant }) =>
      $variant === 'primary'
        ? theme.palette.primary.dark
        : theme.palette.secondary.dark};
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  $variant = 'primary',
  disabled = false,
  $width = 'auto',
  $padding = '0.5rem 1rem',
  $fontSize = '1rem',
  ...restProps
}) => (
  <StyledButton
    onClick={onClick}
    $variant={$variant}
    disabled={disabled}
    $customWidth={$width}
    $customPadding={$padding}
    $customFontSize={$fontSize}
    {...restProps}
  >
    {children}
  </StyledButton>
);

export default Button;
