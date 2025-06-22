/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ComisionesModule } from './comisiones/comisiones.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://admintest:Udla@clusterudla01.grlj6.mongodb.net/mini-core'),
    ComisionesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
