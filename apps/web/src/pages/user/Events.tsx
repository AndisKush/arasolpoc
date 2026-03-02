import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { PageHeader, Button, Table, Input } from '@andisds/ui';
import { Plus } from 'lucide-react';
import { eventService } from '../../services/event.service';
import { useAuth } from '../../hooks/useAuth';
import type { Event } from '../../types';

const Filters = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  max-width: 400px;
`;

export const EventsList: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const loadEvents = async () => {
        if (!user) return;
        try {
            setLoading(true);
            const data = search
                ? await eventService.search(search, user.id)
                : await eventService.getAll(user.id);
            setEvents(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadEvents();
    }, [search, user]);

    const handleDelete = async (event: Event) => {
        if (!user) return;
        if (confirm(`Tem certeza que deseja excluir ${event.name}?`)) {
            try {
                await eventService.delete(event.id, user.id);
                loadEvents();
            } catch (error) {
                alert('Erro ao excluir evento');
            }
        }
    };

    const columns = [
        { header: 'Nome', accessorKey: 'name' as keyof Event },
        {
            header: 'SQL',
            cell: (e: Event) => <code style={{ fontSize: '0.8em', background: '#f3f4f6', padding: '2px 4px' }}>{e.sql}</code>
        },
        {
            header: 'Status',
            cell: (e: Event) => (
                <span style={{
                    color: e.status === 'completed' ? 'green' : e.status === 'active' ? 'blue' : 'orange',
                    fontWeight: 500,
                    textTransform: 'capitalize'
                }}>
                    {e.status}
                </span>
            )
        },
        {
            header: 'Criado em',
            cell: (e: Event) => new Date(e.createdAt).toLocaleDateString()
        }
    ];

    return (
        <div>
            <PageHeader
                title="Meus Eventos"
                action={
                    <Button onClick={() => navigate('/events/new')}>
                        <Plus size={18} style={{ marginRight: 8 }} />
                        Novo Evento
                    </Button>
                }
            />

            <Filters>
                <div style={{ flex: 1, position: 'relative' }}>
                    <Input
                        placeholder="Buscar eventos..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </Filters>

            <Table
                data={events}
                columns={columns}
                isLoading={loading}
                onEdit={(event) => navigate(`/events/${event.id}/edit`)}
                onDelete={handleDelete}
            />
        </div>
    );
};
