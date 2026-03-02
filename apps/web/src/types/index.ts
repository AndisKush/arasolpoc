// Tipos de usuário
export const UserRole = {
    ADMIN: 'ADMIN',
    USER: 'USER',
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    status: 'active' | 'inactive';
    createdAt: string;
}

export interface Event {
    id: string;
    name: string;
    sql: string;
    status: 'active' | 'completed' | 'pending';
    userId: string;
    createdAt: string;
}

// Auth
export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthToken {
    token: string;
    refreshToken: string;
    expiresIn: number;
}

export interface AuthUser {
    id: string;
    name: string;
    email: string;
    role: UserRole;
}

export interface AuthState {
    user: AuthUser | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

// Forms
export interface UserFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: UserRole;
    status: 'active' | 'inactive';
}

export interface EventFormData {
    name: string;
    sql: string;
}

// Dashboard
export interface DashboardStats {
    total: number;
    active: number;
    inactive?: number;
    completed?: number;
    newThisMonth: number;
}
