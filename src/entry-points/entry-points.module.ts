import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EntryPoint } from './entities/entry-point.entity';
import { EntryPointsController } from './entry-points.controller';
import { EntryPointsRepository } from './entry-points.repository';
import { EntryPointsService } from './entry-points.service';

@Module({
  imports: [TypeOrmModule.forFeature([EntryPoint, EntryPointsRepository])],
  controllers: [EntryPointsController],
  providers: [EntryPointsService],
  exports: [EntryPointsService],
})
export class EntryPointsModule {}
