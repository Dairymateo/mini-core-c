import { Test, TestingModule } from '@nestjs/testing';
import { ComisionesController } from './comisiones.controller';
import { ComisionesService } from './comisiones.service';

describe('ComisionesController', () => {
  let controller: ComisionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComisionesController],
      providers: [ComisionesService],
    }).compile();

    controller = module.get<ComisionesController>(ComisionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
