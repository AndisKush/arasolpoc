import styled from 'styled-components';

export const FormContainer = styled.form`
  max-width: 600px;
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing[8]};
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const FormField = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

export const FormActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
  margin-top: ${({ theme }) => theme.spacing[8]};
  justify-content: flex-end;
`;
