
import type { LoginCredentials, AuthToken, AuthUser } from '../types';
import { api } from './api';
import { jwt } from '../utils/jwt';

export const authService = {
    async login(credentials: LoginCredentials): Promise<{ user: AuthUser; tokens: AuthToken }> {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    },

    async logout(): Promise<void> {
        // Backend stateless, apenas removemos localmente
    },

    async refreshToken(_refreshToken: string): Promise<AuthToken> {
        // Implementar se backend suportar refresh
        // Por enquanto lança erro ou retorna dummy
        throw new Error('Not implemented');
    },

    validateToken(token: string): boolean {
        return jwt.isValid(token);
    },

    getUserFromToken(token: string): AuthUser | null {
        return jwt.getUser(token);
    },
};
