import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EntryPointsModule } from '@/entry-points/entry-points.module';
import { FeesModule } from '@/fees/fees.module';
import { ParkingSlotsModule } from '@/parking-slots/parking-slots.module';
import { VehiclesModule } from '@/vehicles/vehicles.module';

import { Parking } from './entities/parking.entity';
import { ParkingsController } from './parkings.controller';
import { ParkingsRepository } from './parkings.repository';
import { ParkingsService } from './parkings.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Parking, ParkingsRepository]),
    EntryPointsModule,
    ParkingSlotsModule,
    VehiclesModule,
    FeesModule,
  ],
  controllers: [ParkingsController],
  providers: [ParkingsService],
})
export class ParkingsModule {}
