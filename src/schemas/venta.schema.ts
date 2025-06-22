/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';


@Schema()
export class Venta {
  @Prop({ required: true })
  fechaVenta: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true }) 
  vendedor: mongoose.Schema.Types.ObjectId; 

  @Prop({ required: true })
  monto: number;
}

export type VentaDocument = Venta & Document;
export const VentaSchema = SchemaFactory.createForClass(Venta);