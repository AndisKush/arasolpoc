import { UserRole } from '../types';
import type { AuthUser } from '../types';

export const jwt = {
    decode(token: string): any | null {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
        } catch (e) {
            return null;
        }
    },

    isValid(token: string): boolean {
        const payload = this.decode(token);
        if (!payload) return false;

        // JWT exp is in seconds
        return payload.exp * 1000 > Date.now();
    },

    getUser(token: string): AuthUser | null {
        const payload = this.decode(token);
        if (!payload) return null;

        return {
            id: payload.sub,
            email: payload.email,
            name: payload.name || payload.email, // Fallback se name não vier
            role: payload.role as UserRole,
        };
    }
};
