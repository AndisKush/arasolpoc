import type { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';
import { Stack } from '@andisds/ui';

const Box = styled.div`
  width: 50px;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
`;

const meta: Meta<typeof Stack> = {
    title: 'Components/Stack',
    component: Stack,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Stack>;

export const Vertical: Story = {
    args: {
        direction: 'column',
        gap: 'md',
    },
    render: (args) => (
        <Stack {...args}>
            <Box />
            <Box />
            <Box />
        </Stack>
    ),
};

export const Horizontal: Story = {
    args: {
        direction: 'row',
        gap: 'lg',
    },
    render: (args) => (
        <Stack {...args}>
            <Box />
            <Box />
            <Box />
        </Stack>
    ),
};

export const WithCustomGap: Story = {
    args: {
        direction: 'row',
        gap: '30px',
    },
    render: (args) => (
        <Stack {...args}>
            <Box />
            <Box />
            <Box />
        </Stack>
    ),
};
