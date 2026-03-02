import React, { createContext, useState, useEffect, useCallback } from 'react';
import type { AuthState, LoginCredentials } from '../types';
import { authService } from '../services/auth.service';
import { storage } from '../utils/storage';

interface AuthContextData extends AuthState {
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [state, setState] = useState<AuthState>({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: true,
    });

    // Inicializa o estado a partir do token salvo
    useEffect(() => {
        const initializeAuth = () => {
            const token = storage.getToken();

            if (token) {
                // Verifica se o token ainda é válido
                if (authService.validateToken(token)) {
                    // REGRAS DE SEGURANÇA:
                    // Derivamos o usuário do token para garantir que a role é autêntica.
                    // Isso previne que manipulações no localStorage ou na resposta da API
                    // concedam acesso indevido na UI.
                    const userFromToken = authService.getUserFromToken(token);

                    if (userFromToken) {
                        setState({
                            user: userFromToken,
                            token,
                            isAuthenticated: true,
                            isLoading: false,
                        });
                        return;
                    }
                }
            }

            // Se não tem token ou é inválido, limpa tudo
            storage.clearAll();
            setState({
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false,
            });
        };

        initializeAuth();
    }, []);

    // Login
    const login = useCallback(async (credentials: LoginCredentials) => {
        try {
            setState(prev => ({ ...prev, isLoading: true }));

            const { tokens } = await authService.login(credentials);

            // Decodifica o usuário do token recém recebido para garantir integridade
            const userFromToken = authService.getUserFromToken(tokens.token);

            if (!userFromToken) {
                throw new Error('Invalid token received');
            }

            // Salva no localStorage
            storage.setToken(tokens.token);
            storage.setRefreshToken(tokens.refreshToken);
            // Opcional: setar o user no storage para logs/debug, mas o app usa a verdade do token
            storage.setUser(userFromToken);

            setState({
                user: userFromToken,
                token: tokens.token,
                isAuthenticated: true,
                isLoading: false,
            });
        } catch (error) {
            setState(prev => ({ ...prev, isLoading: false }));
            throw error;
        }
    }, []);

    // Logout
    const logout = useCallback(() => {
        authService.logout();
        storage.clearAll();

        setState({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
        });
    }, []);

    return (
        <AuthContext.Provider
            value={{
                ...state,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
