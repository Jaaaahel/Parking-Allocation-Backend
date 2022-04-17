import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import {
  ParkingStatus,
  ParkingType,
} from '@/parking-slots/entities/parking-slot.entity';

export class CreateParkingSlotsTable1648647112831
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'parkingSlots',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'parkingType',
            type: 'enum',
            enum: Object.values(ParkingType),
          },
          {
            name: 'status',
            type: 'enum',
            enum: Object.values(ParkingStatus),
          },
          {
            name: 'createdAt',
            type: 'timestamp',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
          },
        ],
      }),
    );

    // await queryRunner.manager.save(
    //   queryRunner.manager.create<ParkingSlot>(ParkingSlot, {
    //     name: 'P1',
    //     parkingType: 'small',
    //     status: 'I',
    //   }),
    // );

    // await queryRunner.manager.save(
    //   queryRunner.manager.create<ParkingSlot>(ParkingSlot, {
    //     name: 'P2',
    //     parkingType: 'small',
    //     status: 'I',
    //   }),
    // );

    // await queryRunner.manager.save(
    //   queryRunner.manager.create<ParkingSlot>(ParkingSlot, {
    //     name: 'P3',
    //     parkingType: 'medium',
    //     status: 'I',
    //   }),
    // );

    // await queryRunner.manager.save(
    //   queryRunner.manager.create<ParkingSlot>(ParkingSlot, {
    //     name: 'P4',
    //     parkingType: 'medium',
    //     status: 'I',
    //   }),
    // );

    // await queryRunner.manager.save(
    //   queryRunner.manager.create<ParkingSlot>(ParkingSlot, {
    //     name: 'P5',
    //     parkingType: 'large',
    //     status: 'I',
    //   }),
    // );

    // await queryRunner.manager.save(
    //   queryRunner.manager.create<ParkingSlot>(ParkingSlot, {
    //     name: 'P6',
    //     parkingType: 'large',
    //     status: 'I',
    //   }),
    // );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('parkingSlots');
  }
}
