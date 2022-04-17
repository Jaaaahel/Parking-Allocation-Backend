import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ParkingType } from '@/parking-slots/entities/parking-slot.entity';

import { CreateFeeDto } from './dto/create-fee.dto';
import { UpdateFeeDto } from './dto/update-fee.dto';
import { Fee } from './entities/fee.entity';
import { FeesRepository } from './fees.repository';

@Injectable()
export class FeesService {
  constructor(
    @InjectRepository(Fee)
    private readonly feesRepository: FeesRepository,
  ) {}

  findByParkingType(parkingType: ParkingType) {
    return this.feesRepository.findOne({
      where: {
        parkingType,
      },
    });
  }

  create(createFeeDto: CreateFeeDto) {
    return 'This action adds a new fee';
  }

  findAll() {
    return `This action returns all fees`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fee`;
  }

  update(id: number, updateFeeDto: UpdateFeeDto) {
    return `This action updates a #${id} fee`;
  }

  remove(id: number) {
    return `This action removes a #${id} fee`;
  }
}
