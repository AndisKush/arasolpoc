import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #1d4ed8 100%);
  position: relative;
  overflow: hidden;
  padding: ${({ theme }) => theme.spacing[4]};

  &::before {
    content: '';
    position: absolute;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(234, 179, 8, 0.25) 0%, transparent 70%);
    top: -100px;
    right: -100px;
    border-radius: 50%;
  }

  &::after {
    content: '';
    position: absolute;
    width: 800px;
    height: 800px;
    background: radial-gradient(circle, rgba(29, 78, 216, 0.4) 0%, transparent 70%);
    bottom: -300px;
    left: -300px;
    border-radius: 50%;
  }
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: ${({ theme }) => theme.spacing[10]};
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: 100%;
  max-width: 440px;
  position: relative;
  z-index: 1;

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing[6]};
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.98);
  }
`;

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <Container>
      <Card><>{children}</></Card>
    </Container>
  );
};
