/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateComisioneDto } from './dto/create-comisione.dto';
import { UpdateComisioneDto } from './dto/update-comisione.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Regla, ReglaDocument } from 'src/schemas/regla.schema';
import { Model } from 'mongoose';
import { Venta, VentaDocument } from 'src/schemas/venta.schema';
import { Usuario, UsuarioDocument } from 'src/schemas/usuario.schema';

// Interfaz para el objeto vendedor después de populate().lean()
// Esto es necesario porque .lean() devuelve un objeto JS plano, no un Mongoose Document.
interface PopulatedVendedor {
  _id: string; // El ID del usuario
  nombre: string;
}

// Interfaz para la información de la regla aplicada
interface ReglaPopulatedInfo {
  reglaId: number;
  porcentaje: number;
  minimoMonto: number;
}

@Injectable()
export class ComisionesService implements OnModuleInit {
  constructor(
    @InjectModel(Venta.name) private ventaModel: Model<VentaDocument>,
    @InjectModel(Regla.name) private reglaModel: Model<ReglaDocument>,
    @InjectModel(Usuario.name) private usuarioModel: Model<UsuarioDocument>,
  ) {}

  async onModuleInit() {
    const usuariosCount = await this.usuarioModel.countDocuments().exec();
    const reglasCount = await this.reglaModel.countDocuments().exec();
    const ventasCount = await this.ventaModel.countDocuments().exec();

    if (usuariosCount === 0) {
      console.log('Insertando datos iniciales de Usuarios...');
      await this.usuarioModel.insertMany([
        { nombre: 'Perico P' },
        { nombre: 'Zoila B' },
        { nombre: 'Aquiles C' },
        { nombre: 'Johnny M' },
      ]);
      console.log('Usuarios insertados.');
    }

    if (reglasCount === 0) {
      console.log('Insertando datos iniciales de Reglas...');
      await this.reglaModel.insertMany([
        { reglaId: 1, reglaPorcentaje: 0.06, reglaMinimoMonto: 600 },
        { reglaId: 2, reglaPorcentaje: 0.08, reglaMinimoMonto: 500 },
        { reglaId: 3, reglaPorcentaje: 0.1, reglaMinimoMonto: 800 },
        { reglaId: 4, reglaPorcentaje: 1.15, reglaMinimoMonto: 1000 },
      ]);
      console.log('Reglas insertadas.');
    }

    if (ventasCount === 0) {
      console.log('Insertando datos iniciales de Ventas...');
      const pericoP = await this.usuarioModel.findOne({ nombre: 'Perico P' }).exec();
      const zoilaB = await this.usuarioModel.findOne({ nombre: 'Zoila B' }).exec();
      const aquilesC = await this.usuarioModel.findOne({ nombre: 'Aquiles C' }).exec();

      if (pericoP && zoilaB && aquilesC) {
        await this.ventaModel.insertMany([
          { fechaVenta: new Date('2025-05-21T00:00:00Z'), vendedor: pericoP._id, monto: 400 },
          { fechaVenta: new Date('2025-05-29T00:00:00Z'), vendedor: zoilaB._id, monto: 600 },
          { fechaVenta: new Date('2025-06-03T00:00:00Z'), vendedor: zoilaB._id, monto: 200 },
          { fechaVenta: new Date('2025-06-09T00:00:00Z'), vendedor: pericoP._id, monto: 300 },
          { fechaVenta: new Date('2025-06-11T00:00:00Z'), vendedor: aquilesC._id, monto: 900 },
          { fechaVenta: new Date('2025-06-11T00:00:00Z'), vendedor: aquilesC._id, monto: 1100 },
        ]);
        console.log('Ventas insertadas.');
      } else {
        console.error('No se encontraron todos los vendedores para insertar las ventas. Asegúrate de que los usuarios existan.');
      }
    }
  }

  create(createComisioneDto: CreateComisioneDto) {
    return 'This action adds a new comisione';
  }

  findAll() {
    return `This action returns all comisiones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comisione`;
  }

  update(id: number, updateComisioneDto: UpdateComisioneDto) {
    return `This action updates a #${id} comisione`;
  }

  remove(id: number) {
    return `This action removes a #${id} comisione`;
  }

  async calcularComisiones(startDate: Date, endDate: Date) {
    const ventas = await this.ventaModel
      .find({
        fechaVenta: { $gte: startDate, $lte: endDate },
      })
      .populate('vendedor')
      .lean()
      .exec();

    const reglas = await this.reglaModel.find().sort({ reglaMinimoMonto: -1 }).lean().exec();

    return ventas.map((venta) => {
      let comision = 0;
      let reglaAplicadaInfo: ReglaPopulatedInfo | null = null; 

      for (const regla of reglas) {
        if (venta.monto >= regla.reglaMinimoMonto) {
          comision = venta.monto * regla.reglaPorcentaje;
          reglaAplicadaInfo = {
            reglaId: regla.reglaId,
            porcentaje: regla.reglaPorcentaje,
            minimoMonto: regla.reglaMinimoMonto,
          };
          break;
        }
      }

      return {
        _id: venta._id,
        fechaVenta: venta.fechaVenta,
        // *** SOLUCIÓN AL ERROR: Doble casting ***
        vendedor: (venta.vendedor as unknown as PopulatedVendedor).nombre,
        monto: venta.monto,
        reglaAplicada: reglaAplicadaInfo ? reglaAplicadaInfo.porcentaje : 0, 
        comision: parseFloat(comision.toFixed(2)),
      };
    });
  }
}