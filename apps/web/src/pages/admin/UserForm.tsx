import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Heading, Button, Input, Select, ErrorText, FormContainer, FormField, FormActions } from '@andisds/ui';
import { userService } from '../../services/user.service';
import { UserRole, type UserFormData } from '../../types';

export const UserForm: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = !!id;

    const [formData, setFormData] = useState<UserFormData>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: UserRole.USER,
        status: 'active'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEditing) {
            loadUser(id);
        }
    }, [id]);

    const loadUser = async (userId: string) => {
        try {
            setLoading(true);
            const user = await userService.getById(userId);
            if (user) {
                setFormData({
                    name: user.name,
                    email: user.email,
                    password: '', // Não carregamos senha
                    confirmPassword: '',
                    role: user.role,
                    status: user.status || 'active'
                });
            }
        } catch (err) {
            setError('Erro ao carregar usuário');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!formData.name || !formData.email) {
            setError('Preencha os campos obrigatórios');
            return;
        }

        if (!isEditing && (!formData.password || formData.password !== formData.confirmPassword)) {
            setError('Senhas inválidas ou não conferem');
            return;
        }

        try {
            setLoading(true);
            if (isEditing) {
                await userService.update(id, formData);
            } else {
                await userService.create(formData);
            }
            navigate('/admin/users');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao salvar');
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditing && !formData.name) return <div>Carregando...</div>;

    return (
        <div>
            <Heading>{isEditing ? 'Editar Usuário' : 'Novo Usuário'}</Heading>

            <FormContainer onSubmit={handleSubmit}>
                <FormField>
                    <Input
                        label="Nome Completo"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ex: João da Silva"
                    />
                </FormField>

                <FormField>
                    <Input
                        label="Email"
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="email@exemplo.com"
                    />
                </FormField>

                <FormField>
                    <Select
                        label="Status"
                        options={[
                            { id: 'active', label: 'Ativo' },
                            { id: 'inactive', label: 'Inativo' }
                        ] as const}
                        valueKey="id"
                        labelKey="label"
                        value={{
                            id: formData.status,
                            label: formData.status === 'active' ? 'Ativo' : 'Inativo'
                        }}
                        onChange={(opt) => setFormData({ ...formData, status: opt.id })}
                    />
                </FormField>

                <FormField>
                    <Select
                        label="Função"
                        options={[
                            { id: UserRole.USER, label: 'Usuário' },
                            { id: UserRole.ADMIN, label: 'Administrador' }
                        ]}
                        valueKey="id"
                        labelKey="label"
                        value={{
                            id: formData.role,
                            label: formData.role === UserRole.ADMIN ? 'Administrador' : 'Usuário'
                        }}
                        onChange={(opt) => setFormData({ ...formData, role: opt.id })}
                    />
                </FormField>

                <FormField>
                    <Input
                        label={isEditing ? 'Nova Senha (deixe em branco para manter)' : 'Senha'}
                        type="password"
                        value={formData.password}
                        onChange={e => setFormData({ ...formData, password: e.target.value })}
                    />
                </FormField>

                <FormField>
                    <Input
                        label={isEditing ? 'Confirmar Nova Senha' : 'Confirmar Senha'}
                        type="password"
                        value={formData.confirmPassword}
                        onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                    />
                </FormField>

                {error && <ErrorText>{error}</ErrorText>}

                <FormActions>
                    <Button type="button" variant="outline" onClick={() => navigate('/admin/users')}>
                        Cancelar
                    </Button>
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Salvando...' : 'Salvar Usuário'}
                    </Button>
                </FormActions>
            </FormContainer >
        </div >
    );
};
