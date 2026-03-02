import { forwardRef } from 'react';
import type { TextareaHTMLAttributes } from 'react';
import styled from 'styled-components';
import { Label, ErrorText } from '../Typography';

export const TextAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const StyledTextArea = styled.textarea<{ $hasError?: boolean }>`
  width: 100%;
  min-height: 100px;
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid ${({ theme, $hasError }) => ($hasError ? theme.colors.error : theme.colors.border)};
  font-family: ${({ theme }) => theme.fontFamilies.sans};
  font-size: 0.95rem;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text};
  resize: vertical;
  transition: ${({ theme }) => theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme, $hasError }) => ($hasError ? theme.colors.error : theme.colors.primary)};
    box-shadow: 0 0 0 1px ${({ theme, $hasError }) => ($hasError ? theme.colors.error : theme.colors.primary)};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textTertiary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.colors.backgroundAlt};
  }
`;

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <TextAreaContainer>
        {label && <Label htmlFor={props.id}>{label}</Label>}
        <StyledTextArea ref={ref} $hasError={!!error} {...props} />
        {error && <ErrorText>{error}</ErrorText>}
      </TextAreaContainer>
    );
  }
);

TextArea.displayName = 'TextArea';
