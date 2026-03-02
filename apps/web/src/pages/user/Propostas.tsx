import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Input, Table } from '@andisds/ui';
import { Plus, X, ArrowLeft, ArrowRight, Save, ThumbsUp, ThumbsDown, FileText, CheckCircle, ListTodo, Paperclip, Activity } from 'lucide-react';

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
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  width: 500px;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  h2 { margin: 0; display: flex; justify-content: space-between; align-items: center; }
`;

// --- Runner Screen Styles ---
const RunnerScreen = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 80px); /* minus main header approx */
  background: ${({ theme }) => theme.colors.background};
`;

const BreadcrumbParams = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 24px;
  background: white;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 10%;
    right: 10%;
    height: 2px;
    background: ${({ theme }) => theme.colors.border};
    z-index: 0;
  }
`;

const StageIndicator = styled.div<{ $active: boolean; $past: boolean }>`
  position: relative;
  z-index: 1;
  background: ${({ $active, $past, theme }) => $active ? theme.colors.primary : $past ? '#10b981' : 'white'};
  border: 4px solid ${({ $active, $past, theme }) => $active || $past ? 'white' : theme.colors.border};
  width: 20px;
  height: 20px;
  border-radius: 50%;
  box-shadow: 0 0 0 2px ${({ $active, $past, theme }) => $active ? theme.colors.primary : $past ? '#10b981' : 'transparent'};
`;

const StageLabel = styled.div<{ $active: boolean }>`
  position: absolute;
  top: 32px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  font-size: 14px;
  font-weight: ${({ $active }) => $active ? '600' : '400'};
  color: ${({ $active, theme }) => $active ? theme.colors.primary : theme.colors.textSecondary};
`;

const RunnerBody = styled.div`
  flex: 1;
  padding: 32px;
  overflow-y: auto;
  display: flex;
  justify-content: center;
`;

const PadraoLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  width: 100%;
  max-width: 1400px;
  gap: 24px;
  height: 100%;
`;

const Panel = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 4px 6px rgba(0,0,0,0.02);
  display: flex;
  flex-direction: column;

  h3 { margin-top: 0; display: flex; alignItems: center; gap: 8px; color: ${({ theme }) => theme.colors.text}; }
`;

const CustomFormContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 32px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05);
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  align-self: flex-start;

  h2 { margin-top: 0; margin-bottom: 24px; text-align: center; }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
`;

const FieldLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const BottomBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 32px;
  background: white;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

// --- Mock Data ---
const mockList = [
    { id: '1', client: 'Empresa Alpha', flow: 'Fluxo: Leads', stage: 'Qualificação' },
    { id: '2', client: 'João Condomínio', flow: 'Fluxo: Proposta', stage: 'Em Negociação' },
];

const flows = {
    LEADS: { name: 'Fluxo: Leads', stages: ['Cadastro', 'Contato', 'Qualificação'] },
    PROPOSTA: { name: 'Fluxo: Proposta', stages: ['Coleta de Dados', 'Em Negociação', 'Assinar Contrato'] },
    ENGENHARIA: { name: 'Fluxo: Engenharia', stages: ['Compra Equipamentos', 'Implantação'] }
};

