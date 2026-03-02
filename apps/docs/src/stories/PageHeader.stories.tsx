import type { Meta, StoryObj } from '@storybook/react';
import { PageHeader, Button } from '@andisds/ui';
import { Plus } from 'lucide-react';

const meta = {
    title: 'UI/PageHeader',
    component: PageHeader,
    tags: ['autodocs'],
    argTypes: {
        title: { control: 'text' },
    },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: 'Dashboard',
    },
};

export const WithAction: Story = {
    args: {
        title: 'Usuários',
        action: (
            <Button>
                <Plus size={18} style={{ marginRight: 8 }} />
                Novo Usuário
            </Button>
        ),
    },
};
