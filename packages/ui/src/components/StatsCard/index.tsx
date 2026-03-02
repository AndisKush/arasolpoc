import React from 'react';
import * as S from './styles';

export interface StatsCardProps {
    label: string;
    value: number | string;
    description?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ label, value, description }) => {
    return (
        <S.Card>
            <S.Label>{label}</S.Label>
            <S.Value>{value}</S.Value>
            {description && <S.Description>{description}</S.Description>}
        </S.Card>
    );
};
