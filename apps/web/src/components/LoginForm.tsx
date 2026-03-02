import React, { useState } from 'react';
import { Button, Input, ErrorText, Stack, Caption } from '@andisds/ui';
import type { LoginCredentials } from '../types';

interface LoginFormProps {
    onSubmit: (credentials: LoginCredentials) => Promise<void>;
    isLoading?: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Preencha todos os campos');
            return;
        }

        try {
            await onSubmit({ email, password });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao fazer login');
        }
    };

    const fillUser = () => {
        setEmail('user@linkservice.com');
        setPassword('user123');
    };

    return (
        <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
            <Stack gap={6}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
                    <img
                        src="/src/assets/logo.png"
                        alt="Arasol Logo"
                        style={{
                            height: '60px',
                            objectFit: 'contain',
                            filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.1))'
                        }}
                    />
                </div>
                <Stack gap={4}>
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                    />

                    <Input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                    />
                </Stack>

                {error && <ErrorText>{error}</ErrorText>}

                <Stack gap={2}>
                    <Button type="submit" variant="primary" disabled={isLoading}>
                        {isLoading ? 'Entrando...' : 'Entrar'}
                    </Button>
                </Stack>

                <Stack gap={2} align="center">
                    <Caption align="center">
                        <strong>Usuários de teste:</strong>
                    </Caption>

                    <Stack gap={2} width="100%">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={fillUser}
                            disabled={isLoading}
                        >
                            Usuário (user@linkservice.com)
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
        </form>
    );
};
