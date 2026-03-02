import React, { useState } from 'react';
import styled from 'styled-components';
import { Outlet, useNavigate } from 'react-router-dom';
import { AppShell, Button } from '@andisds/ui';
import { LayoutDashboard, LogOut, FileText, Database, ArrowLeft, AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';


const UserInfo = styled.div`
  text-align: right;
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`;

export const DashboardLayout: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const getMenuItems = () => {
        return [
            {
                id: 'crm-home',
                label: 'Home',
                icon: <LayoutDashboard size={20} />,
                path: '/crm/home',
            },
            {
                id: 'cadastros',
                label: 'Cadastros',
                icon: <Database size={20} />,
                children: [
                    { id: 'produtos', label: 'Produtos', path: '/crm/cadastros/produtos' },
                    { id: 'fluxos', label: 'Fluxos', path: '/crm/cadastros/fluxos' },
                    { id: 'usuarios', label: 'Usuários', path: '/crm/cadastros/usuarios' },
                ]
            },
            {
                id: 'propostas',
                label: 'Propostas',
                icon: <FileText size={20} />,
                path: '/crm/propostas',
            },
            {
                id: 'leia-me',
                label: 'Leia Me',
                icon: <AlertCircle size={20} color="#ef4444" />,
                path: '/crm/leia-me',
            }
        ];
    };

    const menuItems = getMenuItems();

    const handleNavigate = (item: any) => {
        if (item.path) {
            navigate(item.path);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const HeaderContent = (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Button variant="ghost" onClick={() => navigate('/modules')} style={{ padding: '8px' }}>
                    <ArrowLeft size={20} />
                </Button>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontWeight: 700, fontSize: '1.125rem' }}>Arasol POC</span>
                    <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>CRM</span>
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <UserInfo>
                    <span style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600 }}>{user?.name}</span>
                    <span style={{ display: 'block', fontSize: '0.75rem', opacity: 0.7 }}>{user?.email}</span>
                </UserInfo>

                <Button variant="ghost" onClick={handleLogout} style={{ padding: 8 }}>
                    <LogOut size={18} />
                </Button>
            </div>
        </div>
    );

    return (
        <AppShell
            menuItems={menuItems}
            sidebarCollapsed={sidebarCollapsed}
            onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
            onNavigate={handleNavigate}
            headerContent={HeaderContent}
        >
            <Outlet />
        </AppShell>
    );
};
