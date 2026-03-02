'use client';
import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import { Label, ErrorText } from '../Typography';
import { InputContainer, StyledInput } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Label que aparece acima do input */
  label?: string;
  /** Mensagem de erro que deixa o input vermelho */
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <InputContainer>
        {label && <Label htmlFor={props.id}>{label}</Label>}
        <StyledInput ref={ref} $hasError={!!error} {...props} />
        {error && <ErrorText>{error}</ErrorText>}
      </InputContainer>
    );
  }
);

Input.displayName = 'Input';