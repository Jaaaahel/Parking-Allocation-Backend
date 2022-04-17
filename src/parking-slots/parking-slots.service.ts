import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In } from 'typeorm';

import { VehicleType } from '@/vehicles/entities/vehicle.entity';

import { CreateParkingSlotDto } from './dto/create-parking-slot.dto';
import { UpdateParkingSlotDto } from './dto/update-parking-slot.dto';
import {
  ParkingSlot,
  ParkingStatus,
  ParkingType,
} from './entities/parking-slot.entity';
import { ParkingSlotsRepository } from './parking-slots.repository';

const vehicleTypeParkingSlotTypeMapping = {
  small: ['small', 'medium', 'large'],
  medium: ['medium', 'large'],
  large: ['large'],
};

export const parkingTypeWeights = {
  [ParkingType.Small]: 1,
  [ParkingType.Medium]: 2,
  [ParkingType.Large]: 3,
};

@Injectable()
export class ParkingSlotsService {
  constructor(
    @InjectRepository(ParkingSlot)
    private readonly parkingSlotsRepository: ParkingSlotsRepository,
  ) {}

  findByVehicleType(vehicleType: VehicleType) {
    return this.parkingSlotsRepository.find({
      where: {
        parkingType: In(vehicleTypeParkingSlotTypeMapping[vehicleType]),
        status: ParkingStatus.Unoccupied,
      },
    });
  }

  findOne(id: number) {
    return this.parkingSlotsRepository.findOne(id);
  }

  async update(id: number, updateSlotDto: UpdateParkingSlotDto) {
    const parkingSlot = await this.findOne(id);

    Object.assign(parkingSlot, updateSlotDto);

    await this.parkingSlotsRepository.save(parkingSlot);

    return;
  }

  create(createSlotDto: CreateParkingSlotDto) {
    return 'This action adds a new slot';
  }

  findAll() {
    return `This action returns all slots`;
  }

  remove(id: number) {
    return `This action removes a #${id} slot`;
  }
}
