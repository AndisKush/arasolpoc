import type { Meta, StoryObj } from '@storybook/react';
import { Table, type Column } from '@andisds/ui';

interface User {
    id: string;
    name: string;
    email: string;
    status: string;
}

const meta: Meta<typeof Table<User>> = {
    title: 'Components/Table',
    component: Table,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Table<User>>;

const columns: Column<User>[] = [
    { header: 'Nome', accessorKey: 'name' },
    { header: 'Email', accessorKey: 'email' },
    {
        header: 'Status',
        cell: (user) => (
            <span style={{
                padding: '2px 8px',
                borderRadius: '4px',
                backgroundColor: user.status === 'Active' ? '#dcfce7' : '#fee2e2',
                color: user.status === 'Active' ? '#166534' : '#991b1b',
                fontSize: '0.75rem',
                fontWeight: 'bold'
            }}>
                {user.status}
            </span>
        )
    },
];

const data: User[] = [
    { id: '1', name: 'João Silva', email: 'joao@linkservice.com', status: 'Active' },
    { id: '2', name: 'Maria Souza', email: 'maria@linkservice.com', status: 'Inactive' },
    { id: '3', name: 'Pedro Santos', email: 'pedro@linkservice.com', status: 'Active' },
];

export const Default: Story = {
    args: {
        data,
        columns,
    },
};

export const WithActions: Story = {
    args: {
        data,
        columns,
        onEdit: (user) => alert(`Editando ${user.name}`),
        onDelete: (user) => alert(`Excluindo ${user.name}`),
    },
};

export const Loading: Story = {
    args: {
        data: [],
        columns,
        isLoading: true,
    },
};

export const Empty: Story = {
    args: {
        data: [],
        columns,
    },
};
