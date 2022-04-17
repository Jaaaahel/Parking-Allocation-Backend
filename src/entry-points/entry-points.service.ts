import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateEntryPointDto } from './dto/create-entry-point.dto';
import { UpdateEntryPointDto } from './dto/update-entry-point.dto';
import { EntryPoint } from './entities/entry-point.entity';
import { EntryPointsRepository } from './entry-points.repository';

@Injectable()
export class EntryPointsService {
  constructor(
    @InjectRepository(EntryPoint)
    private readonly entryPointsRepository: EntryPointsRepository,
  ) {}

  create(createEntryDto: CreateEntryPointDto) {
    return 'This action adds a new entry';
  }

  findAll() {
    return this.entryPointsRepository.find();
  }

  findOne(id: number) {
    return this.entryPointsRepository.findOne({
      id,
    });
  }

  update(id: number, updateEntryDto: UpdateEntryPointDto) {
    return `This action updates a #${id} entry`;
  }

  remove(id: number) {
    return `This action removes a #${id} entry`;
  }
}
