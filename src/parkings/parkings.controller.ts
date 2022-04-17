import {
  Body,
  Controller,
  Delete,
  Get,
  NotAcceptableException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { ParkingStatus } from '@/parking-slots/entities/parking-slot.entity';
import { ParkingSlotsService } from '@/parking-slots/parking-slots.service';
import { VehiclesService } from '@/vehicles/vehicles.service';

import { OccupyParkingDto, ParkingAction } from './dto/occupy-parking.dto';
import { UpdateParkingDto } from './dto/update-parking.dto';
import { Parking, ParkingWithFee } from './entities/parking.entity';
import { ParkingsService } from './parkings.service';

@Controller('parkings')
export class ParkingsController {
  constructor(
    private readonly parkingsService: ParkingsService,
    private readonly parkingSlotsService: ParkingSlotsService,
    private readonly vehiclesService: VehiclesService,
  ) {}

  @Post()
  async create(
    @Body() occupyParkingDto: OccupyParkingDto,
  ): Promise<ParkingWithFee> {
    let parking: Parking;
    let fee = 0;

    const vehicle = await this.vehiclesService.findOne(
      occupyParkingDto.vehicleId,
    );

    if (occupyParkingDto.action === ParkingAction.TimeIn) {
      parking = await this.parkingsService.findByVehicle(vehicle.id);

      if (parking && parking.timeOut === null) {
        throw new NotAcceptableException('Cannot time in again');
      }

      const availableParkingSlots =
        await this.parkingsService.getAvailableParkingSlots(
          occupyParkingDto.entryPointId,
          vehicle.vehicleType,
        );

      if (availableParkingSlots.length === 0) {
        throw new NotAcceptableException('No Parking Slot Available');
      }

      const parkingSlot = availableParkingSlots[0];

      const currentTime = new Date().getTime();

      if (parking && currentTime - parking.timeOut.getTime() < 1000 * 60 * 60) {
        await this.parkingsService.update(parking.id, {
          parkingSlotId: parkingSlot.id,
          timeOut: null,
        });
      } else {
        parking = null;
      }

      await this.parkingSlotsService.update(parkingSlot.id, {
        status: ParkingStatus.Occupied,
      });

      if (!parking) {
        parking = await this.parkingsService.create({
          parkingSlotId: parkingSlot.id,
          vehicleId: vehicle.id,
        });
      }
    }

    if (occupyParkingDto.action === ParkingAction.TimeOut) {
      parking = await this.parkingsService.findByVehicle(vehicle.id);

      if (parking.timeOut !== null) {
        throw new NotAcceptableException('Cannot time out again');
      }

      await this.parkingSlotsService.update(parking.parkingSlotId, {
        status: ParkingStatus.Unoccupied,
      });

      await this.parkingsService.update(parking.id, {
        timeOut: new Date(),
      });

      if (parking) {
        fee = await this.parkingsService.calculateFees(parking.id);
      }
    }

    parking = await this.parkingsService.findOne(parking.id);
    return { ...parking, fee };
  }

  @Get()
  findAll() {
    return this.parkingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return id;
    // return this.parkingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParkingDto: UpdateParkingDto) {
    return this.parkingsService.update(+id, updateParkingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parkingsService.remove(+id);
  }
}
