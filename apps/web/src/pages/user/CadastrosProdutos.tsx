import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Input, Table } from '@andisds/ui';
import { Plus, X, Upload } from 'lucide-react';

const Container = styled.div`
  padding: 24px;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const FilterGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  width: 900px;
  max-height: 90vh;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 { margin: 0; font-size: 20px; }
`;

const ModalBody = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const SidebarNav = styled.div`
  width: 240px;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  padding: 16px 0;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
`;

const NavItem = styled.div<{ $active: boolean }>`
  padding: 12px 24px;
  cursor: pointer;
  background-color: ${({ $active, theme }) => $active ? theme.colors.primaryLight : 'transparent'};
  color: ${({ $active, theme }) => $active ? theme.colors.primary : theme.colors.text};
  border-right: 3px solid ${({ $active, theme }) => $active ? theme.colors.primary : 'transparent'};
  font-weight: ${({ $active }) => $active ? '600' : '400'};

  &:hover {
    background-color: ${({ $active, theme }) => $active ? theme.colors.primaryLight : theme.colors.surfaceHover};
  }
`;

const FormArea = styled.div`
  flex: 1;
  padding: 32px;
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.primary}10; /* Soft blue tint matching the Arasol style */
  background: linear-gradient(180deg, #e6eef8ff 0%, #b7d1fcff 100%);
`;

const FormGroup = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

  h3 { margin-top: 0; margin-bottom: 20px; font-size: 16px; color: ${({ theme }) => theme.colors.text}; }
`;

const FormGrid = styled.div<{ $columns?: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $columns }) => $columns || 2}, 1fr);
  gap: 16px;
  margin-bottom: 16px;
`;

const FieldLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 6px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ModalFooter = styled.div`
  padding: 16px 24px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
`;

// --- Mock Data ---
const mockProducts = [
    { id: '1', type: 'Módulo FV', model: 'Osda 585W', manufacturer: 'Osda', power: '585W' },
    { id: '2', type: 'Inversor', model: 'Growatt MIN 5000', manufacturer: 'Growatt', power: '5kW' },
    { id: '3', type: 'Bateria', model: 'Dyness 5.12kWh', manufacturer: 'Dyness', power: '5.12kWh' },
];

const productTypes = ['Módulo FV', 'Inversor', 'Bateria', 'Inversor Bombeamento', 'Outros'];

