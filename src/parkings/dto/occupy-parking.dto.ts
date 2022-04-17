import { IsDefined, IsEnum, IsInt, IsNotEmpty } from 'class-validator';

export enum ParkingAction {
  TimeIn = 'timeIn',
  TimeOut = 'timeOut',
}

export class OccupyParkingDto {
  @IsDefined()
  @IsNotEmpty()
  @IsInt()
  entryPointId: number;

  @IsDefined()
  @IsNotEmpty()
  @IsInt()
  vehicleId: number;

  @IsDefined()
  @IsNotEmpty()
  @IsEnum(ParkingAction)
  action: ParkingAction;
}
