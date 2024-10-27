import React from 'react';
import styled from 'styled-components';

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  $display?: string;
  $flexDirection?: 'row' | 'column';
  $alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  $justifyContent?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around';
  $padding?: string | number;
  $margin?: string | number;
  $gap?: string | number;
  $width?: string | number;
  $height?: string | number;
  $backgroundColor?: string;
  $border?: string;
  $borderRadius?: string | number;
  $boxShadow?: string;
  $overflow?: 'hidden' | 'auto' | 'scroll' | 'visible';

  // Additional margin and padding properties
  $marginTop?: string | number;
  $marginBottom?: string | number;
  $marginLeft?: string | number;
  $marginRight?: string | number;
  $paddingTop?: string | number;
  $paddingBottom?: string | number;
  $paddingLeft?: string | number;
  $paddingRight?: string | number;
}

// Styled component with dynamic styles based on props
const StyledBox = styled.div<BoxProps>`
  display: ${({ $display }) => $display || 'block'};
  flex-direction: ${({ $flexDirection }) => $flexDirection || 'row'};
  align-items: ${({ $alignItems }) => $alignItems || 'stretch'};
  justify-content: ${({ $justifyContent }) => $justifyContent || 'flex-start'};
  padding: ${({ $padding }) =>
    typeof $padding === 'number' ? `${$padding}px` : $padding};
  margin: ${({ $margin }) =>
    typeof $margin === 'number' ? `${$margin}px` : $margin};
  gap: ${({ $gap }) => (typeof $gap === 'number' ? `${$gap}px` : $gap)};
  width: ${({ $width }) =>
    typeof $width === 'number' ? `${$width}px` : $width};
  height: ${({ $height }) =>
    typeof $height === 'number' ? `${$height}px` : $height};
  background-color: ${({ $backgroundColor, theme }) =>
    $backgroundColor || theme.palette.background.default};
  border: ${({ $border }) => $border || 'none'};
  border-radius: ${({ $borderRadius }) =>
    typeof $borderRadius === 'number' ? `${$borderRadius}px` : $borderRadius};
  box-shadow: ${({ $boxShadow }) => $boxShadow || 'none'};
  overflow: ${({ $overflow }) => $overflow || 'visible'};

  /* Additional specific margin and padding styles */
  margin-top: ${({ $marginTop }) =>
    typeof $marginTop === 'number' ? `${$marginTop}px` : $marginTop};
  margin-bottom: ${({ $marginBottom }) =>
    typeof $marginBottom === 'number' ? `${$marginBottom}px` : $marginBottom};
  margin-left: ${({ $marginLeft }) =>
    typeof $marginLeft === 'number' ? `${$marginLeft}px` : $marginLeft};
  margin-right: ${({ $marginRight }) =>
    typeof $marginRight === 'number' ? `${$marginRight}px` : $marginRight};

  padding-top: ${({ $paddingTop }) =>
    typeof $paddingTop === 'number' ? `${$paddingTop}px` : $paddingTop};
  padding-bottom: ${({ $paddingBottom }) =>
    typeof $paddingBottom === 'number'
      ? `${$paddingBottom}px`
      : $paddingBottom};
  padding-left: ${({ $paddingLeft }) =>
    typeof $paddingLeft === 'number' ? `${$paddingLeft}px` : $paddingLeft};
  padding-right: ${({ $paddingRight }) =>
    typeof $paddingRight === 'number' ? `${$paddingRight}px` : $paddingRight};
`;

// Box component that passes down the dynamic props to StyledBox
const Box: React.FC<BoxProps> = ({ children, ...restProps }) => {
  return <StyledBox {...restProps}>{children}</StyledBox>;
};

export default Box;
