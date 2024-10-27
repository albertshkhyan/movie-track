import React from 'react';
import styled, { css } from 'styled-components';

interface TypographyProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'body1'
    | 'body2'
    | 'caption'
    | 'subtitle1'
    | 'subtitle2';
  color?:
    | 'primary'
    | 'secondary'
    | 'error'
    | 'warning'
    | 'info'
    | 'success'
    | 'textPrimary'
    | 'textSecondary'
    | 'disabled'
    | 'hint';
  align?: 'left' | 'center' | 'right' | 'justify';
  $marginBottom?: string | number;
  $marginTop?: string | number;
  $marginLeft?: string | number;
  $marginRight?: string | number;
  children: React.ReactNode;
}

const StyledTypography = styled.p<TypographyProps>`
  margin: ${({
    $marginTop = 0,
    $marginBottom = 0,
    $marginLeft = 0,
    $marginRight = 0,
  }) => `
    ${typeof $marginTop === 'number' ? `${$marginTop}px` : $marginTop} 
    ${typeof $marginRight === 'number' ? `${$marginRight}px` : $marginRight} 
    ${typeof $marginBottom === 'number' ? `${$marginBottom}px` : $marginBottom} 
    ${typeof $marginLeft === 'number' ? `${$marginLeft}px` : $marginLeft}`};
  padding: 0;
  text-align: ${({ align }) => align || 'left'};
  color: ${({ theme, color }) => {
    switch (color) {
      case 'primary':
        return theme.palette.primary.main;
      case 'secondary':
        return theme.palette.secondary.main;
      case 'error':
        return theme.palette.error.main;
      case 'warning':
        return theme.palette.warning.main;
      case 'info':
        return theme.palette.info.main;
      case 'success':
        return theme.palette.success.main;
      case 'textPrimary':
        return theme.palette.text.primary;
      case 'textSecondary':
        return theme.palette.text.secondary;
      case 'disabled':
        return theme.palette.text.disabled;
      case 'hint':
        return theme.palette.text.hint;
      default:
        return theme.palette.text.primary;
    }
  }};

  ${({ variant, theme }) => {
    switch (variant) {
      case 'h1':
        return css`
          font-size: ${theme.typography.h1.fontSize};
          font-weight: ${theme.typography.h1.fontWeight};
          line-height: ${theme.typography.h1.lineHeight};
        `;
      case 'h2':
        return css`
          font-size: ${theme.typography.h2.fontSize};
          font-weight: ${theme.typography.h2.fontWeight};
          line-height: ${theme.typography.h2.lineHeight};
        `;
      case 'h3':
        return css`
          font-size: ${theme.typography.h3.fontSize};
          font-weight: ${theme.typography.h3.fontWeight};
          line-height: ${theme.typography.h3.lineHeight};
        `;
      case 'h4':
        return css`
          font-size: ${theme.typography.h4.fontSize};
          font-weight: ${theme.typography.h4.fontWeight};
          line-height: ${theme.typography.h4.lineHeight};
        `;
      case 'h5':
        return css`
          font-size: ${theme.typography.h5.fontSize};
          font-weight: ${theme.typography.h5.fontWeight};
          line-height: ${theme.typography.h5.lineHeight};
        `;
      case 'h6':
        return css`
          font-size: ${theme.typography.h6.fontSize};
          font-weight: ${theme.typography.h6.fontWeight};
          line-height: ${theme.typography.h6.lineHeight};
        `;
      case 'body1':
        return css`
          font-size: ${theme.typography.body1.fontSize};
          font-weight: ${theme.typography.body1.fontWeight};
          line-height: ${theme.typography.body1.lineHeight};
        `;
      case 'body2':
        return css`
          font-size: ${theme.typography.body2.fontSize};
          font-weight: ${theme.typography.body2.fontWeight};
          line-height: ${theme.typography.body2.lineHeight};
        `;
      case 'caption':
        return css`
          font-size: ${theme.typography.caption.fontSize};
          font-weight: ${theme.typography.caption.fontWeight};
          line-height: ${theme.typography.caption.lineHeight};
        `;
      case 'subtitle1':
        return css`
          font-size: ${theme.typography.subtitle1.fontSize};
          font-weight: ${theme.typography.subtitle1.fontWeight};
          line-height: ${theme.typography.subtitle1.lineHeight};
        `;
      case 'subtitle2':
        return css`
          font-size: ${theme.typography.subtitle2.fontSize};
          font-weight: ${theme.typography.subtitle2.fontWeight};
          line-height: ${theme.typography.subtitle2.lineHeight};
        `;
      default:
        return css`
          font-size: ${theme.typography.body1.fontSize};
          font-weight: ${theme.typography.body1.fontWeight};
          line-height: ${theme.typography.body1.lineHeight};
        `;
    }
  }}
`;

const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'body1',
  color = 'textPrimary',
  align = 'left',
  $marginBottom,
  $marginTop,
  $marginLeft,
  $marginRight,
  ...restProps
}) => (
  <StyledTypography
    variant={variant}
    color={color}
    align={align}
    $marginBottom={$marginBottom}
    $marginTop={$marginTop}
    $marginLeft={$marginLeft}
    $marginRight={$marginRight}
    {...restProps}
  >
    {children}
  </StyledTypography>
);

export default Typography;
