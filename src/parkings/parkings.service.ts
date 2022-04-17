import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { EntryPointsService } from '@/entry-points/entry-points.service';
import { FeesService } from '@/fees/fees.service';
import { ParkingSlot } from '@/parking-slots/entities/parking-slot.entity';
import {
  ParkingSlotsService,
  parkingTypeWeights,
} from '@/parking-slots/parking-slots.service';
import { Parking } from '@/parkings/entities/parking.entity';
import { VehicleType } from '@/vehicles/entities/vehicle.entity';

import { CreateParkingDto } from './dto/create-parking.dto';
import { UpdateParkingDto } from './dto/update-parking.dto';
import { ParkingsRepository } from './parkings.repository';

@Injectable()
export class ParkingsService {
  constructor(
    @InjectRepository(Parking)
    private readonly parkingRepository: ParkingsRepository,
    private readonly entryPointsService: EntryPointsService,
    private readonly parkingSlotsService: ParkingSlotsService,
    private readonly feesService: FeesService,
  ) {}

  async getAvailableParkingSlots(
    entryPointId: number,
    vehicleType: VehicleType,
  ): Promise<ParkingSlot[]> {
    const parkingSlots = await this.parkingSlotsService.findByVehicleType(
      vehicleType,
    );
    const entryPoint = await this.entryPointsService.findOne(entryPointId);

    const closestParkingSlots = await entryPoint.parkingSlots;

    const matchingParkingSlots = parkingSlots.filter((parkingSlot) =>
      closestParkingSlots.some(
        (closestParkingSlot) => closestParkingSlot.id === parkingSlot.id,
      ),
    );

    const orderedParkingSlots = parkingSlots
      .sort(
        (a, b) =>
          parkingTypeWeights[a.parkingType] - parkingTypeWeights[b.parkingType],
      )
      .sort((a, b) => a.id - b.id);

    return [...matchingParkingSlots, ...orderedParkingSlots];
  }

  create(createParkingDto: CreateParkingDto) {
    const newParking = this.parkingRepository.create(createParkingDto);
    return this.parkingRepository.save(newParking);
  }

  async findByVehicle(vehicleId: number) {
    const parking = await this.parkingRepository.findOne({
      where: {
        vehicleId,
      },
      order: {
        createdAt: 'DESC',
      },
    });

    return parking;
  }

  async calculateFees(parkingId: number) {
    const parking = await this.findOne(parkingId);

    if (parking.timeIn === null || parking.timeOut === null) {
      return 0;
    }

    const parkingSlot = await this.parkingSlotsService.findOne(
      parking.parkingSlotId,
    );

    const fee = await this.feesService.findByParkingType(
      parkingSlot.parkingType,
    );

    let duration =
      (parking.timeOut.getTime() - parking.timeIn.getTime()) / 1000;

    let amount = 40;

    if (duration > 60 * 60 * 24) {
      const days = Math.floor(duration / (60 * 60 * 24));
      duration -= 60 * 60 * 24 * days;
      amount = days * fee.overnightFee;
    } else if (duration >= 3 * 60 * 60) {
      duration -= 3 * 60 * 60;
    } else {
      duration = 0;
    }

    if (duration > 0) {
      const hours = Math.ceil(duration / 60 / 60);
      amount += hours * fee.exceedingFee;
    }

    return amount;
  }

  findAll() {
    // return `This action returns all parkings`;
    return this.parkingRepository.find({
      order: { id: 'DESC' },
    });
  }

  findOne(id: number) {
    return this.parkingRepository.findOne(id);
  }

  async update(id: number, updateParkingDto: UpdateParkingDto) {
    const parking = await this.findOne(id);

    Object.assign(parking, updateParkingDto);

    await this.parkingRepository.save(parking);

    return;
  }

  remove(id: number) {
    return `This action removes a #${id} parking`;
  }
}
