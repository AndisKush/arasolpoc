import styled, { css } from 'styled-components';

// Definimos interface apenas para as props visuais (style-only)
interface ContainerProps {
  $variant: 'primary' | 'secondary' | 'outline' | 'ghost';
}

export const Container = styled.button<ContainerProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[6]}`};
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  transition: all ${({ theme }) => theme.transitions.base};
  cursor: pointer;
  border: ${({ theme }) => theme.borderWidths[1]} solid transparent;
  box-shadow: ${({ theme }) => theme.shadows.sm};

  /* Variantes de Estilo */
  ${({ theme, $variant }) => {
    switch ($variant) {
      case 'secondary':
        return css`
          background-color: ${theme.colors.secondary};
          color: ${theme.colors.textInverted};
          border-color: ${theme.colors.secondary};
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.secondaryHover};
            border-color: ${theme.colors.secondaryHover};
            box-shadow: ${theme.shadows.md};
          }
          
          &:active:not(:disabled) {
            background-color: ${theme.colors.secondaryActive};
            border-color: ${theme.colors.secondaryActive};
            box-shadow: ${theme.shadows.sm};
          }
        `;
      case 'outline':
        return css`
          background-color: transparent;
          border-color: ${theme.colors.primary};
          color: ${theme.colors.primary};
          box-shadow: none;
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primaryLight};
            border-color: ${theme.colors.primaryHover};
            color: ${theme.colors.primaryHover};
          }
          
          &:active:not(:disabled) {
            background-color: ${theme.colors.primaryLight};
            border-color: ${theme.colors.primaryActive};
            color: ${theme.colors.primaryActive};
          }
        `;
      case 'ghost':
        return css`
          background-color: transparent;
          border-color: transparent;
          color: ${theme.colors.textSecondary};
          box-shadow: none;
          padding-left: ${theme.spacing[2]};
          padding-right: ${theme.spacing[2]};
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.surfaceHover};
            color: ${theme.colors.primary};
          }
          
          &:active:not(:disabled) {
            background-color: ${theme.colors.border};
            color: ${theme.colors.primaryActive};
          }
        `;
      case 'primary':
      default:
        return css`
          background-color: ${theme.colors.primary};
          color: ${theme.colors.textInverted};
          border-color: ${theme.colors.primary};
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primaryHover};
            border-color: ${theme.colors.primaryHover};
            box-shadow: ${theme.shadows.md};
            transform: translateY(-1px);
          }
          
          &:active:not(:disabled) {
            background-color: ${theme.colors.primaryActive};
            border-color: ${theme.colors.primaryActive};
            box-shadow: ${theme.shadows.sm};
            transform: translateY(0);
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: none;
  }

  &:focus-visible {
    outline: ${({ theme }) => theme.borderWidths[2]} solid ${({ theme }) => theme.colors.borderFocus};
    outline-offset: 2px;
  }
`;