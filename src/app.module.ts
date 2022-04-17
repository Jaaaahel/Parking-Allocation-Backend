import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from '@/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EntryPointsModule } from './entry-points/entry-points.module';
import { FeesModule } from './fees/fees.module';
import { ParkingSlotsModule } from './parking-slots/parking-slots.module';
import { ParkingsModule } from './parkings/parkings.module';
import { VehiclesModule } from './vehicles/vehicles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),

    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        autoLoadEntities: true,
        synchronize: false,
        ...configService.get('database'),
      }),
      inject: [ConfigService],
    }),

    EntryPointsModule,

    VehiclesModule,

    ParkingSlotsModule,

    FeesModule,

    ParkingsModule,
  ],

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}
