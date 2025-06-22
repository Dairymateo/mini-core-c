import { Test, TestingModule } from '@nestjs/testing';
import { ComisionesService } from './comisiones.service';

describe('ComisionesService', () => {
  let service: ComisionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComisionesService],
    }).compile();

    service = module.get<ComisionesService>(ComisionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
