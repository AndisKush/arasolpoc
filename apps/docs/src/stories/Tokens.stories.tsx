import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';
import {
    palette,
    lightColors,
    darkColors,
    spacing,
    fontSizes,
    fontWeights,
    lineHeights,
    radii,
    shadows,
    transitions,
} from '@andisds/ui/styles/tokens';

const meta = {
    title: 'Design System/Tokens',
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
} satisfies Meta;

export default meta;

// ============= COLORS =============

const ColorPaletteContainer = styled.div`
  padding: 2rem;
  background: ${props => props.theme.colors.background};
`;

const ColorSection = styled.div`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
`;

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const ColorCard = styled.div<{ $color: string }>`
  border-radius: ${props => props.theme.radii.md};
  overflow: hidden;
  border: 1px solid ${props => props.theme.colors.border};
  box-shadow: ${props => props.theme.shadows.sm};
`;

const ColorSwatch = styled.div<{ $color: string }>`
  height: 100px;
  background-color: ${props => props.$color};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const ColorInfo = styled.div`
  padding: 0.75rem;
  background: ${props => props.theme.colors.surface};
`;

const ColorName = styled.div`
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.25rem;
`;

const ColorValue = styled.div`
  font-size: ${props => props.theme.fontSizes.xs};
  font-family: ${props => props.theme.fontFamilies.mono};
  color: ${props => props.theme.colors.textSecondary};
`;

const ColorPalette = () => {
    return (
        <ColorPaletteContainer>
            <ColorSection>
                <SectionTitle>🎨 Paleta de Cores - Laranja</SectionTitle>
                <ColorGrid>
                    {Object.entries(palette.orange).map(([key, value]) => (
                        <ColorCard key={key} $color={value}>
                            <ColorSwatch $color={value} />
                            <ColorInfo>
                                <ColorName>orange.{key}</ColorName>
                                <ColorValue>{value}</ColorValue>
                            </ColorInfo>
                        </ColorCard>
                    ))}
                </ColorGrid>
            </ColorSection>

            <ColorSection>
                <SectionTitle>⚫ Paleta de Cores - Cinza Meio-Tom</SectionTitle>
                <ColorGrid>
                    {Object.entries(palette.gray).map(([key, value]) => (
                        <ColorCard key={key} $color={value}>
                            <ColorSwatch $color={value} />
                            <ColorInfo>
                                <ColorName>gray.{key}</ColorName>
                                <ColorValue>{value}</ColorValue>
                            </ColorInfo>
                        </ColorCard>
                    ))}
                </ColorGrid>
            </ColorSection>

            <ColorSection>
                <SectionTitle>✅ Cores de Suporte - Success</SectionTitle>
                <ColorGrid>
                    {Object.entries(palette.success).map(([key, value]) => (
                        <ColorCard key={key} $color={value}>
                            <ColorSwatch $color={value} />
                            <ColorInfo>
                                <ColorName>success.{key}</ColorName>
                                <ColorValue>{value}</ColorValue>
                            </ColorInfo>
                        </ColorCard>
                    ))}
                </ColorGrid>
            </ColorSection>

            <ColorSection>
                <SectionTitle>❌ Cores de Suporte - Error</SectionTitle>
                <ColorGrid>
                    {Object.entries(palette.error).map(([key, value]) => (
                        <ColorCard key={key} $color={value}>
                            <ColorSwatch $color={value} />
                            <ColorInfo>
                                <ColorName>error.{key}</ColorName>
                                <ColorValue>{value}</ColorValue>
                            </ColorInfo>
                        </ColorCard>
                    ))}
                </ColorGrid>
            </ColorSection>

            <ColorSection>
                <SectionTitle>⚠️ Cores de Suporte - Warning</SectionTitle>
                <ColorGrid>
                    {Object.entries(palette.warning).map(([key, value]) => (
                        <ColorCard key={key} $color={value}>
                            <ColorSwatch $color={value} />
                            <ColorInfo>
                                <ColorName>warning.{key}</ColorName>
                                <ColorValue>{value}</ColorValue>
                            </ColorInfo>
                        </ColorCard>
                    ))}
                </ColorGrid>
            </ColorSection>

            <ColorSection>
                <SectionTitle>ℹ️ Cores de Suporte - Info</SectionTitle>
                <ColorGrid>
                    {Object.entries(palette.info).map(([key, value]) => (
                        <ColorCard key={key} $color={value}>
                            <ColorSwatch $color={value} />
                            <ColorInfo>
                                <ColorName>info.{key}</ColorName>
                                <ColorValue>{value}</ColorValue>
                            </ColorInfo>
                        </ColorCard>
                    ))}
                </ColorGrid>
            </ColorSection>
        </ColorPaletteContainer>
    );
};

export const Colors: StoryObj = {
    render: () => <ColorPalette />,
};

// ============= SEMANTIC COLORS =============

const SemanticColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
`;

