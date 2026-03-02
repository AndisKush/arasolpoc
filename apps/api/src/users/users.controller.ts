import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { Prisma } from '@prisma/client';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async create(@Body() createUserDto: Prisma.UserCreateInput) {
        // Validar se email já existe é feito no service/prisma (unique constraint)
        try {
            return await this.usersService.create(createUserDto);
        } catch (e: any) {
            if (e.code === 'P2002') {
                throw new HttpException('Email já cadastrado', HttpStatus.CONFLICT);
            }
            throw e;
        }
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async findAll(@Query('search') search?: string) {
        // Implementar search no service se precisar
        if (search) {
            // Mocking search support or implementing it in service
            // this.usersService.search(search)...
        }
        // Por enquanto retorna todos, service tem método findOne e create, preciso adicionar findAll
        // Vou usar o prisma direto aqui ou adicionar ao service
        return this.usersService.findAll();
    }

    @Get('stats')
    @UseGuards(AuthGuard('jwt'))
    async getStats() {
        return this.usersService.getStats();
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    async findOne(@Param('id') id: string) {
        return this.usersService.findById(id);
    }

    @Patch(':id')
    @UseGuards(AuthGuard('jwt'))
    async update(@Param('id') id: string, @Body() updateUserDto: Prisma.UserUpdateInput) {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    async remove(@Param('id') id: string) {
        return this.usersService.delete(id);
    }
}
