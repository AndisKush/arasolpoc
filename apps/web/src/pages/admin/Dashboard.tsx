import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PageHeader, StatsCard } from '@andisds/ui';
import { userService } from '../../services/user.service';
import type { DashboardStats } from '../../types';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: ${({ theme }) => theme.spacing[6]};
  margin-top: ${({ theme }) => theme.spacing[6]};
`;

export const AdminDashboard: React.FC = () => {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadStats = async () => {
            try {
                const data = await userService.getStats();
                setStats(data);
            } catch (error) {
                console.error('Erro ao carregar estatísticas', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadStats();
    }, []);

    if (isLoading) return <div>Carregando dashboard...</div>;

    return (
        <div>
            <PageHeader title="Dashboard Administrativo" />

            {stats && (
                <Grid>
                    <StatsCard
                        label="Total de Usuários"
                        value={stats.total}
                    />
                    <StatsCard
                        label="Usuários Ativos"
                        value={stats.active}
                        description={`${Math.round((stats.active / stats.total) * 100)}% da base`}
                    />
                    <StatsCard
                        label="Usuários Inativos"
                        value={stats.inactive || 0}
                    />
                    <StatsCard
                        label="Novos este mês"
                        value={stats.newThisMonth}
                        description="Crescimento recente"
                    />
                </Grid>
            )}
        </div>
    );
};
