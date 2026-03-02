import type { Meta, StoryObj } from '@storybook/react';
import { AppShell, type MenuItem } from '@andisds/ui';
import { Home, Settings, FileText } from 'lucide-react';

const mockMenu: MenuItem[] = [
  { id: '1', label: 'Início', icon: <Home size={20} />, href: '/' },
  { 
    id: '2', 
    label: 'Teste', 
    icon: <FileText size={20} />,
    children: [
      { id: '2-1', label: 'Submenu A', href: '/teste/a' },
      { id: '2-2', label: 'Submenu B', href: '/teste/b' },
    ]
  },
  { id: '3', label: 'Admin', icon: <Settings size={20} />, hiddenOnMobile: true },
];

const meta: Meta<typeof AppShell> = {
  title: 'Layout/AppShell',
  component: AppShell,
  parameters: {
    layout: 'fullscreen', // Remove o padding padrão do storybook
  },
};

export default meta;
type Story = StoryObj<typeof AppShell>;

export const Default: Story = {
  args: {
    menuItems: mockMenu,
    children: (
      <div style={{ border: '2px dashed #ccc', height: '2000px', padding: '20px' }}>
        <h1>Conteúdo Principal</h1>
        <p>Role para baixo para testar o comportamento do scroll e menu fixo.</p>
        <p>Redimensione a janela para ver a troca de Desktop para Mobile.</p>
      </div>
    ),
    headerContent: <span>Minha Empresa</span>
  },
};