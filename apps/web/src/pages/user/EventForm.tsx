import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Heading, Button, Input, ErrorText, FormContainer, FormField, FormActions, Caption, TextArea } from '@andisds/ui';
import { eventService } from '../../services/event.service';
import { useAuth } from '../../hooks/useAuth';

export const EventForm: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = !!id;

    const [formData, setFormData] = useState({
        name: '',
        sql: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEditing && user) {
            loadEvent(id, user.id);
        }
    }, [id, user]);

    const loadEvent = async (eventId: string, userId: string) => {
        try {
            setLoading(true);
            const event = await eventService.getById(eventId, userId);
            if (event) {
                setFormData({
                    name: event.name,
                    sql: event.sql,
                });
            } else {
                setError('Evento não encontrado');
            }
        } catch (err) {
            setError('Erro ao carregar evento');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setError('');

        if (!formData.name || !formData.sql) {
            setError('Preencha os campos obrigatórios');
            return;
        }

        try {
            setLoading(true);
            if (isEditing) {
                await eventService.update(id!, formData, user.id);
            } else {
                await eventService.create(formData, user.id);
            }
            navigate('/events');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao salvar');
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditing && !formData.name) return <div>Carregando...</div>;

    return (
        <div>
            <Heading>{isEditing ? 'Editar Evento' : 'Novo Evento'}</Heading>

            <FormContainer onSubmit={handleSubmit}>
                <FormField>
                    <Input
                        label="Nome do Evento"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ex: Lembrete de Aniversário"
                    />
                </FormField>

                <FormField>
                    <TextArea
                        label="SQL de Filtro"
                        value={formData.sql}
                        onChange={e => setFormData({ ...formData, sql: e.target.value })}
                        placeholder="SELECT * FROM clientes WHERE..."
                    />
                    <Caption style={{ marginTop: 4 }}>
                        Escreva a query SQL para selecionar os clientes alvo deste evento.
                    </Caption>
                </FormField>

                {error && <ErrorText>{error}</ErrorText>}

                <FormActions>
                    <Button type="button" variant="outline" onClick={() => navigate('/events')}>
                        Cancelar
                    </Button>
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Salvando...' : 'Salvar Evento'}
                    </Button>
                </FormActions>
            </FormContainer>
        </div>
    );
};
