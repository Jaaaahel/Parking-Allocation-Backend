import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ParkingType } from '@/parking-slots/entities/parking-slot.entity';

@Entity({ name: 'fees' })
export class Fee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    enum: ParkingType,
  })
  parkingType: ParkingType;

  @Column()
  initialFee: number;

  @Column()
  exceedingFee: number;

  @Column()
  overnightFee: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @BeforeInsert()
  setCreatedAtValue() {
    this.updatedAt = this.createdAt = new Date();
  }

  @BeforeUpdate()
  setUpdatedAtValue() {
    this.updatedAt = new Date();
  }
}
