import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../../components/LoginForm';
import { AuthLayout } from '../../layouts/AuthLayout';
import { useAuth } from '../../hooks/useAuth';

import type { LoginCredentials } from '../../types';

export const Login: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (credentials: LoginCredentials) => {
        try {
            setIsLoading(true);
            await login(credentials);
            // Redirecionamento é tratado no PrivateRoute ou aqui
            // Como o estado atualiza assincronamente, podemos contar com o useEffect do roteamento
            // ou forçar a verificação do role aqui, mas o melhor é deixar o PrivateRoute ou a navegação pós login
            // Porém, como o login no context não retorna o user atualizado imediatamente no mesmo ciclo sem await,
            // vamos pegar do localStorage ou confiar no redirecionamento padrão das rotas

            // Update: O login é async, então aqui já deve ter terminado.
            // Vamos ler do localStorage para saber pra onde ir, ou melhor, 
            // deixar o sistema de rotas redirecionar se estiver acessando uma rota protegida,
            // mas como estamos no /login, precisamos empurrar.

            const userStr = localStorage.getItem('@linkservice:user');
            if (userStr) {
                navigate('/modules');
            }
        } catch (error) {
            console.error(error);
            throw error; // LoginForm vai tratar e mostrar erro
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout>
            <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
        </AuthLayout>
    );
};
