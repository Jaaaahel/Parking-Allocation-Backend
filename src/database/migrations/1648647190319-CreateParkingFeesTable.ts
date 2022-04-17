import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { Fee } from '@/fees/entities/fee.entity';
import { ParkingType } from '@/parking-slots/entities/parking-slot.entity';

export class CreateParkingFeesTable1648647190319 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'fees',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'parkingType',
            type: 'enum',
            enum: Object.values(ParkingType),
          },
          {
            name: 'initialFee',
            type: 'int',
          },
          {
            name: 'exceedingFee',
            type: 'int',
          },
          {
            name: 'overnightFee',
            type: 'int',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('slot_types');
  }
}
