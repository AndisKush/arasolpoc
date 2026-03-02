import type { ReactNode } from 'react';

export interface MenuItem {
  id: string;
  label: string;
  href?: string;
  icon?: ReactNode;
  hiddenOnMobile?: boolean;
  children?: MenuItem[];
}

export interface AppShellProps {
  children: ReactNode;
  menuItems: MenuItem[];
  sidebarCollapsed?: boolean;
  onToggleSidebar?: () => void;
  headerContent?: ReactNode;
  onNavigate?: (item: MenuItem) => void;
}