const SemanticColors = () => {
    return (
        <ColorPaletteContainer>
            <ColorSection>
                <SectionTitle>🌞 Cores Semânticas - Light Mode</SectionTitle>
                <SemanticColorGrid>
                    {Object.entries(lightColors).map(([key, value]) => (
                        <ColorCard key={key} $color={value}>
                            <ColorSwatch $color={value} />
                            <ColorInfo>
                                <ColorName>{key}</ColorName>
                                <ColorValue>{value}</ColorValue>
                            </ColorInfo>
                        </ColorCard>
                    ))}
                </SemanticColorGrid>
            </ColorSection>

            <ColorSection>
                <SectionTitle>🌙 Cores Semânticas - Dark Mode</SectionTitle>
                <SemanticColorGrid>
                    {Object.entries(darkColors).map(([key, value]) => (
                        <ColorCard key={key} $color={value}>
                            <ColorSwatch $color={value} />
                            <ColorInfo>
                                <ColorName>{key}</ColorName>
                                <ColorValue>{value}</ColorValue>
                            </ColorInfo>
                        </ColorCard>
                    ))}
                </SemanticColorGrid>
            </ColorSection>
        </ColorPaletteContainer>
    );
};

export const SemanticColorTokens: StoryObj = {
    render: () => <SemanticColors />,
};

// ============= SPACING =============

const SpacingContainer = styled.div`
  padding: 2rem;
  background: ${props => props.theme.colors.background};
`;

const SpacingItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem;
`;

const SpacingBox = styled.div<{ $size: string }>`
  width: ${props => props.$size};
  height: ${props => props.$size};
  background: ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.radii.sm};
  flex-shrink: 0;
`;

const SpacingLabel = styled.div`
  font-family: ${props => props.theme.fontFamilies.mono};
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.text};
`;

const SpacingTokens = () => {
    return (
        <SpacingContainer>
            <SectionTitle>📏 Espaçamento</SectionTitle>
            {Object.entries(spacing).map(([key, value]) => (
                <SpacingItem key={key}>
                    <SpacingBox $size={value} />
                    <SpacingLabel>
                        spacing.{key} = {value}
                    </SpacingLabel>
                </SpacingItem>
            ))}
        </SpacingContainer>
    );
};

export const Spacing: StoryObj = {
    render: () => <SpacingTokens />,
};

// ============= TYPOGRAPHY =============

const TypographyContainer = styled.div`
  padding: 2rem;
  background: ${props => props.theme.colors.background};
`;

const FontSizeItem = styled.div<{ $size: string }>`
  margin-bottom: 1.5rem;
  padding: 1rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.radii.md};
`;

const FontSizeExample = styled.div<{ $size: string }>`
  font-size: ${props => props.$size};
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;

const FontSizeLabel = styled.div`
  font-family: ${props => props.theme.fontFamilies.mono};
  font-size: ${props => props.theme.fontSizes.xs};
  color: ${props => props.theme.colors.textSecondary};
`;

const FontWeightItem = styled.div<{ $weight: number }>`
  margin-bottom: 1rem;
  font-weight: ${props => props.$weight};
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.text};
`;

