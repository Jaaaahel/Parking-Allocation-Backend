import { Test, TestingModule } from '@nestjs/testing';

import { EntryPointsController } from './entry-points.controller';
import { EntryPointsService } from './entry-points.service';

describe('EntriesController', () => {
  let controller: EntryPointsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntryPointsController],
      providers: [EntryPointsService],
    }).compile();

    controller = module.get<EntryPointsController>(EntryPointsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
