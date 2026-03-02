import type { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';

const meta = {
    title: 'Design System/Introdução',
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
} satisfies Meta;

export default meta;

const Container = styled.div`
  padding: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.fontFamilies.sans};
`;

const Title = styled.h1`
  font-size: ${props => props.theme.fontSizes['4xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing[6]};
`;

const Section = styled.section`
  margin-bottom: ${props => props.theme.spacing[8]};
`;

const SectionTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing[4]};
  border-bottom: 2px solid ${props => props.theme.colors.border};
  padding-bottom: ${props => props.theme.spacing[2]};
`;

const SubTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.text};
  margin-top: ${props => props.theme.spacing[6]};
  margin-bottom: ${props => props.theme.spacing[3]};
`;

const Paragraph = styled.p`
  font-size: ${props => props.theme.fontSizes.base};
  line-height: ${props => props.theme.lineHeights.relaxed};
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing[4]};
`;

const List = styled.ul`
  list-style: none;
  padding-left: 0;
  margin-bottom: ${props => props.theme.spacing[4]};
`;

const ListItem = styled.li`
  font-size: ${props => props.theme.fontSizes.base};
  line-height: ${props => props.theme.lineHeights.relaxed};
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing[2]};
  padding-left: ${props => props.theme.spacing[6]};
  position: relative;

  &:before {
    content: '•';
    position: absolute;
    left: ${props => props.theme.spacing[3]};
    color: ${props => props.theme.colors.primary};
    font-weight: ${props => props.theme.fontWeights.bold};
  }
`;

const ColorBox = styled.div<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[4]};
  background: ${props => props.$color};
  color: white;
  border-radius: ${props => props.theme.radii.md};
  font-family: ${props => props.theme.fontFamilies.mono};
  font-size: ${props => props.theme.fontSizes.sm};
  margin-right: ${props => props.theme.spacing[2]};
  margin-bottom: ${props => props.theme.spacing[2]};
  box-shadow: ${props => props.theme.shadows.sm};
`;

const ColorGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing[2]};
  margin-bottom: ${props => props.theme.spacing[4]};
`;

