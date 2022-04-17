import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ParkingSlot } from '@/parking-slots/entities/parking-slot.entity';

@Entity({ name: 'entryPoints' })
export class EntryPoint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @ManyToMany(() => ParkingSlot, (parkingSlot) => parkingSlot.entryPoints, {
    cascade: true,
  })
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
  parkingSlots: Promise<ParkingSlot[]>;

  @BeforeInsert()
  setCreatedAtValue() {
    this.updatedAt = this.createdAt = new Date();
  }

  @BeforeUpdate()
  setUpdatedAtValue() {
    this.updatedAt = new Date();
  }
}
