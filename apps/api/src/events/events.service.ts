import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Event } from '@prisma/client';

@Injectable()
export class EventsService {
    constructor(private prisma: PrismaService) { }

    async create(data: Prisma.EventCreateInput): Promise<Event> {
        return this.prisma.event.create({
            data,
        });
    }

    async findAll(userId: string): Promise<Event[]> {
        return this.prisma.event.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findOne(id: string, userId: string): Promise<Event | null> {
        return this.prisma.event.findFirst({
            where: { id, userId },
        });
    }

    async update(id: string, userId: string, data: Prisma.EventUpdateInput): Promise<Event> {
        // Primeiro verifica se pertence ao user
        const event = await this.prisma.event.findFirst({
            where: { id, userId },
        });

        if (!event) {
            throw new Error('Evento não encontrado ou acesso negado');
        }

        return this.prisma.event.update({
            where: { id },
            data,
        });
    }

    async remove(id: string, userId: string): Promise<void> {
        const event = await this.prisma.event.findFirst({
            where: { id, userId },
        });

        if (!event) {
            throw new Error('Evento não encontrado ou acesso negado');
        }

        await this.prisma.event.delete({
            where: { id },
        });
    }

    async getStats(userId: string) {
        const total = await this.prisma.event.count({ where: { userId } });
        const active = await this.prisma.event.count({ where: { userId, status: 'active' } });
        const completed = await this.prisma.event.count({ where: { userId, status: 'completed' } });

        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        const newThisMonth = await this.prisma.event.count({
            where: {
                userId,
                createdAt: { gte: lastMonth }
            }
        });

        return { total, active, completed, newThisMonth };
    }
}
