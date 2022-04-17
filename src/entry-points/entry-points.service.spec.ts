import { Test, TestingModule } from '@nestjs/testing';

import { EntryPointsService } from './entry-points.service';

describe('EntriesService', () => {
  let service: EntryPointsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EntryPointsService],
    }).compile();

    service = module.get<EntryPointsService>(EntryPointsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
