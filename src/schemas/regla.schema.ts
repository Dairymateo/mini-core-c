/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Regla {
  @Prop({ required: true })
  reglaId: number;

  @Prop({ required: true })
  reglaPorcentaje: number; 

  @Prop({ required: true })
  reglaMinimoMonto: number; 
}

export type ReglaDocument = Regla & Document;
export const ReglaSchema = SchemaFactory.createForClass(Regla);