import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateEntryPointsParkingSlotsTable1648803615514
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'entryPointsParkingSlots',
        columns: [
          {
            name: 'entryPointId',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'parkingSlotId',
            type: 'int',
            isPrimary: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys('entryPointsParkingSlots', [
      new TableForeignKey({
        columnNames: ['entryPointId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'entryPoints',
        onDelete: 'CASCADE',
      }),

      new TableForeignKey({
        columnNames: ['parkingSlotId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'parkingSlots',
        onDelete: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('entryPointsParkingSlots');
  }
}
