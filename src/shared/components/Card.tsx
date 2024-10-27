import React from 'react';
import styled, { css } from 'styled-components';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  $variant?: 'outlined' | 'elevated';
  $clickable?: boolean;
}

const StyledCard = styled.div<CardProps>`
  background-color: ${({ theme }) => theme.palette.background.paper};
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  transition:
    box-shadow 0.2s ease,
    transform 0.2s ease;

  ${({ $variant, theme }) =>
    $variant === 'outlined'
      ? css`
          border: 1px solid ${theme.palette.primary.main};
        `
      : css`
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        `}

  ${({ $clickable }) =>
    $clickable &&
    css`
      cursor: pointer;
      &:hover {
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        transform: translateY(-2px);
      }
    `}
`;

const Card: React.FC<CardProps> = ({
  children,
  $variant = 'elevated',
  $clickable = false,
  ...restProps
}) => (
  <StyledCard $variant={$variant} $clickable={$clickable} {...restProps}>
    {children}
  </StyledCard>
);

export default Card;
