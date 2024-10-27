import React from 'react';
import styled, { keyframes } from 'styled-components';

interface SpinnerProps {
  $size?: string;
  $thickness?: string;
  $color?: string;
}

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const Spinner = styled.div<SpinnerProps>`
  border: ${({ $thickness }) => $thickness || '4px'} solid
    ${({ theme }) => theme.palette.background.paper};
  border-top: ${({ $thickness }) => $thickness || '4px'} solid
    ${({ $color, theme }) => $color || theme.palette.primary.main};
  border-radius: 50%;
  width: ${({ $size }) => $size || '40px'};
  height: ${({ $size }) => $size || '40px'};
  animation: ${spin} 1s linear infinite;
`;

const LoadingSpinner: React.FC<SpinnerProps> = ({
  $size,
  $thickness,
  $color,
}) => <Spinner $size={$size} $thickness={$thickness} $color={$color} />;

export default LoadingSpinner;
