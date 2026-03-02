import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Input, Table } from '@andisds/ui';
import { Plus, X, ChevronDown, ChevronRight, ShieldCheck } from 'lucide-react';

const Container = styled.div`
  padding: 24px;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(8px);
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  width: 800px;
  max-height: 85vh;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
`;

const ModalHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 { margin: 0; font-size: 20px; display: flex; alignItems: center; gap: 8px;}
`;

const TabsHeader = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Tab = styled.div<{ $active: boolean }>`
  padding: 16px 24px;
  font-weight: 600;
  cursor: pointer;
  color: ${({ $active, theme }) => $active ? theme.colors.primary : theme.colors.textSecondary};
  border-bottom: 3px solid ${({ $active, theme }) => $active ? theme.colors.primary : 'transparent'};
  
  &:hover {
    background: ${({ theme }) => theme.colors.backgroundAlt};
  }
`;

const ModalBody = styled.div`
  padding: 24px;
  overflow-y: auto;
  flex: 1;
  background: ${({ theme }) => theme.colors.backgroundAlt};
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const FieldLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const CheckboxGroup = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.02);
`;

const CheckboxRow = styled.div<{ $depth: number }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  margin-left: ${({ $depth }) => $depth * 28}px;
  cursor: pointer;

  &:hover {
    background: rgba(0,0,0,0.02);
    border-radius: 8px;
  }
`;

const ModalFooter = styled.div`
  padding: 20px 24px;
  background: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

// --- Mock Data ---
const mockUsers = [
    { id: '1', name: 'João Silva', email: 'joao@arasol.com', role: 'Vendedor' },
    { id: '2', name: 'Maria Souza', email: 'maria@arasol.com', role: 'Engenheira' },
];

const AccessTreeItem = ({ node, depth = 0 }: { node: any, depth?: number }) => {
    const [expanded, setExpanded] = useState(true);
    const [checked, setChecked] = useState(false);

    const toggleExpand = (e: React.MouseEvent) => {
        e.stopPropagation();
        setExpanded(!expanded);
    };

    const toggleCheck = () => {
        setChecked(!checked);
        // Em uma app real, selecionar o pai selecionaria os filhos iterativamente.
    };

    return (
        <div>
            <CheckboxRow $depth={depth} onClick={toggleCheck}>
                {node.children ? (
                    <div onClick={toggleExpand} style={{ display: 'flex', alignItems: 'center' }}>
                        {expanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                    </div>
                ) : (
                    <div style={{ width: 18 }} /> // Espaçador
                )}
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => { }}
                    style={{ width: 18, height: 18, accentColor: '#1d4ed8' }}
                />
                <span style={{ fontWeight: node.children ? 600 : 400 }}>{node.label}</span>
            </CheckboxRow>

            {expanded && node.children && (
                <div>
                    {node.children.map((child: any) => (
                        <AccessTreeItem key={child.label} node={child} depth={depth + 1} />
                    ))}
                </div>
            )}
        </div>
    );
};

const accessData = {
    label: 'Módulos',
    children: [
        {
            label: 'CRM',
            children: [
                {
                    label: 'Home',
                    children: [
                        { label: 'Dashboard Propostas' },
                        { label: 'Dashboard Leads' },
                    ]
                },
                {
                    label: 'Cadastros',
                    children: [
                        { label: 'Produtos' },
                        { label: 'Fluxos' },
                        { label: 'Usuários' }
                    ]
                },
                { label: 'Propostas' }
            ]
        },
        {
            label: 'Vendas',
            children: [
                { label: 'Acesso Geral' }
            ]
        },
        {
            label: 'Fluxos Iniciáveis',
            children: [
                { label: 'Fluxo Leads' },
                { label: 'Fluxo Propostas' },
                { label: 'Fluxo Engenharia' },
            ]
        }
    ]
};

export const CadastrosUsuarios: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'dados' | 'acesso'>('dados');
    const [isSupervisor, setIsSupervisor] = useState(false);

    return (
        <Container>
            <TopBar>
                <h2 style={{ margin: 0, color: '#0f172a' }}>Gerenciar Usuários</h2>
                <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                    <Plus size={18} style={{ marginRight: 8 }} /> Adicionar Usuário
                </Button>
            </TopBar>

            <Table
                data={mockUsers}
                columns={[
                    { accessorKey: 'name', header: 'Nome' },
                    { accessorKey: 'email', header: 'E-mail' },
                    { accessorKey: 'role', header: 'Cargo / Papel' },
                ]}
            />

            {isModalOpen && (
                <ModalOverlay>
                    <ModalContent>
                        <ModalHeader>
                            <h2><ShieldCheck size={24} color="#1d4ed8" /> Novo Usuário</h2>
                            <X style={{ cursor: 'pointer' }} onClick={() => setIsModalOpen(false)} />
                        </ModalHeader>

                        <TabsHeader>
                            <Tab $active={activeTab === 'dados'} onClick={() => setActiveTab('dados')}>Dados Básicos</Tab>
                            <Tab $active={activeTab === 'acesso'} onClick={() => setActiveTab('acesso')}>Controle de Acesso</Tab>
                        </TabsHeader>

                        <ModalBody>
                            {activeTab === 'dados' && (
                                <FormGrid>
                                    <div><FieldLabel>Nome Completo</FieldLabel><Input placeholder="Ex: João da Silva" /></div>
                                    <div><FieldLabel>E-mail</FieldLabel><Input type="email" placeholder="joao@arasol.com" /></div>
                                    <div><FieldLabel>Senha</FieldLabel><Input type="password" /></div>
                                    <div><FieldLabel>Cargo</FieldLabel><Input placeholder="Ex: Consultor de Vendas" /></div>
                                </FormGrid>
                            )}

                            {activeTab === 'acesso' && (
                                <div>
                                    <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12, background: '#e0f2fe', padding: 16, borderRadius: 12, border: '1px solid #bae6fd' }}>
                                        <input
                                            type="checkbox"
                                            checked={isSupervisor}
                                            onChange={() => setIsSupervisor(!isSupervisor)}
                                            style={{ width: 20, height: 20, accentColor: '#1d4ed8' }}
                                            id="supervisor"
                                        />
                                        <label htmlFor="supervisor" style={{ fontWeight: 600, color: '#0369a1', cursor: 'pointer' }}>
                                            Privilégios de Supervisor (Acesso Total)
                                        </label>
                                    </div>

                                    {!isSupervisor && (
                                        <CheckboxGroup>
                                            <h3 style={{ marginTop: 0, marginBottom: 16, fontSize: 16, color: '#334155' }}>Permissões Granulares</h3>
                                            <AccessTreeItem node={accessData} />
                                        </CheckboxGroup>
                                    )}
                                </div>
                            )}
                        </ModalBody>

                        <ModalFooter>
                            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                            <Button variant="primary">Criar Usuário</Button>
                        </ModalFooter>
                    </ModalContent>
                </ModalOverlay>
            )}
        </Container>
    );
};
