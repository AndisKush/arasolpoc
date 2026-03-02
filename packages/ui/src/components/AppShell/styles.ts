import styled from 'styled-components';

const MOBILE_BREAKPOINT = '768px';
const SIDEBAR_WIDTH = '260px';
const SIDEBAR_COLLAPSED_WIDTH = '80px';
const HEADER_HEIGHT = '60px';
const BOTTOM_NAV_HEIGHT = '70px';

export const ShellContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  overflow: hidden;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    flex-direction: column;
  }
`;

export const Sidebar = styled.aside<{ $collapsed?: boolean }>`
  width: ${({ $collapsed }) => ($collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH)};
  background-color: ${({ theme }) => theme.colors.surface};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  transition: width 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: sticky;
  top: 0;
  z-index: 20;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    display: none;
  }
`;

export const BottomNav = styled.nav`
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${BOTTOM_NAV_HEIGHT};
  background-color: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  z-index: 30;
  padding-bottom: env(safe-area-inset-bottom);

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
`;

export const Header = styled.header`
  height: ${HEADER_HEIGHT};
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${({ theme }) => theme.spacing.md};
  position: sticky;
  top: 0;
  z-index: 10;
`;

export const MainContent = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.lg};
  overflow-y: auto;
  height: 100vh;
  padding-bottom: calc(${BOTTOM_NAV_HEIGHT} + 20px);

  @media (min-width: ${MOBILE_BREAKPOINT}) {
    padding-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

export const DesktopMenuItem = styled.div<{ $active?: boolean }>`
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.text)};
  background-color: ${({ theme, $active }) => ($active ? theme.colors.surfaceHover : 'transparent')};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceHover};
  }
`;

export const SubMenuContainer = styled.div`
  padding-left: 20px;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
`;

export const MobileNavItem = styled.div<{ $active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  gap: 4px;
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.textSecondary)};
  cursor: pointer;
  flex: 1;
  height: 100%;
`;

export const MobileMenuDrawer = styled.div`
  position: fixed;
  bottom: ${BOTTOM_NAV_HEIGHT}; /* Fica logo acima da barra de navegação */
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: ${({ theme }) => theme.spacing.md};
  z-index: 29;
  
  /* Animação de entrada suave */
  animation: slideUp 0.3s ease-out;

  @keyframes slideUp {
    from { transform: translateY(100%); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  /* REGRA DE OURO: Esconder forçosamente no Desktop */
  @media (min-width: ${MOBILE_BREAKPOINT}) {
    display: none !important;
  }
`;

export const DrawerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

export const SidebarFooter = styled.div`
  padding: 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;