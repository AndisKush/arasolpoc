import React from 'react';
import type { ReactNode } from 'react';
import { Heading } from '../Typography';
import * as S from './styles';

export interface PageHeaderProps {
    title: string;
    action?: ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, action }) => {
    return (
        <S.Container>
            <Heading>{title}</Heading>
            {action && <div>{action}</div>}
        </S.Container>
    );
};
