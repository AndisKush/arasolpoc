import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { PageHeader, Button, Table, Input } from '@andisds/ui';
import { Plus } from 'lucide-react';
import { userService } from '../../services/user.service';
import { UserRole } from '../../types';
import type { User } from '../../types';

const Filters = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  max-width: 400px;
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: ${({ theme, status }) =>
        status === 'active' ? theme.colors.success + '20' : theme.palette.gray[200]};
  color: ${({ theme, status }) =>
        status === 'active' ? theme.colors.success : theme.colors.textSecondary};
`;

export const UsersList: React.FC = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const loadUsers = async () => {
        try {
            setLoading(true);
            const data = search
                ? await userService.search(search)
                : await userService.getAll();
            setUsers(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, [search]); // Debounce seria ideal aqui

    const handleDelete = async (user: User) => {
        if (confirm(`Tem certeza que deseja excluir ${user.name}?`)) {
            try {
                await userService.delete(user.id);
                loadUsers();
            } catch (error) {
                alert('Erro ao excluir usuário');
            }
        }
    };

    const columns = [
        { header: 'Nome', accessorKey: 'name' as keyof User },
        { header: 'Email', accessorKey: 'email' as keyof User },
        {
            header: 'Role',
            cell: (u: User) => u.role === UserRole.ADMIN ? 'Administrador' : 'Usuário'
        },
        {
            header: 'Status',
            cell: (u: User) => <StatusBadge status={u.status}>{u.status === 'active' ? 'Ativo' : 'Inativo'}</StatusBadge>
        },
        {
            header: 'Criado em',
            cell: (u: User) => new Date(u.createdAt).toLocaleDateString()
        }
    ];

    return (
        <div>
            <PageHeader
                title="Gerenciar Usuários"
                action={
                    <Button onClick={() => navigate('/admin/users/new')}>
                        <Plus size={18} style={{ marginRight: 8 }} />
                        Novo Usuário
                    </Button>
                }
            />

            <Filters>
                <div style={{ flex: 1, position: 'relative' }}>
                    <Input
                        placeholder="Buscar por nome ou email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </Filters>

            <Table
                data={users}
                columns={columns}
                isLoading={loading}
                onEdit={(user) => navigate(`/admin/users/${user.id}/edit`)}
                onDelete={handleDelete}
            />
        </div>
    );
};
