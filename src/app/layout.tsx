'use client';

import React from 'react';
import './globals.css';
import StyledComponentsRegistry from '@/providers/StyledComponentsRegistry';
import ThemeRegistry from '@/providers/ThemeRegistry';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <ThemeRegistry>{children}</ThemeRegistry>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