const IntroductionPage = () => {
    return (
        <Container>
            <Title>🎨 Design System - Templorios</Title>

            <Paragraph>
                Bem-vindo ao Design System do <strong>Templorios</strong>, um template para criação de sistemas web.
            </Paragraph>

            <Section>
                <SectionTitle>🌟 Visão Geral</SectionTitle>
                <Paragraph>
                    Nosso design system é construído com uma paleta moderna e vibrante, focada em <strong>laranja</strong> como
                    cor primária da marca e <strong>cinza meio-tom</strong> como cor secundária, proporcionando um equilíbrio
                    perfeito entre energia e profissionalismo.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle>🎯 Princípios de Design</SectionTitle>

                <SubTitle>1. Consistência</SubTitle>
                <Paragraph>
                    Todos os componentes seguem os mesmos tokens de design, garantindo uma experiência visual coesa em toda a aplicação.
                </Paragraph>

                <SubTitle>2. Acessibilidade</SubTitle>
                <List>
                    <ListItem>Contraste adequado entre texto e fundo</ListItem>
                    <ListItem>Estados de foco visíveis</ListItem>
                    <ListItem>Suporte a leitores de tela</ListItem>
                    <ListItem>Navegação por teclado</ListItem>
                </List>

                <SubTitle>3. Responsividade</SubTitle>
                <Paragraph>
                    Componentes adaptáveis a diferentes tamanhos de tela e dispositivos.
                </Paragraph>

                <SubTitle>4. Performance</SubTitle>
                <Paragraph>
                    Otimizado para carregamento rápido e animações suaves.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle>🎨 Paleta de Cores</SectionTitle>

                <SubTitle>Cor Primária - Laranja</SubTitle>
                <Paragraph>
                    Nossa cor primária é um <strong>laranja vibrante</strong> que transmite:
                </Paragraph>
                <ColorGrid>
                    <ColorBox $color="#f97316">#f97316</ColorBox>
                </ColorGrid>
                <List>
                    <ListItem>✨ Energia e dinamismo</ListItem>
                    <ListItem>🚀 Inovação</ListItem>
                    <ListItem>💬 Comunicação ativa</ListItem>
                    <ListItem>🔥 Paixão pelo que fazemos</ListItem>
                </List>

                <SubTitle>Cor Secundária - Cinza Meio-Tom</SubTitle>
                <Paragraph>
                    O <strong>cinza meio-tom</strong> complementa a paleta trazendo:
                </Paragraph>
                <ColorGrid>
                    <ColorBox $color="#71717a">#71717a</ColorBox>
                </ColorGrid>
                <List>
                    <ListItem>⚖️ Equilíbrio visual</ListItem>
                    <ListItem>🎯 Profissionalismo</ListItem>
                    <ListItem>📊 Clareza na hierarquia</ListItem>
                    <ListItem>🌐 Neutralidade</ListItem>
                </List>

                <SubTitle>Cores de Suporte</SubTitle>
                <ColorGrid>
                    <ColorBox $color="#059669">Success</ColorBox>
                    <ColorBox $color="#dc2626">Error</ColorBox>
                    <ColorBox $color="#f59e0b">Warning</ColorBox>
                    <ColorBox $color="#2563eb">Info</ColorBox>
                </ColorGrid>
            </Section>

            <Section>
                <SectionTitle>🌓 Modo Claro e Escuro</SectionTitle>
                <Paragraph>
                    O design system oferece suporte completo a <strong>light mode</strong> e <strong>dark mode</strong>,
                    com cores semânticas que se adaptam automaticamente ao tema escolhido.
                </Paragraph>
            </Section>

            <Section>
                <SectionTitle>📦 Tokens Disponíveis</SectionTitle>

                <SubTitle>Cores (theme.colors)</SubTitle>
                <List>
                    <ListItem>Cores semânticas: primary, secondary, background, text, etc.</ListItem>
                    <ListItem>Estados: primaryHover, primaryActive, borderFocus</ListItem>
                    <ListItem>Paleta completa: theme.palette.orange, theme.palette.gray</ListItem>
                </List>

                <SubTitle>Espaçamento (theme.spacing)</SubTitle>
                <Paragraph>Sistema de espaçamento baseado em múltiplos de 4px:</Paragraph>
                <List>
                    <ListItem>Numérico: 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24</ListItem>
                    <ListItem>Semântico: xs, sm, md, lg, xl, 2xl, 3xl</ListItem>
                </List>

                <SubTitle>Tipografia</SubTitle>
                <List>
                    <ListItem><strong>Tamanhos</strong> (theme.fontSizes): xs, sm, base, md, lg, xl, 2xl, 3xl, 4xl, 5xl</ListItem>
                    <ListItem><strong>Pesos</strong> (theme.fontWeights): light, regular, medium, semibold, bold, extrabold</ListItem>
                    <ListItem><strong>Alturas de linha</strong> (theme.lineHeights): none, tight, snug, normal, relaxed, loose</ListItem>
                    <ListItem><strong>Famílias</strong> (theme.fontFamilies): sans, mono</ListItem>
                </List>

                <SubTitle>Outros Tokens</SubTitle>
                <List>
                    <ListItem><strong>Bordas</strong>: radii (raios) e borderWidths (larguras)</ListItem>
                    <ListItem><strong>Sombras</strong>: none, sm, base, md, lg, xl, 2xl, inner</ListItem>
                    <ListItem><strong>Transições</strong>: fast, base, slow, slower</ListItem>
                    <ListItem><strong>Z-Index</strong>: hide, base, dropdown, sticky, fixed, modal, popover, tooltip</ListItem>
                </List>
            </Section>

            <Section>
                <SectionTitle>🚀 Próximos Passos</SectionTitle>
                <List>
                    <ListItem>Explore as <strong>stories de Tokens</strong> para ver todos os valores disponíveis</ListItem>
                    <ListItem>Confira os <strong>componentes</strong> já implementados</ListItem>
                    <ListItem>Use os tokens em seus novos componentes para manter a consistência</ListItem>
                </List>
            </Section>

            <Paragraph style={{ textAlign: 'center', marginTop: '3rem', fontSize: '1.125rem' }}>
                <strong>Desenvolvido com ❤️ para o LinkService</strong>
            </Paragraph>
        </Container>
    );
};

export const Introduction: StoryObj = {
    render: () => <IntroductionPage />,
};
