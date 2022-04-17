import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { EntryPoint } from '@/entry-points/entities/entry-point.entity';

export enum ParkingType {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export enum ParkingStatus {
  Occupied = 'occupied',
  Unoccupied = 'unoccupied',
}

@Entity({ name: 'parkingSlots' })
export class ParkingSlot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    enum: ParkingType,
  })
  parkingType: ParkingType;

  @Column({
    enum: ParkingStatus,
  })
  status: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @ManyToMany(() => EntryPoint, (entryPoint) => entryPoint.parkingSlots)
  @JoinTable({
    name: 'entryPointsParkingSlots',
    joinColumn: {
      name: 'entryPointId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'parkingSlotId',
      referencedColumnName: 'id',
    },
  })
  entryPoints: Promise<EntryPoint[]>;

  @BeforeInsert()
  setCreatedAtValue() {
    this.updatedAt = this.createdAt = new Date();
  }

  @BeforeUpdate()
  setUpdatedAtValue() {
    this.updatedAt = new Date();
  }
}
