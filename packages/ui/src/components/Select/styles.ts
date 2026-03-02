import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const SelectButton = styled.button<{ $hasError?: boolean }>`
  width: 100%;
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid ${({ theme, $hasError }) =>
    $hasError ? theme.colors.error : theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 1rem;
  
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const DropdownList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  margin-top: 4px;
  max-height: 250px;
  overflow-y: auto;
  z-index: 50;
  box-shadow: ${({ theme }) => theme.shadows.lg};
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 8px;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  outline: none;
  font-size: 0.875rem;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
`;

export const Option = styled.div`
  padding: 10px 16px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceHover};
  }
  color: ${({ theme }) => theme.colors.text};
`;