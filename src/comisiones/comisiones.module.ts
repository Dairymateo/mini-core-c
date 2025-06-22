/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// src/comisiones/comisiones.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ComisionesService } from './comisiones.service';
import { ComisionesController } from './comisiones.controller';
import { VentaSchema, Venta } from '../schemas/venta.schema'; // Importa Venta
import { ReglaSchema, Regla } from '../schemas/regla.schema'; // Importa Regla
import { UsuarioSchema, Usuario } from '../schemas/usuario.schema'; // Importa Usuario

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Venta.name, schema: VentaSchema }, // Usa Venta.name
      { name: Regla.name, schema: ReglaSchema },   // Usa Regla.name
      { name: Usuario.name, schema: UsuarioSchema } // Agrega el modelo de Usuario
    ])
  ],
  controllers: [ComisionesController],
  providers: [ComisionesService],
})
export class ComisionesModule {}