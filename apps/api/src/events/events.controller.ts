import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, HttpException, HttpStatus } from '@nestjs/common';
import { EventsService } from './events.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('events')
@UseGuards(AuthGuard('jwt'))
export class EventsController {
    constructor(private readonly eventsService: EventsService) { }

    @Post()
    async create(@Request() req: any, @Body() createEventDto: { name: string; sql: string }) {
        return this.eventsService.create({
            name: createEventDto.name,
            sql: createEventDto.sql,
            user: { connect: { id: req.user.userId } }
        });
    }

    @Get()
    findAll(@Request() req: any) {
        return this.eventsService.findAll(req.user.userId);
    }

    @Get('stats')
    getStats(@Request() req: any) {
        return this.eventsService.getStats(req.user.userId);
    }

    @Get(':id')
    async findOne(@Request() req: any, @Param('id') id: string) {
        const event = await this.eventsService.findOne(id, req.user.userId);
        if (!event) throw new HttpException('Evento não encontrado', HttpStatus.NOT_FOUND);
        return event;
    }

    @Patch(':id')
    async update(@Request() req: any, @Param('id') id: string, @Body() updateEventDto: { name?: string; sql?: string }) {
        try {
            return await this.eventsService.update(id, req.user.userId, updateEventDto);
        } catch (e) {
            throw new HttpException('Erro ao atualizar evento', HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':id')
    async remove(@Request() req: any, @Param('id') id: string) {
        try {
            await this.eventsService.remove(id, req.user.userId);
            return { success: true };
        } catch (e) {
            throw new HttpException('Erro ao deletar evento', HttpStatus.BAD_REQUEST);
        }
    }
}
