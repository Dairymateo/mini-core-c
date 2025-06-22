/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus, HttpException } from '@nestjs/common';
import { ComisionesService } from './comisiones.service';
import { CreateComisioneDto } from './dto/create-comisione.dto';
import { UpdateComisioneDto } from './dto/update-comisione.dto';

@Controller('comisiones')
export class ComisionesController {
  constructor(private readonly comisionesService: ComisionesService) {}

  // Métodos de CRUD dummy (no se usan para la funcionalidad principal)
  @Post()
  create(@Body() createComisioneDto: CreateComisioneDto) {
    return this.comisionesService.create(createComisioneDto);
  }

  @Get('all') // Cambiado a 'all' para evitar conflicto con el Get de calcularComisiones
  findAll() {
    return this.comisionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comisionesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComisioneDto: UpdateComisioneDto) {
    return this.comisionesService.update(+id, updateComisioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comisionesService.remove(+id);
  }
  
  // Endpoint principal para calcular comisiones
  @Get()
  async obtenerComisiones(
    @Query('startDate') startDateString: string,
    @Query('endDate') endDateString: string,
  ) {
    if (!startDateString || !endDateString) {
      throw new HttpException(
        'Se requieren los parámetros startDate y endDate.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);

    // Validar si las fechas son válidas
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new HttpException(
        'Formato de fecha inválido. Use un formato reconocido por JavaScript Date (ej. YYYY-MM-DD).',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Asegurarse de que endDate incluya todo el día
    endDate.setHours(23, 59, 59, 999);


    return this.comisionesService.calcularComisiones(startDate, endDate);
  }
}