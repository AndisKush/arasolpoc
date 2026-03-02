import type { ReactNode } from 'react';
import styled from 'styled-components';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Heading } from '../../components/Typography';
import { Plus } from 'lucide-react';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Controls = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  align-items: flex-end;
`;

const PaginationFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
  align-items: center;
`;

interface ListLayoutProps {
  title: string;
  onAddClick: () => void;
  onSearch: (term: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  children: ReactNode; // Aqui entra a Tabela
}

export const ListLayout = ({
  title,
  onAddClick,
  onSearch,
  currentPage,
  totalPages,
  onPageChange,
  children
}: ListLayoutProps) => {
  return (
    <div>
      <Header>
        <Heading>{title}</Heading>
        <Button variant="primary" onClick={onAddClick}>
          <Plus size={16} style={{ marginRight: 8 }} />
          Adicionar
        </Button>
      </Header>

      <Controls>
        <div style={{ width: '300px' }}>
          <Input
            placeholder="Buscar..."
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        {/* Aqui poderiam entrar filtros avançados no futuro */}
      </Controls>

      {children}

      <PaginationFooter>
        <Button
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Anterior
        </Button>
        <span>Página {currentPage} de {totalPages}</span>
        <Button
          variant="outline"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Próxima
        </Button>
      </PaginationFooter>
    </div>
  );
};