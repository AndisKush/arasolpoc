import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Briefcase } from 'lucide-react';

const Container = styled.div`
  display: flex;
  height: calc(100vh - 80px); /* Discounting header if any */
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 24px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    padding: 48px 24px;
  }
`;

const ModuleCard = styled.div<{ disabled?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 260px;
  height: 260px;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 24px;
  box-shadow: ${({ theme }) => theme.shadows.md};
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  border: 1px solid ${({ theme }) => theme.colors.border};
  opacity: ${({ disabled }) => disabled ? 0.7 : 1};

  &:hover {
    transform: ${({ disabled }) => disabled ? 'none' : 'translateY(-8px)'};
    box-shadow: ${({ theme, disabled }) => disabled ? theme.shadows.md : theme.shadows.xl};
    border-color: ${({ theme, disabled }) => disabled ? theme.colors.border : theme.colors.primary};
  }
`;

const IconWrapper = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primaryLight};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  color: ${({ theme }) => theme.colors.primary};
`;

const ModuleTitle = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text};
`;

const ComingSoon = styled.span`
  margin-top: 12px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.backgroundAlt};
  padding: 6px 16px;
  border-radius: 99px;
  font-weight: 500;
`;

export const Modules: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <ModuleCard onClick={() => navigate('/crm/leia-me')}>
        <IconWrapper>
          <LayoutDashboard size={48} />
        </IconWrapper>
        <ModuleTitle>CRM</ModuleTitle>
      </ModuleCard>

      <ModuleCard disabled>
        <IconWrapper style={{ background: '#f4f4f5', color: '#a1a1aa' }}>
          <Briefcase size={48} />
        </IconWrapper>
        <ModuleTitle>Vendas</ModuleTitle>
        <ComingSoon>Em breve</ComingSoon>
      </ModuleCard>
    </Container>
  );
};
