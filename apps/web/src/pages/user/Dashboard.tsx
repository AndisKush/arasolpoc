import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PageHeader, StatsCard } from '@andisds/ui';
import { eventService } from '../../services/event.service';
import type { DashboardStats } from '../../types';
import { useAuth } from '../../hooks/useAuth';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: ${({ theme }) => theme.spacing[6]};
  margin-top: ${({ theme }) => theme.spacing[6]};
`;

export const UserDashboard: React.FC = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadStats = async () => {
            if (!user?.id) return;

            try {
                const data = await eventService.getStats(user.id);
                setStats(data);
            } catch (error) {
                console.error('Erro ao carregar estatísticas', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadStats();
    }, [user]);

    if (isLoading) return <div>Carregando dashboard...</div>;

    return (
        <div>
            <PageHeader title="Meu Dashboard" />

            {stats && (
                <Grid>
                    <StatsCard
                        label="Total de Eventos"
                        value={stats.total}
                    />
                    <StatsCard
                        label="Ativos"
                        value={stats.active}
                    />
                    <StatsCard
                        label="Concluídos"
                        value={stats.completed || 0}
                    />
                    <StatsCard
                        label="Novos este mês"
                        value={stats.newThisMonth}
                    />
                </Grid>
            )}
        </div>
    );
};
