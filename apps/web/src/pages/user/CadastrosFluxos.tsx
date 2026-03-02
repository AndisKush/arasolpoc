import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import {
    ReactFlow,
    Controls,
    Background,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
    Handle,
    Position
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Button } from '@andisds/ui';
import { Plus, ListTodo } from 'lucide-react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 100px); /* Fill remaining height */
  padding: 24px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  h2 { margin: 0; color: ${({ theme }) => theme.colors.text}; }
`;

const FlowContainer = styled.div`
  flex: 1;
  background: white;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05);
`;

// --- Custom Nodes ---
const StageNodeContainer = styled.div<{ $isStart?: boolean; $isEnd?: boolean; $color: string }>`
  background: white;
  border: 2px solid ${({ $color }) => $color};
  padding: 12px 24px;
  border-radius: ${({ $isStart, $isEnd }) => $isStart ? '24px 8px 8px 24px' : $isEnd ? '8px 24px 24px 8px' : '8px'};
  min-width: 160px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  position: relative;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 6px 12px rgba(0,0,0,0.1);
    transform: translateY(-2px);
  }
`;

const CustomStageNode = ({ data, isConnectable }: any) => {
    return (
        <StageNodeContainer $isStart={data.isStart} $isEnd={data.isEnd} $color={data.color}>
            {data.label}
            <div style={{ fontSize: 11, color: '#64748b', marginTop: 4, fontWeight: 400 }}>{data.flowName}</div>

            {!data.isStart && (
                <Handle
                    type="target"
                    position={Position.Left}
                    isConnectable={isConnectable}
                    style={{ width: 12, height: 12, background: data.color }}
                />
            )}
            {!data.isEnd && (
                <Handle
                    type="source"
                    position={Position.Right}
                    isConnectable={isConnectable}
                    style={{ width: 12, height: 12, background: data.color }}
                />
            )}

            {/* Allows connecting an End to a Start visually */}
            {data.isEnd && (
                <Handle
                    type="source"
                    position={Position.Right}
                    id="flow-link"
                    isConnectable={isConnectable}
                    style={{ width: 14, height: 14, background: '#1d4ed8', borderRadius: 4, right: -7 }}
                />
            )}
            {data.isStart && (
                <Handle
                    type="target"
                    position={Position.Left}
                    id="flow-link"
                    isConnectable={isConnectable}
                    style={{ width: 14, height: 14, background: '#1d4ed8', borderRadius: 4, left: -7 }}
                />
            )}
        </StageNodeContainer>
    );
};

const nodeTypes = {
    stage: CustomStageNode,
};

// INITIAL MOCK MAPPING
const initialNodes = [
    // LEADS FLOW (Yellow)
    { id: 'l1', type: 'stage', position: { x: 100, y: 150 }, data: { label: 'Cadastro', flowName: 'Fluxo: Leads', isStart: true, color: '#eab308' } },
    { id: 'l2', type: 'stage', position: { x: 350, y: 150 }, data: { label: 'Contato', flowName: 'Fluxo: Leads', color: '#eab308' } },
    { id: 'l3', type: 'stage', position: { x: 600, y: 150 }, data: { label: 'Qualificação', flowName: 'Fluxo: Leads', isEnd: true, color: '#eab308' } },

    // PROPOSTA FLOW (Blue)
    { id: 'p1', type: 'stage', position: { x: 100, y: 350 }, data: { label: 'Coleta de Dados', flowName: 'Fluxo: Proposta', isStart: true, color: '#3b82f6' } },
    { id: 'p2', type: 'stage', position: { x: 350, y: 350 }, data: { label: 'Em Negociação', flowName: 'Fluxo: Proposta', color: '#3b82f6' } },
    { id: 'p3', type: 'stage', position: { x: 600, y: 350 }, data: { label: 'Assinar Contrato', flowName: 'Fluxo: Proposta', isEnd: true, color: '#3b82f6' } },

    // ENGENHARIA FLOW (Green)
    { id: 'e1', type: 'stage', position: { x: 100, y: 550 }, data: { label: 'Compra Equipamentos', flowName: 'Fluxo: Engenharia', isStart: true, color: '#10b981' } },
    { id: 'e2', type: 'stage', position: { x: 350, y: 550 }, data: { label: 'Implantação', flowName: 'Fluxo: Engenharia', isEnd: true, color: '#10b981' } },
];

const initialEdges = [
    // Leads Internal
    { id: 'e-l1-l2', source: 'l1', target: 'l2', animated: true, style: { stroke: '#eab308', strokeWidth: 2 } },
    { id: 'e-l2-l3', source: 'l2', target: 'l3', animated: true, style: { stroke: '#eab308', strokeWidth: 2 } },
    // Proposta Internal
    { id: 'e-p1-p2', source: 'p1', target: 'p2', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } },
    { id: 'e-p2-p3', source: 'p2', target: 'p3', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } },
    // Engenharia Internal
    { id: 'e-e1-e2', source: 'e1', target: 'e2', animated: true, style: { stroke: '#10b981', strokeWidth: 2 } },
];

export const CadastrosFluxos: React.FC = () => {
    const [nodes, setNodes] = useState<any>(initialNodes);
    const [edges, setEdges] = useState<any>(initialEdges);

    const onNodesChange = useCallback(
        (changes: any) => setNodes((nds: any) => applyNodeChanges(changes, nds)),
        []
    );

    const onEdgesChange = useCallback(
        (changes: any) => setEdges((eds: any) => applyEdgeChanges(changes, eds)),
        []
    );

    const onConnect = useCallback(
        (params: any) => {
            // Create a thicker, dashed blue line for flow links
            const isFlowLink = params.sourceHandle === 'flow-link' || params.targetHandle === 'flow-link';

            const newEdge = {
                ...params,
                animated: true,
                style: isFlowLink
                    ? { stroke: '#1d4ed8', strokeWidth: 4, strokeDasharray: '5,5' }
                    : { stroke: '#9ca3af', strokeWidth: 2 }
            };
            setEdges((eds: any) => addEdge(newEdge, eds));
        },
        []
    );

    return (
        <Container>
            <Header>
                <div>
                    <h2>Orquestrador de Fluxos</h2>
                    <span style={{ color: '#64748b', fontSize: 14 }}>
                        Conecte o final de um fluxo ao início de outro arrastando os conectores quadrados azuis.
                    </span>
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                    <Button variant="outline"><ListTodo size={18} style={{ marginRight: 8 }} /> Gerenciar Etapas (Drag&Drop)</Button>
                    <Button variant="primary" style={{ backgroundColor: '#1d4ed8', color: 'white', borderColor: '#1d4ed8' }}>
                        <Plus size={18} style={{ marginRight: 8 }} /> Novo Fluxo
                    </Button>
                </div>
            </Header>

            <FlowContainer>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    fitView
                    attributionPosition="bottom-right"
                >
                    <Background color="#cbd5e1" gap={16} />
                    <Controls />
                </ReactFlow>
            </FlowContainer>
        </Container>
    );
};
