import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Fee } from './entities/fee.entity';
import { FeesController } from './fees.controller';
import { FeesRepository } from './fees.repository';
import { FeesService } from './fees.service';

@Module({
  imports: [TypeOrmModule.forFeature([Fee, FeesRepository])],
  controllers: [FeesController],
  providers: [FeesService],
  exports: [FeesService],
})
export class FeesModule {}
