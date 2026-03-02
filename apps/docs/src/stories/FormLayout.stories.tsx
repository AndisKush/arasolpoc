import type { Meta, StoryObj } from '@storybook/react';
import { FormContainer, FormField, FormActions, Button, Input, Label } from '@andisds/ui';

const meta: Meta<typeof FormContainer> = {
    title: 'Components/FormLayout',
    component: FormContainer,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormContainer>;

export const Default: Story = {
    render: () => (
        <FormContainer>
            <FormField>
                <Label>Nome Completo</Label>
                <Input placeholder="Seu nome aqui..." />
            </FormField>
            <FormField>
                <Label>Email</Label>
                <Input type="email" placeholder="seuemail@exemplo.com" />
            </FormField>
            <FormActions>
                <Button variant="outline">Cancelar</Button>
                <Button>Salvar</Button>
            </FormActions>
        </FormContainer>
    ),
};
