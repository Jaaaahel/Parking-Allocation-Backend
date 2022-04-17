import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ParkingSlot } from './entities/parking-slot.entity';
import { ParkingSlotsController } from './parking-slots.controller';
import { ParkingSlotsRepository } from './parking-slots.repository';
import { ParkingSlotsService } from './parking-slots.service';

@Module({
  imports: [TypeOrmModule.forFeature([ParkingSlot, ParkingSlotsRepository])],
  controllers: [ParkingSlotsController],
  providers: [ParkingSlotsService],
  exports: [ParkingSlotsService],
})
export class ParkingSlotsModule {}
