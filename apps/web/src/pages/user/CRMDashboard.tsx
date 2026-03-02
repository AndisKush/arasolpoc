import React, { useState } from 'react';
import styled from 'styled-components';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie, Cell } from 'recharts';
import { Button } from '@andisds/ui';

const Container = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: 16px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const Tabs = styled.div`
  display: flex;
  gap: 8px;
`;

const MetricsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
`;

const MetricBox = styled.div<{ $bgColor: string; $color: string }>`
  background-color: ${({ $bgColor }) => $bgColor};
  color: ${({ $color }) => $color};
  padding: 24px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  transition: transform 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
  }
`;

const MetricValue = styled.div`
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 8px;
`;

const MetricLabel = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

const SecondaryMetricsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 8px;
`;

const PillMetric = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 99px;
  padding: 8px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  min-width: 140px;
  background-color: ${({ theme }) => theme.colors.surface};

  span:first-child {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
  span:last-child {
    font-size: 16px;
    font-weight: 600;
  }
`;

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 2px 8px rgba(0,0,0,0.02);
`;

const ChartTitle = styled.h3`
  margin: 0 0 24px 0;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text};
`;

// --- Mock Data ---
const areaData = [
    { name: 'Janeiro', Realizado: 400000, Meta: 1500000 },
    { name: 'Fevereiro', Realizado: 150000, Meta: 1500000 },
    { name: 'Março', Realizado: 20000, Meta: 1500000 },
    { name: 'Abril', Realizado: 0, Meta: 1500000 },
    { name: 'Maio', Realizado: 0, Meta: 1500000 },
    { name: 'Junho', Realizado: 0, Meta: 1500000 },
];

const pieData = [
    { name: 'Proposta Comercial', value: 100 },
    { name: 'Proposta de Serviços', value: 0 },
];
const COLORS = ['#eab308', '#3b82f6'];

const leadsFunilData = [
    { name: 'Lead Qualificado', value: 31 },
    { name: 'Lead Cadastrado', value: 3 },
];

const leadsPerdidosData = [
    { name: 'Proposta Rejeitada', value: 6 },
    { name: 'Sem interesse', value: 4 },
    { name: 'Fechou com outro', value: 3 },
    { name: 'Sem contato', value: 2 },
    { name: 'CPF reprovado', value: 2 },
];

export const CRMDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'propostas' | 'leads'>('propostas');

    return (
        <Container>
            <Header>
                <Title>Dashboards CRM</Title>
                <Tabs>
                    <Button
                        variant={activeTab === 'propostas' ? 'primary' : 'outline'}
                        onClick={() => setActiveTab('propostas')}
                    >
                        Propostas
                    </Button>
                    <Button
                        variant={activeTab === 'leads' ? 'primary' : 'outline'}
                        onClick={() => setActiveTab('leads')}
                    >
                        Leads
                    </Button>
                </Tabs>
            </Header>

            {activeTab === 'propostas' && (
                <>
                    <MetricsContainer>
                        <MetricBox $bgColor="#e0f2fe" $color="#0369a1">
                            <MetricValue>32</MetricValue>
                            <MetricLabel>Propostas</MetricLabel>
                        </MetricBox>
                        <MetricBox $bgColor="#dcfce7" $color="#15803d">
                            <MetricValue>126</MetricValue>
                            <MetricLabel>Vendas</MetricLabel>
                        </MetricBox>
                        <MetricBox $bgColor="#fef3c7" $color="#b45309">
                            <MetricValue>23</MetricValue>
                            <MetricLabel>Engenharia</MetricLabel>
                        </MetricBox>
                        <MetricBox $bgColor="#fee2e2" $color="#b91c1c">
                            <MetricValue>0</MetricValue>
                            <MetricLabel>Instalação</MetricLabel>
                        </MetricBox>
                        <MetricBox $bgColor="#f3f4f6" $color="#374151">
                            <MetricValue>0</MetricValue>
                            <MetricLabel>Seguro</MetricLabel>
                        </MetricBox>
                        <MetricBox $bgColor="#ffedd5" $color="#c2410c">
                            <MetricValue>0</MetricValue>
                            <MetricLabel>Limpeza</MetricLabel>
                        </MetricBox>
                    </MetricsContainer>

                    <SecondaryMetricsRow>
                        <PillMetric><span>Vendas</span><span>30</span></PillMetric>
                        <PillMetric><span>Total R$</span><span>R$ 724.792,03</span></PillMetric>
                        <PillMetric><span>Total kWp</span><span>255.53</span></PillMetric>
                        <PillMetric><span>Ticket Médio R$</span><span>R$ 24.159,73</span></PillMetric>
                        <PillMetric><span>Taxa de Conversão</span><span>19.23 %</span></PillMetric>
                    </SecondaryMetricsRow>

                    <ChartGrid>
                        <ChartCard>
                            <ChartTitle>Valor / Mês (2026)</ChartTitle>
                            <div style={{ width: '100%', height: 340 }}>
                                <ResponsiveContainer>
                                    <AreaChart data={areaData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="name" />
                                        <YAxis tickFormatter={(val: number) => `R$ ${(val / 1000).toFixed(0)}k`} />
                                        <RechartsTooltip />
                                        <Legend />
                                        <Area type="monotone" dataKey="Meta" stroke="#facc15" fill="#fefce8" strokeWidth={3} />
                                        <Area type="step" dataKey="Realizado" stroke="#3b82f6" fill="#ebf8ff" strokeWidth={3} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </ChartCard>

                        <ChartCard style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <ChartTitle style={{ alignSelf: 'flex-start' }}>Valor</ChartTitle>
                            <div style={{ width: '100%', height: 260 }}>
                                <ResponsiveContainer>
                                    <PieChart>
                                        <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} fill="#8884d8" dataKey="value">
                                            {pieData.map((_entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <RechartsTooltip />
                                        <Legend verticalAlign="bottom" height={36} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </ChartCard>
                    </ChartGrid>
                </>
            )}

            {activeTab === 'leads' && (
                <>
                    <SecondaryMetricsRow>
                        <PillMetric style={{ background: '#71717a', color: 'white', borderColor: 'transparent' }}>
                            <span style={{ color: '#e4e4e7' }}>Propostas feitas</span><span>34</span>
                        </PillMetric>
                        <PillMetric style={{ background: '#71717a', color: 'white', borderColor: 'transparent' }}>
                            <span style={{ color: '#e4e4e7' }}>Total em negociação</span><span>R$ 59.880,00</span>
                        </PillMetric>
                        <PillMetric style={{ background: '#71717a', color: 'white', borderColor: 'transparent' }}>
                            <span style={{ color: '#e4e4e7' }}>Potência Total</span><span>102.28 kWp</span>
                        </PillMetric>
                        <PillMetric style={{ background: '#71717a', color: 'white', borderColor: 'transparent' }}>
                            <span style={{ color: '#e4e4e7' }}>Vendas Realizadas</span><span>9</span>
                        </PillMetric>
                        <PillMetric style={{ background: '#71717a', color: 'white', borderColor: 'transparent' }}>
                            <span style={{ color: '#e4e4e7' }}>Conversão</span><span>26.47%</span>
                        </PillMetric>
                        <PillMetric style={{ background: '#71717a', color: 'white', borderColor: 'transparent' }}>
                            <span style={{ color: '#e4e4e7' }}>Perdidos / Taxa</span><span>17 (50.00%)</span>
                        </PillMetric>
                    </SecondaryMetricsRow>

                    <ChartGrid>
                        <ChartCard>
                            <ChartTitle style={{ textAlign: 'center' }}>Funil de Leads</ChartTitle>
                            <div style={{ width: '100%', height: 250 }}>
                                <ResponsiveContainer>
                                    <BarChart data={leadsFunilData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                        <XAxis type="number" hide />
                                        <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 12 }} />
                                        <RechartsTooltip />
                                        <Bar dataKey="value" fill="#facc15" barSize={40} radius={[0, 4, 4, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </ChartCard>

                        <ChartCard style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <ChartTitle style={{ textAlign: 'center' }}>Status Leads</ChartTitle>
                            <div style={{ width: '100%', height: 220 }}>
                                <ResponsiveContainer>
                                    <PieChart>
                                        <Pie data={leadsFunilData} cx="50%" cy="50%" outerRadius={90} fill="#8884d8" dataKey="value">
                                            <Cell fill="#10b981" />
                                            <Cell fill="#f97316" />
                                        </Pie>
                                        <RechartsTooltip />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </ChartCard>

                        <ChartCard>
                            <ChartTitle style={{ textAlign: 'center' }}>Leads Desqualificados</ChartTitle>
                            <div style={{ height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ color: '#9ca3af' }}>Nenhum dado</span>
                            </div>
                        </ChartCard>

                        <ChartCard>
                            <ChartTitle style={{ textAlign: 'center' }}>Projetos Perdidos</ChartTitle>
                            <div style={{ width: '100%', height: 250 }}>
                                <ResponsiveContainer>
                                    <BarChart data={leadsPerdidosData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                        <XAxis type="number" hide />
                                        <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 12 }} />
                                        <RechartsTooltip />
                                        <Bar dataKey="value" fill="#ef4444" barSize={25} radius={[0, 4, 4, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </ChartCard>

                    </ChartGrid>
                </>
            )}
        </Container>
    );
};
