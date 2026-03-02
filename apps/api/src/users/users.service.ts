import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async findOne(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }

    async findById(id: string): Promise<any | null> {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });
        if (!user) return null;
        const { password, ...result } = user;
        return result;
    }

    async findAll(): Promise<any[]> {
        const users = await this.prisma.user.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return users.map(user => {
            const { password, ...result } = user;
            return result;
        });
    }

    async create(data: any): Promise<any> {
        if ('confirmPassword' in data) {
            delete data.confirmPassword;
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await this.prisma.user.create({
            data: {
                ...data,
                password: hashedPassword,
            },
        });
        const { password, ...result } = user;
        return result;
    }

    async update(id: string, data: any): Promise<any> {
        // Remove confirmPassword as it's not a database field
        if ('confirmPassword' in data) {
            delete data.confirmPassword;
        }

        // Handle password update
        if (data.password && typeof data.password === 'string' && data.password.trim() !== '') {
            data.password = await bcrypt.hash(data.password, 10);
        } else {
            // If password is empty or not provided, don't attempt to update it
            delete data.password;
        }

        const user = await this.prisma.user.update({
            where: { id },
            data
        });

        const { password, ...result } = user;
        return result;
    }

    async delete(id: string): Promise<any> {
        const user = await this.prisma.user.delete({
            where: { id }
        });
        const { password, ...result } = user;
        return result;
    }

    async getStats() {
        const total = await this.prisma.user.count();
        const active = await this.prisma.user.count({ where: { status: 'active' } });
        const inactive = await this.prisma.user.count({ where: { status: 'inactive' } }); // Precisaria ajustar status no schema se não for string

        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        const newThisMonth = await this.prisma.user.count({
            where: {
                createdAt: { gte: lastMonth }
            }
        });

        return { total, active, inactive, newThisMonth };
    }
}