export const CadastrosProdutos: React.FC = () => {
    const [filter, setFilter] = useState('Todos');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeFormType, setActiveFormType] = useState('Módulo FV');

    const filteredProducts = filter === 'Todos' ? mockProducts : mockProducts.filter(p => p.type === filter);

    const renderFormContent = () => {
        switch (activeFormType) {
            case 'Módulo FV':
                return (
                    <>
                        <FormGroup>
                            <h3>Dados Gerais</h3>
                            <FormGrid>
                                <div><FieldLabel>Modelo</FieldLabel><Input placeholder="Ex: WPV-585" /></div>
                                <div><FieldLabel>Potência</FieldLabel><Input placeholder="585W" /></div>
                                <div><FieldLabel>Fabricante</FieldLabel><Input placeholder="WEG" /></div>
                                <div><FieldLabel>Peso</FieldLabel><Input placeholder="28kg" /></div>
                                <div><FieldLabel>Garantia Fábrica</FieldLabel><Input placeholder="12 anos" /></div>
                                <div><FieldLabel>Garantia Geração</FieldLabel><Input placeholder="25 anos" /></div>
                                <div><FieldLabel>Altura</FieldLabel><Input placeholder="2278 mm" /></div>
                                <div><FieldLabel>Largura</FieldLabel><Input placeholder="1134 mm" /></div>
                            </FormGrid>
                        </FormGroup>

                        <FormGroup>
                            <h3>Parâmetros Elétricos</h3>
                            <FormGrid>
                                <div><FieldLabel>Tensão Nominal</FieldLabel><Input placeholder="42.5V" /></div>
                                <div><FieldLabel>Tensão Circuito Aberto</FieldLabel><Input placeholder="50.1V" /></div>
                                <div><FieldLabel>Corrente Nominal</FieldLabel><Input placeholder="13.76A" /></div>
                                <div><FieldLabel>Corrente de Curto</FieldLabel><Input placeholder="14.3A" /></div>
                                <div><FieldLabel>Depreciação (1º ano)</FieldLabel><Input placeholder="2%" /></div>
                                <div><FieldLabel>Depreciação (Demais)</FieldLabel><Input placeholder="0.55%" /></div>
                            </FormGrid>
                        </FormGroup>

                        <FormGroup>
                            <h3>Anexos</h3>
                            <FormGrid $columns={1}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <Button variant="outline"><Upload size={16} style={{ marginRight: 8 }} /> Datasheet</Button>
                                    <Button variant="outline"><Upload size={16} style={{ marginRight: 8 }} /> Registro Inmetro</Button>
                                </div>
                            </FormGrid>
                        </FormGroup>
                    </>
                );
            case 'Inversor':
                return (
                    <>
                        <FormGroup>
                            <h3>Dados Gerais</h3>
                            <FormGrid>
                                <div><FieldLabel>Modelo</FieldLabel><Input /></div>
                                <div><FieldLabel>Potência</FieldLabel><Input /></div>
                                <div><FieldLabel>Fabricante</FieldLabel><Input /></div>
                                <div><FieldLabel>Peso</FieldLabel><Input /></div>
                                <div><FieldLabel>Garantia</FieldLabel><Input /></div>
                                <div><FieldLabel>Monitoramento</FieldLabel><Input /></div>
                            </FormGrid>
                        </FormGroup>
                        <FormGroup>
                            <h3>Parâmetros Elétricos</h3>
                            <FormGrid>
                                <div><FieldLabel>Tensão Nominal</FieldLabel><Input /></div>
                                <div><FieldLabel>Corrente Nominal</FieldLabel><Input /></div>
                                <div><FieldLabel>Faixa de Tensão MPPT</FieldLabel><Input /></div>
                                <div><FieldLabel>Eficiência</FieldLabel><Input /></div>
                                <div><FieldLabel>Número de MPPTs</FieldLabel><Input /></div>
                                <div><FieldLabel>Corrente por MPPT</FieldLabel><Input /></div>
                                <div><FieldLabel>Disjuntor Sugerido</FieldLabel><Input /></div>
                                <div><FieldLabel>Bitola do cabo CA</FieldLabel><Input /></div>
                            </FormGrid>
                        </FormGroup>
                    </>
                );
            case 'Bateria':
                return (
                    <>
                        <FormGroup>
                            <h3>Dados Gerais</h3>
                            <FormGrid>
                                <div><FieldLabel>Modelo</FieldLabel><Input /></div>
                                <div><FieldLabel>Potência</FieldLabel><Input /></div>
                                <div><FieldLabel>Fabricante</FieldLabel><Input /></div>
                                <div><FieldLabel>Autonomia</FieldLabel><Input /></div>
                                <div><FieldLabel>Garantia</FieldLabel><Input /></div>
                                <div><FieldLabel>Vida útil</FieldLabel><Input /></div>
                            </FormGrid>
                        </FormGroup>
                        <FormGroup>
                            <h3>Parâmetros Elétricos</h3>
                            <FormGrid>
                                <div><FieldLabel>Tensão Nominal</FieldLabel><Input /></div>
                                <div><FieldLabel>Disjuntor</FieldLabel><Input /></div>
                                <div><FieldLabel>Corrente Nominal</FieldLabel><Input /></div>
                                <div><FieldLabel>Bitola do Cabo</FieldLabel><Input /></div>
                            </FormGrid>
                        </FormGroup>
                    </>
                );
            case 'Inversor Bombeamento':
                return (
                    <>
                        <FormGroup>
                            <h3>Dados Gerais</h3>
                            <FormGrid>
                                <div><FieldLabel>Modelo</FieldLabel><Input /></div>
                                <div><FieldLabel>Potência</FieldLabel><Input /></div>
                                <div><FieldLabel>Fabricante</FieldLabel><Input /></div>
                                <div><FieldLabel>Garantia</FieldLabel><Input /></div>
                            </FormGrid>
                        </FormGroup>
                        <FormGroup>
                            <h3>Parâmetros Elétricos</h3>
                            <FormGrid>
                                <div><FieldLabel>Tensão Nominal</FieldLabel><Input /></div>
                                <div><FieldLabel>Disjuntor</FieldLabel><Input /></div>
                                <div><FieldLabel>Corrente Nominal</FieldLabel><Input /></div>
                                <div><FieldLabel>Bitola do Cabo</FieldLabel><Input /></div>
                            </FormGrid>
                        </FormGroup>
                    </>
                );
            case 'Outros':
                return (
                    <FormGroup>
                        <h3>Dados Gerais</h3>
                        <FormGrid>
                            <div><FieldLabel>Nome / Modelo</FieldLabel><Input /></div>
                            <div><FieldLabel>Fabricante</FieldLabel><Input /></div>
                        </FormGrid>
                    </FormGroup>
                );
            default:
                return null;
        }
    };

    return (
        <Container>
            <TopBar>
                <FilterGroup>
                    <Button
                        variant={filter === 'Todos' ? 'primary' : 'outline'}
                        onClick={() => setFilter('Todos')}
                    >
                        Todos
                    </Button>
                    {productTypes.map(t => (
                        <Button
                            key={t}
                            variant={filter === t ? 'primary' : 'outline'}
                            onClick={() => setFilter(t)}
                        >
                            {t}
                        </Button>
                    ))}
                </FilterGroup>

                <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                    <Plus size={18} style={{ marginRight: 8 }} /> Adicionar Produto
                </Button>
            </TopBar>

            <Table
                data={filteredProducts}
                columns={[
                    { accessorKey: 'type', header: 'Tipo' },
                    { accessorKey: 'model', header: 'Modelo' },
                    { accessorKey: 'manufacturer', header: 'Fabricante' },
                    { accessorKey: 'power', header: 'Potência' },
                ]}
            />

            {isModalOpen && (
                <ModalOverlay>
                    <ModalContent>
                        <ModalHeader>
                            <h2>Novo Produto</h2>
                            <X style={{ cursor: 'pointer' }} onClick={() => setIsModalOpen(false)} />
                        </ModalHeader>
                        <ModalBody>
                            <SidebarNav>
                                {productTypes.map(t => (
                                    <NavItem
                                        key={t}
                                        $active={activeFormType === t}
                                        onClick={() => setActiveFormType(t)}
                                    >
                                        {t}
                                    </NavItem>
                                ))}
                            </SidebarNav>
                            <FormArea>
                                {renderFormContent()}
                            </FormArea>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                            <Button variant="primary" style={{ backgroundColor: '#22c55e', color: 'white', borderColor: '#22c55e' }}>Salvar Produto</Button>
                        </ModalFooter>
                    </ModalContent>
                </ModalOverlay>
            )}

        </Container>
    );
};
