import type { Event, EventFormData } from '../types';
import { api } from './api';

export const eventService = {
    async getAll(_userId: string): Promise<Event[]> {
        // userId é ignorado pois a API usa o token do usuário logado
        const response = await api.get('/events');
        return response.data;
    },

    async getById(id: string, _userId: string): Promise<Event | null> {
        const response = await api.get(`/events/${id}`);
        return response.data;
    },

    async create(data: EventFormData, _userId: string): Promise<Event> {
        const response = await api.post('/events', data);
        return response.data;
    },

    async update(id: string, data: Partial<EventFormData>, _userId: string): Promise<Event> {
        const response = await api.patch(`/events/${id}`, data);
        return response.data;
    },

    async delete(id: string, _userId: string): Promise<void> {
        await api.delete(`/events/${id}`);
    },

    async search(query: string, _userId: string): Promise<Event[]> {
        // Se backend suportar search query param
        const response = await api.get('/events', { params: { search: query } });
        return response.data; // Backend precisa filtrar se search for passado
    },

    async getStats(_userId: string) {
        const response = await api.get('/events/stats');
        return response.data;
    },
};
