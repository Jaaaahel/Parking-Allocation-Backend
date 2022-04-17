import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ParkingSlot } from '@/parking-slots/entities/parking-slot.entity';
import { Vehicle } from '@/vehicles/entities/vehicle.entity';

@Entity({ name: 'parkings' })
export class Parking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  parkingSlotId: number;

  @Column()
  vehicleId: number;

  @Column()
  timeIn: Date;

  @Column()
  timeOut: Date;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @OneToOne(() => ParkingSlot, { eager: true })
  @JoinColumn()
  parkingSlot: Promise<ParkingSlot>;

  @OneToOne(() => Vehicle, { eager: true })
  @JoinColumn()
  vehicle: Promise<Vehicle>;

  @BeforeInsert()
  setValues() {
    this.updatedAt = this.createdAt = new Date();
    this.timeIn = new Date();
    this.timeOut = null;
  }

  @BeforeUpdate()
  setUpdatedAtValue() {
    this.updatedAt = new Date();
  }
}

export type ParkingWithFee = Partial<Parking> & {
  fee: number;
};
