import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum VehicleType {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

@Entity({ name: 'vehicles' })
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  plateNumber: string;

  @Column({
    enum: VehicleType,
  })
  vehicleType: VehicleType;

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
