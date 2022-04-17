import { IsDefined, IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { VehicleType } from '../entities/vehicle.entity';

export class CreateVehicleDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  plateNumber: string;

  @IsDefined()
  @IsNotEmpty()
  @IsEnum(VehicleType)
  vehicleType: VehicleType;
}
