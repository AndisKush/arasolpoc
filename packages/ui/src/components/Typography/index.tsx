'use client';
import styled from 'styled-components';

export const Heading = styled.h2<{ align?: string; color?: string }>`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  
  color: ${({ theme, color }) => color ? (theme.colors as any)[color] || color : theme.colors.text};
  text-align: ${({ align = 'left' }) => align};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const Label = styled.label`
  display: block;
  
  font-size: 0.95rem;
  font-weight: 500;
  line-height: ${({ theme }) => theme.lineHeights.normal};
  
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.9;
  margin-bottom: 0.5rem;
`;

export const ErrorText = styled.span`
  display: block;

  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  
  color: ${({ theme }) => theme.colors.error};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

export const Text = styled.p<{ align?: string; color?: string; size?: string; weight?: string }>`
  font-size: ${({ theme, size }) => size ? (theme.fontSizes as any)[size] || size : theme.fontSizes.md};
  font-weight: ${({ theme, weight }) => weight ? (theme.fontWeights as any)[weight] || weight : theme.fontWeights.regular};
  color: ${({ theme, color }) => color ? (theme.colors as any)[color] || color : theme.colors.text};
  text-align: ${({ align = 'left' }) => align};
  margin: 0;
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
`;

export const Caption = styled(Text)`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;