const TypographyTokens = () => {
    return (
        <TypographyContainer>
            <ColorSection>
                <SectionTitle>🔤 Tamanhos de Fonte</SectionTitle>
                {Object.entries(fontSizes).map(([key, value]) => (
                    <FontSizeItem key={key} $size={value}>
                        <FontSizeExample $size={value}>
                            The quick brown fox jumps over the lazy dog
                        </FontSizeExample>
                        <FontSizeLabel>
                            fontSizes.{key} = {value}
                        </FontSizeLabel>
                    </FontSizeItem>
                ))}
            </ColorSection>

            <ColorSection>
                <SectionTitle>💪 Pesos de Fonte</SectionTitle>
                {Object.entries(fontWeights).map(([key, value]) => (
                    <FontWeightItem key={key} $weight={value}>
                        fontWeights.{key} = {value} - The quick brown fox
                    </FontWeightItem>
                ))}
            </ColorSection>

            <ColorSection>
                <SectionTitle>📐 Alturas de Linha</SectionTitle>
                {Object.entries(lineHeights).map(([key, value]) => (
                    <div key={key} style={{ marginBottom: '1.5rem' }}>
                        <FontSizeLabel style={{ marginBottom: '0.5rem' }}>
                            lineHeights.{key} = {value}
                        </FontSizeLabel>
                        <div style={{ lineHeight: value, fontSize: fontSizes.md }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </div>
                    </div>
                ))}
            </ColorSection>
        </TypographyContainer>
    );
};

export const Typography: StoryObj = {
    render: () => <TypographyTokens />,
};

// ============= BORDER RADIUS =============

const RadiusContainer = styled.div`
  padding: 2rem;
  background: ${props => props.theme.colors.background};
`;

const RadiusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1.5rem;
`;

const RadiusItem = styled.div`
  text-align: center;
`;

const RadiusBox = styled.div<{ $radius: string }>`
  width: 100px;
  height: 100px;
  background: ${props => props.theme.colors.primary};
  border-radius: ${props => props.$radius};
  margin: 0 auto 0.5rem;
`;

const RadiusLabel = styled.div`
  font-family: ${props => props.theme.fontFamilies.mono};
  font-size: ${props => props.theme.fontSizes.xs};
  color: ${props => props.theme.colors.text};
`;

const BorderRadiusTokens = () => {
    return (
        <RadiusContainer>
            <SectionTitle>🔲 Border Radius</SectionTitle>
            <RadiusGrid>
                {Object.entries(radii).map(([key, value]) => (
                    <RadiusItem key={key}>
                        <RadiusBox $radius={value} />
                        <RadiusLabel>
                            radii.{key}
                            <br />
                            {value}
                        </RadiusLabel>
                    </RadiusItem>
                ))}
            </RadiusGrid>
        </RadiusContainer>
    );
};

export const BorderRadius: StoryObj = {
    render: () => <BorderRadiusTokens />,
};

// ============= SHADOWS =============

const ShadowContainer = styled.div`
  padding: 2rem;
  background: ${props => props.theme.colors.backgroundAlt};
`;

const ShadowGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
`;

const ShadowItem = styled.div`
  text-align: center;
`;

const ShadowBox = styled.div<{ $shadow: string }>`
  width: 150px;
  height: 100px;
  background: ${props => props.theme.colors.surface};
  box-shadow: ${props => props.$shadow};
  border-radius: ${props => props.theme.radii.md};
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const ShadowLabel = styled.div`
  font-family: ${props => props.theme.fontFamilies.mono};
  font-size: ${props => props.theme.fontSizes.xs};
  color: ${props => props.theme.colors.text};
`;

const ShadowTokens = () => {
    return (
        <ShadowContainer>
            <SectionTitle>🌑 Sombras</SectionTitle>
            <ShadowGrid>
                {Object.entries(shadows).map(([key, value]) => (
                    <ShadowItem key={key}>
                        <ShadowBox $shadow={value}>
                            {key}
                        </ShadowBox>
                        <ShadowLabel>shadows.{key}</ShadowLabel>
                    </ShadowItem>
                ))}
            </ShadowGrid>
        </ShadowContainer>
    );
};

export const Shadows: StoryObj = {
    render: () => <ShadowTokens />,
};

// ============= TRANSITIONS =============

const TransitionContainer = styled.div`
  padding: 2rem;
  background: ${props => props.theme.colors.background};
`;

const TransitionItem = styled.div`
  margin-bottom: 2rem;
`;

const TransitionBox = styled.div<{ $transition: string; $isHovered: boolean }>`
  width: ${props => props.$isHovered ? '300px' : '100px'};
  height: 60px;
  background: ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.radii.md};
  transition: width ${props => props.$transition};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: ${props => props.theme.fontWeights.semibold};
  cursor: pointer;
  margin-bottom: 0.5rem;
`;

const TransitionLabel = styled.div`
  font-family: ${props => props.theme.fontFamilies.mono};
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.text};
`;

const TransitionTokens = () => {
    const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

    return (
        <TransitionContainer>
            <SectionTitle>⚡ Transições (Hover para ver)</SectionTitle>
            {Object.entries(transitions).map(([key, value], index) => (
                <TransitionItem key={key}>
                    <TransitionBox
                        $transition={value}
                        $isHovered={hoveredIndex === index}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        Hover me
                    </TransitionBox>
                    <TransitionLabel>
                        transitions.{key} = {value}
                    </TransitionLabel>
                </TransitionItem>
            ))}
        </TransitionContainer>
    );
};


export const Transitions: StoryObj = {
    render: () => <TransitionTokens />,
};
