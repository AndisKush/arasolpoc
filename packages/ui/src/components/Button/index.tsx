"use client"
import React, { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { Container } from './styles';

// Interface pública do componente
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', ...props }, ref) => {
    return (
      <Container ref={ref} $variant={variant} {...props}>
        {children}
      </Container>
    );
  }
);

Button.displayName = 'Button';