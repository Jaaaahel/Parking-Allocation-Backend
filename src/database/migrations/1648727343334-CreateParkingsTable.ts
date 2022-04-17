import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateParkingsTable1648727343334 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'parkings',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'parkingSlotId',
            type: 'int',
          },
          {
            name: 'vehicleId',
            type: 'int',
          },
          {
            name: 'timeIn',
            type: 'timestamp',
          },
          {
            name: 'timeOut',
            type: 'timestamp',
            isNullable: true,
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

    await queryRunner.createForeignKeys('parkings', [
      new TableForeignKey({
        columnNames: ['parkingSlotId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'parkingSlots',
        onDelete: 'CASCADE',
      }),

      new TableForeignKey({
        columnNames: ['vehicleId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'vehicles',
        onDelete: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('parkings');
  }
}
