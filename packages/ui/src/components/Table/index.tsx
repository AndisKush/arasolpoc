import type { ReactNode } from 'react';
import styled from 'styled-components';
import { Button } from '../Button';
import { Edit, Trash2 } from 'lucide-react';

// Estilos básicos (pode melhorar depois)
const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.text};
  }
  
  th {
    background-color: ${({ theme }) => theme.colors.surfaceHover};
    font-weight: 600;
    font-size: 0.875rem;
  }
`;

const ActionCell = styled.div`
  display: flex;
  gap: 8px;
`;

// === DEFINIÇÃO DA TABELA GENÉRICA ===

// T = O tipo do dado (Ex: Usuario, Produto)
export interface Column<T> {
  header: string;
  accessorKey?: keyof T; // A chave do objeto (ex: 'nome')
  // Custom render opcional (ex: formatar data ou moeda)
  cell?: (item: T) => ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  isLoading?: boolean;
}

export const Table = <T extends { id: string | number }>({
  data,
  columns,
  onEdit,
  onDelete,
  isLoading
}: TableProps<T>) => {
  if (isLoading) return <div>Carregando dados...</div>;
  if (!data.length) return <div>Nenhum registro encontrado.</div>;

  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col.header}</th>
            ))}
            {(onEdit || onDelete) && <th style={{ width: '100px' }}>Ações</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {columns.map((col, index) => (
                <td key={index}>
                  {col.cell
                    ? col.cell(item)
                    : col.accessorKey ? String(item[col.accessorKey]) : '-'}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td>
                  <ActionCell>
                    {onEdit && (
                      <Button variant="outline" onClick={() => onEdit(item)} style={{ padding: 4 }}>
                        <Edit size={16} />
                      </Button>
                    )}
                    {onDelete && (
                      <Button variant="secondary" onClick={() => onDelete(item)} style={{ padding: 4 }}>
                        <Trash2 size={16} />
                      </Button>
                    )}
                  </ActionCell>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};