import styled from 'styled-components';

export const InputContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const StyledInput = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: ${({ theme }) => theme.radii?.md || '6px'};
  
  background-color: ${({ theme }) => theme.colors.background || 'rgba(0, 0, 0, 0.2)'};
  
  border: 1px solid ${({ theme, $hasError }) =>
    $hasError ? theme.colors.error : (theme.colors.border || 'rgba(255, 255, 255, 0.1)')};
    
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  outline: none;
  transition: all 0.2s ease;

  &:hover {
     border-color: ${({ theme, $hasError }) =>
    $hasError ? theme.colors.error : (theme.colors.primary || '#7C3AED')};
  }

  &:focus {
    border-color: ${({ theme, $hasError }) =>
    $hasError ? theme.colors.error : (theme.colors.primary || '#7C3AED')};
      
    box-shadow: 0 0 0 2px ${({ theme, $hasError }) =>
    $hasError ? 'rgba(255,0,0,0.1)' : (theme.colors.primary ? `${theme.colors.primary}33` : 'rgba(124, 58, 237, 0.2)')};
      
    background-color: ${({ theme }) => theme.colors.surface};
  }
  
  &::placeholder {
      color: ${({ theme }) => theme.colors.text}66;
  }
`;