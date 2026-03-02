import styled from 'styled-components';

export interface StackProps {
    direction?: 'row' | 'column';
    gap?: number | string;
    align?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
    justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
    width?: string;
    padding?: string;
}

export const Stack = styled.div<StackProps>`
  display: flex;
  flex-direction: ${({ direction = 'column' }) => direction};
  gap: ${({ theme, gap }) => {
        if (typeof gap === 'number') {
            return (theme.spacing as Record<string, string>)[gap] || `${gap}px`;
        }
        return gap || theme.spacing.md;
    }};
  align-items: ${({ align = 'stretch' }) => align};
  justify-content: ${({ justify = 'flex-start' }) => justify};
  width: ${({ width = '100%' }) => width};
  padding: ${({ padding }) => padding || '0'};
`;
