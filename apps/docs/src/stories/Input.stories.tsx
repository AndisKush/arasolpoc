import type { Meta, StoryObj } from '@storybook/react';
// import { fn } from '@storybook/test';
import { Input } from '@andisds/ui';

const meta: Meta<typeof Input> = {
  title: 'Form/Input',
  component: Input,
  tags: ['autodocs'],
  // Aqui definimos controles manuais para props nativas que queremos destacar
  argTypes: {
    placeholder: {
      description: 'Texto de ajuda dentro do input (Nativo HTML)',
      control: 'text',
      table: { category: 'Native Attributes' }
    },
    disabled: {
      description: 'Desabilita a interação',
      control: 'boolean',
      table: { category: 'Native Attributes' }
    },
    type: {
      description: 'Tipo do input HTML',
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'date'],
      table: { category: 'Native Attributes' }
    }
  },
  // Args padrão para todas as stories
  args: {
    onChange: () => console.log('Changed'), // usar fn depois
    onFocus: () => {},
    onBlur: () => {},
  }
};

export default meta;
type Story = StoryObj<typeof Input>;

// Story Principal
export const Default: Story = {
  args: {
    label: 'Nome Completo',
    placeholder: 'Ex: João da Silva',
  },
};

// Story de Erro
export const WithError: Story = {
  args: {
    label: 'E-mail',
    value: 'email-invalido',
    error: 'Por favor, insira um e-mail válido.',
    onChange: () => console.log('error'), // usar fn depois
  },
};

// Story de Senha
export const Password: Story = {
  args: {
    label: 'Senha',
    type: 'password',
    placeholder: '******',
  },
};

// Story Desabilitado
export const Disabled: Story = {
  args: {
    label: 'Usuário (Bloqueado)',
    value: 'admin_master',
    disabled: true,
  },
};