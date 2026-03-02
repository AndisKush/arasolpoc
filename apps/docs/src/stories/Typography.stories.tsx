import type { Meta } from '@storybook/react';
import { Heading, Text, Label, ErrorText, Caption, Stack } from '@andisds/ui';

const meta: Meta = {
    title: 'Components/Typography',
    tags: ['autodocs'],
};

export default meta;

export const AllTypes = {
    render: () => (
        <Stack gap="lg">
            <div>
                <Label>Heading</Label>
                <Heading>The quick brown fox jumps over the lazy dog</Heading>
            </div>

            <div>
                <Label>Text (Normal)</Label>
                <Text>The quick brown fox jumps over the lazy dog</Text>
            </div>

            <div>
                <Label>Label</Label>
                <Label>Este é um Label</Label>
            </div>

            <div>
                <Label>Caption</Label>
                <Caption>Este é um texto de legenda (caption)</Caption>
            </div>

            <div>
                <Label>ErrorText</Label>
                <ErrorText>Este é um texto de erro</ErrorText>
            </div>
        </Stack>
    ),
};

export const CustomColorsAndSizes = {
    render: () => (
        <Stack gap="md">
            <Heading color="primary">Heading com cor primária</Heading>
            <Text size="lg" weight="bold">Texto grande e negrito</Text>
            <Text size="sm" color="textSecondary">Texto pequeno e secundário</Text>
        </Stack>
    )
}
