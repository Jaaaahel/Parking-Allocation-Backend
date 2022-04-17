import { IsDefined, IsInt, IsNotEmpty } from 'class-validator';

export class CreateParkingDto {
  @IsDefined()
  @IsNotEmpty()
  @IsInt()
  parkingSlotId: number;

  @IsDefined()
  @IsNotEmpty()
  @IsInt()
  vehicleId: number;
}
