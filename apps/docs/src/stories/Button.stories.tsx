import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@andisds/ui';

const meta: Meta<typeof Button> = {
  title: 'UI/Button', // Categoria na sidebar
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline'],
      description: 'Define o estilo visual do botão',
    },
    disabled: {
      control: 'boolean',
    },
    onClick: { action: 'clicked' }
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Confirmar Ação',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Cancelar',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Ver Detalhes',
  },
};