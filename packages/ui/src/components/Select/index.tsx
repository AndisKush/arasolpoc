'use client';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Label, ErrorText } from '../Typography';
import * as S from './styles';

// T estende Record<string, any> para garantir que é um objeto
interface SelectProps<T extends Record<string, any>> {
  label?: string;
  error?: string;
  options: T[];
  /** Nome da propriedade que serve como ID único */
  valueKey: keyof T;
  /** Nome da propriedade que será exibida */
  labelKey: keyof T;
  /** Objeto selecionado atualmente (inteiro) */
  value?: T | null;
  /** Callback retornando o objeto inteiro */
  onChange: (value: T) => void;
  placeholder?: string;
}

export const Select = <T extends Record<string, any>>({
  label,
  error,
  options,
  valueKey,
  labelKey,
  value,
  onChange,
  placeholder = 'Selecione...',
}: SelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Fecha ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtragem
  const filteredOptions = options.filter((opt) => 
    String(opt[labelKey]).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (option: T) => {
    onChange(option);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <S.Wrapper ref={wrapperRef}>
      {label && <Label>{label}</Label>}
      
      <S.SelectButton 
        type="button" 
        onClick={() => setIsOpen(!isOpen)}
        $hasError={!!error}
      >
        {/* Renderiza o labelKey do objeto selecionado ou o placeholder */}
        <span>{value ? String(value[labelKey]) : placeholder}</span>
        <ChevronDown size={16} />
      </S.SelectButton>

      {isOpen && (
        <S.DropdownList>
          <S.SearchInput
            autoFocus
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClick={(e) => e.stopPropagation()} // Evita fechar ao clicar no input
          />
          
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <S.Option 
                key={String(option[valueKey])} // Usa o valueKey dinâmico como key
                onClick={() => handleSelect(option)}
              >
                {String(option[labelKey])}
              </S.Option>
            ))
          ) : (
            <div style={{ padding: '10px', color: '#999', textAlign: 'center' }}>
              Nenhum resultado
            </div>
          )}
        </S.DropdownList>
      )}
      
      {error && <ErrorText>{error}</ErrorText>}
    </S.Wrapper>
  );
};