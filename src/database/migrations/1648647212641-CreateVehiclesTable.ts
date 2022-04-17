import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { VehicleType } from '@/vehicles/entities/vehicle.entity';

export class CreateVehiclesTable1648647212641 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'vehicles',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'plateNumber',
            type: 'varchar',
          },
          {
            name: 'vehicleType',
            type: 'enum',
            enum: Object.values(VehicleType),
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
    await queryRunner.dropTable('vehicles');
  }
}
