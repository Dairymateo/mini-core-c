/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';



@Schema()
export class Usuario {

    @Prop({ required: true })
    nombre: string;
}


export type UsuarioDocument = Usuario & Document;
export const UsuarioSchema = SchemaFactory.createForClass(Usuario);