export const Propostas: React.FC = () => {
    const [viewState, setViewState] = useState<'LIST' | 'RUN_FLOW'>('LIST');
    const [isSelectFlowModalOpen, setIsSelectFlowModalOpen] = useState(false);

    const [activeFlowKey, setActiveFlowKey] = useState<keyof typeof flows>('LEADS');
    const [stageIndex, setStageIndex] = useState(0);

    // Form State
    const [clientData, setClientData] = useState({
        nome: '',
        telefone: '',
        cpf: '',
        endereco: '',
        motivoDesqualificacao: ''
    });
    const [qualificacaoState, setQualificacaoState] = useState<'NONE' | 'QUALIFICADO' | 'DESQUALIFICADO'>('NONE');

    const handleStartFlow = (fk: keyof typeof flows) => {
        setActiveFlowKey(fk);
        setStageIndex(0);
        setIsSelectFlowModalOpen(false);
        setViewState('RUN_FLOW');
    };

    const handleNext = () => {
        const flow = flows[activeFlowKey];

        // Custom Logic Handlers
        if (activeFlowKey === 'LEADS' && flow.stages[stageIndex] === 'Qualificação') {
            if (qualificacaoState === 'QUALIFICADO') {
                // Transfer to Proposta
                alert('Lead Qualificado! Iniciando Fluxo de Proposta...');
                setActiveFlowKey('PROPOSTA');
                setStageIndex(0);
                setQualificacaoState('NONE');
                return;
            }
        }

        if (stageIndex < flow.stages.length - 1) {
            setStageIndex(stageIndex + 1);
        } else {
            alert('Fluxo Finalizado com Sucesso!');
            setViewState('LIST');
        }
    };

    const handlePrev = () => {
        if (stageIndex > 0) {
            setStageIndex(stageIndex - 1);
        }
    };

    const renderContent = () => {
        const flow = flows[activeFlowKey];
        const stageName = flow.stages[stageIndex];

        // Personalizado: LEADS / CADASTRO
        if (activeFlowKey === 'LEADS' && stageName === 'Cadastro') {
            return (
                <CustomFormContainer>
                    <h2>Cadastro Inicial de Lead</h2>
                    <FormGrid>
                        <div>
                            <FieldLabel>Nome do Cliente</FieldLabel>
                            <Input
                                value={clientData.nome}
                                onChange={(e) => setClientData({ ...clientData, nome: e.target.value })}
                                placeholder="Ex: Maria Soares"
                            />
                        </div>
                        <div>
                            <FieldLabel>Telefone / WhatsApp</FieldLabel>
                            <Input
                                value={clientData.telefone}
                                onChange={(e) => setClientData({ ...clientData, telefone: e.target.value })}
                                placeholder="(11) 99999-9999"
                            />
                        </div>
                    </FormGrid>
                </CustomFormContainer>
            );
        }

        // Personalizado: LEADS / QUALIFICAÇÃO
        if (activeFlowKey === 'LEADS' && stageName === 'Qualificação') {
            return (
                <CustomFormContainer style={{ textAlign: 'center' }}>
                    <h2>Qualificação do Lead</h2>
                    <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 24 }}>
                        <Button
                            variant={qualificacaoState === 'QUALIFICADO' ? 'primary' : 'outline'}
                            style={{ backgroundColor: qualificacaoState === 'QUALIFICADO' ? '#10b981' : undefined, borderColor: qualificacaoState === 'QUALIFICADO' ? '#10b981' : undefined, color: qualificacaoState === 'QUALIFICADO' ? 'white' : undefined }}
                            onClick={() => setQualificacaoState('QUALIFICADO')}
                        >
                            <ThumbsUp style={{ marginRight: 8 }} /> Qualificado
                        </Button>
                        <Button
                            variant={qualificacaoState === 'DESQUALIFICADO' ? 'primary' : 'outline'}
                            style={{ backgroundColor: qualificacaoState === 'DESQUALIFICADO' ? '#ef4444' : undefined, borderColor: qualificacaoState === 'DESQUALIFICADO' ? '#ef4444' : undefined, color: qualificacaoState === 'DESQUALIFICADO' ? 'white' : undefined }}
                            onClick={() => setQualificacaoState('DESQUALIFICADO')}
                        >
                            <ThumbsDown style={{ marginRight: 8 }} /> Desqualificado
                        </Button>
                    </div>

                    {qualificacaoState === 'DESQUALIFICADO' && (
                        <FormGrid style={{ textAlign: 'left' }}>
                            <div>
                                <FieldLabel>Motivo da Desqualificação</FieldLabel>
                                <Input
                                    value={clientData.motivoDesqualificacao}
                                    onChange={(e) => setClientData({ ...clientData, motivoDesqualificacao: e.target.value })}
                                    placeholder="Ex: Achou o valor muito alto..."
                                />
                            </div>
                        </FormGrid>
                    )}
                </CustomFormContainer>
            );
        }

        // Personalizado: PROPOSTAS / COLETA DE DADOS
        if (activeFlowKey === 'PROPOSTA' && stageName === 'Coleta de Dados') {
            return (
                <CustomFormContainer>
                    <h2>Coleta de Dados Pessoais</h2>
                    <FormGrid>
                        <div>
                            <FieldLabel>Nome do Cliente (Herdado)</FieldLabel>
                            <Input value={clientData.nome || 'Maria Soares'} disabled />
                        </div>
                        <div>
                            <FieldLabel>Telefone (Herdado)</FieldLabel>
                            <Input value={clientData.telefone || '(11) 99999-9999'} disabled />
                        </div>
                        <div>
                            <FieldLabel>CPF / CNPJ</FieldLabel>
                            <Input
                                value={clientData.cpf}
                                onChange={(e) => setClientData({ ...clientData, cpf: e.target.value })}
                                placeholder="000.000.000-00"
                            />
                        </div>
                        <div>
                            <FieldLabel>Endereço Completo</FieldLabel>
                            <Input
                                value={clientData.endereco}
                                onChange={(e) => setClientData({ ...clientData, endereco: e.target.value })}
                                placeholder="Rua, Número, Bairro, Cidade, Estado"
                            />
                        </div>
                    </FormGrid>
                </CustomFormContainer>
            );
        }

        // PADRÃO
        return (
            <PadraoLayout>
                <Panel>
                    <h3><ListTodo size={20} color="#1d4ed8" /> Backlog</h3>
                    <p style={{ color: '#64748b', fontSize: 14 }}>Tarefas pendentes para esta etapa...</p>
                </Panel>
                <Panel>
                    <h3><Activity size={20} color="#1d4ed8" /> Registro de Atividades</h3>
                    <p style={{ color: '#64748b', fontSize: 14 }}>Nenhuma atividade registrada ainda. Use este espaço para anotar contatos, observações e logs.</p>
                    <div style={{ marginTop: 'auto', display: 'flex', gap: 8 }}>
                        <Input placeholder="Adicionar anotação..." style={{ flex: 1 }} />
                        <Button variant="primary">Enviar</Button>
                    </div>
                </Panel>
                <Panel>
                    <h3><Paperclip size={20} color="#1d4ed8" /> Anexos</h3>
                    <p style={{ color: '#64748b', fontSize: 14 }}>Anexe fotos do relógio de luz, conta de energia, etc.</p>
                    <Button variant="outline" style={{ marginTop: 16 }}>
                        <Plus size={16} style={{ marginRight: 8 }} /> Novo Anexo
                    </Button>
                </Panel>
            </PadraoLayout>
        );
    };

    if (viewState === 'RUN_FLOW') {
        const flow = flows[activeFlowKey];
        return (
            <RunnerScreen>
                <BreadcrumbParams>
                    {flow.stages.map((stg, idx) => (
                        <div key={stg} style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                            <StageIndicator $active={idx === stageIndex} $past={idx < stageIndex} />
                            <StageLabel $active={idx === stageIndex}>{stg}</StageLabel>
                        </div>
                    ))}
                </BreadcrumbParams>

                <RunnerBody>
                    {renderContent()}
                </RunnerBody>

                <BottomBar>
                    <Button variant="outline" onClick={() => setViewState('LIST')}>Cancelar</Button>

                    <div style={{ display: 'flex', gap: 12 }}>
                        {stageIndex > 0 && (
                            <Button variant="outline" onClick={handlePrev}>
                                <ArrowLeft size={16} style={{ marginRight: 6 }} /> Anterior
                            </Button>
                        )}

                        {/* Dynamic NEXT logic based on qualificacao status */}
                        {activeFlowKey === 'LEADS' && flow.stages[stageIndex] === 'Qualificação' && qualificacaoState === 'DESQUALIFICADO' ? (
                            <Button variant="primary" style={{ backgroundColor: '#ef4444', borderColor: '#ef4444' }} onClick={() => { alert('Desqualificado e Arquivado'); setViewState('LIST'); }}>
                                <Save size={16} style={{ marginRight: 6 }} /> Salvar e Encerrar
                            </Button>
                        ) : (
                            <Button variant="primary" onClick={handleNext}>
                                {stageIndex === flow.stages.length - 1 && activeFlowKey !== 'LEADS' ? (
                                    <><CheckCircle size={16} style={{ marginRight: 6 }} /> Concluir Fluxo</>
                                ) : activeFlowKey === 'LEADS' && flow.stages[stageIndex] === 'Qualificação' && qualificacaoState === 'QUALIFICADO' ? (
                                    <><ArrowRight size={16} style={{ marginRight: 6 }} /> Iniciar Proposta</>
                                ) : (
                                    <>Próximo <ArrowRight size={16} style={{ marginLeft: 6 }} /></>
                                )}
                            </Button>
                        )}
                    </div>
                </BottomBar>
            </RunnerScreen>
        );
    }

    // LIST STATE
    return (
        <Container>
            <TopBar>
                <h2 style={{ margin: 0, color: '#0f172a' }}>Gestão de Oportunidades</h2>
                <Button variant="primary" onClick={() => setIsSelectFlowModalOpen(true)}>
                    <Plus size={18} style={{ marginRight: 8 }} /> Adicionar Opportunity
                </Button>
            </TopBar>

            <Table
                data={mockList}
                columns={[
                    { accessorKey: 'client', header: 'Cliente / Projeto' },
                    { accessorKey: 'flow', header: 'Fluxo Atual' },
                    { accessorKey: 'stage', header: 'Etapa' },
                ]}
            />

            {isSelectFlowModalOpen && (
                <ModalOverlay>
                    <ModalContent>
                        <h2>Selecione o Fluxo Inicial <X style={{ cursor: 'pointer' }} onClick={() => setIsSelectFlowModalOpen(false)} /></h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <Button style={{ justifyContent: 'flex-start', padding: 16 }} variant="outline" onClick={() => handleStartFlow('LEADS')}>
                                <FileText style={{ marginRight: 12, color: '#eab308' }} /> <strong>Fluxo: Leads</strong>
                            </Button>
                            <Button style={{ justifyContent: 'flex-start', padding: 16 }} variant="outline" onClick={() => handleStartFlow('PROPOSTA')}>
                                <FileText style={{ marginRight: 12, color: '#3b82f6' }} /> <strong>Fluxo: Proposta</strong>
                            </Button>
                            <Button style={{ justifyContent: 'flex-start', padding: 16 }} variant="outline" onClick={() => handleStartFlow('ENGENHARIA')}>
                                <FileText style={{ marginRight: 12, color: '#10b981' }} /> <strong>Fluxo: Engenharia</strong>
                            </Button>
                        </div>
                    </ModalContent>
                </ModalOverlay>
            )}
        </Container>
    );
};
