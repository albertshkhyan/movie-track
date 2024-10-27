'use client';

import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '@/styles/globals';
import theme from '@/styles/theme';

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}
