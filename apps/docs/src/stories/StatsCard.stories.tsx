import type { Meta, StoryObj } from '@storybook/react';
import { StatsCard } from '@andisds/ui';

const meta = {
    title: 'UI/StatsCard',
    component: StatsCard,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        label: { control: 'text' },
        value: { control: 'text' },
        description: { control: 'text' },
    },
} satisfies Meta<typeof StatsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: 'Total de Usuários',
        value: 1250,
    },
};

export const WithDescription: Story = {
    args: {
        label: 'Receita Mensal',
        value: 'R$ 45.000,00',
        description: '+15% em relação ao mês anterior',
    },
};
