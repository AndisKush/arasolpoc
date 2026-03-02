
import type { User, UserFormData } from '../types';
import { api } from './api';

export const userService = {
    async getAll(): Promise<User[]> {
        const response = await api.get('/users');
        return response.data;
    },

    async getById(id: string): Promise<User | null> {
        const response = await api.get(`/users/${id}`);
        return response.data;
    },

    async create(data: UserFormData): Promise<User> {
        const response = await api.post('/users', data);
        return response.data;
    },

    async update(id: string, data: Partial<UserFormData>): Promise<User> {
        const response = await api.patch(`/users/${id}`, data);
        return response.data;
    },

    async delete(id: string): Promise<void> {
        await api.delete(`/users/${id}`);
    },

    async search(query: string): Promise<User[]> {
        const response = await api.get('/users', { params: { search: query } });
        return response.data;
    },

    async getStats() {
        // Se backend tiver endpoint específico ou calcularmos
        const response = await api.get('/users/stats');
        return response.data;
    },
};
