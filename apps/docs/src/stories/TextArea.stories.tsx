import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from '@andisds/ui';

const meta: Meta<typeof TextArea> = {
    title: 'Components/TextArea',
    component: TextArea,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
    args: {
        label: 'Descrição',
        placeholder: 'Digite a descrição aqui...',
    },
};

export const WithError: Story = {
    args: {
        label: 'SQL Query',
        value: 'SELECT * FROM users',
        error: 'Query SQL inválida.',
    },
};

export const Disabled: Story = {
    args: {
        label: 'Campo Desativado',
        placeholder: 'Não é possível editar',
        disabled: true,
    },
};
