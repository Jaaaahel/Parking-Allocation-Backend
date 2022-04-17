import { Seeder } from '@jorgebodega/typeorm-seeding';
import { Connection } from 'typeorm';

import { EntryPoint } from '@/entry-points/entities/entry-point.entity';
import { EntryPointsRepository } from '@/entry-points/entry-points.repository';
import { Fee } from '@/fees/entities/fee.entity';
import { FeesRepository } from '@/fees/fees.repository';
import {
  ParkingSlot,
  ParkingStatus,
  ParkingType,
} from '@/parking-slots/entities/parking-slot.entity';
import { ParkingSlotsRepository } from '@/parking-slots/parking-slots.repository';

const parkingSlots: Partial<ParkingSlot>[] = [
  {
    name: 'P1',
    parkingType: ParkingType.Small,
    status: ParkingStatus.Unoccupied,
  },
  {
    name: 'P2',
    parkingType: ParkingType.Small,
    status: ParkingStatus.Unoccupied,
  },
  {
    name: 'P3',
    parkingType: ParkingType.Medium,
    status: ParkingStatus.Unoccupied,
  },
  {
    name: 'P4',
    parkingType: ParkingType.Medium,
    status: ParkingStatus.Unoccupied,
  },
  {
    name: 'P5',
    parkingType: ParkingType.Large,
    status: ParkingStatus.Unoccupied,
  },
  {
    name: 'P6',
    parkingType: ParkingType.Large,
    status: ParkingStatus.Unoccupied,
  },
];

const entryPoints: Partial<EntryPoint>[] = [
  {
    name: 'Entrance A',
  },
  {
    name: 'Entrance B',
  },
  {
    name: 'Entrance C',
  },
];

const entryPointsParkingSlots = [
  {
    entryPointName: 'Entrance A',
    parkingSlotNames: ['P1', 'P2'],
  },
  {
    entryPointName: 'Entrance B',
    parkingSlotNames: ['P3', 'P4'],
  },
  {
    entryPointName: 'Entrance C',
    parkingSlotNames: ['P5', 'P6'],
  },
];

const fees: Partial<Fee>[] = [
  {
    parkingType: ParkingType.Small,
    initialFee: 40,
    exceedingFee: 20,
    overnightFee: 5000,
  },
  {
    parkingType: ParkingType.Medium,
    initialFee: 40,
    exceedingFee: 60,
    overnightFee: 5000,
  },
  {
    parkingType: ParkingType.Large,
    initialFee: 40,
    exceedingFee: 100,
    overnightFee: 5000,
  },
];

export class RootSeeder extends Seeder {
  async run(connection: Connection): Promise<void> {
    const parkingSlotsRepository = connection.getCustomRepository(
      ParkingSlotsRepository,
    );
    const entryPointsRepository = connection.getCustomRepository(
      EntryPointsRepository,
    );
    const feesRepository = connection.getCustomRepository(FeesRepository);

    await parkingSlotsRepository.save(
      parkingSlots.map((parkingSlot) =>
        parkingSlotsRepository.create(parkingSlot),
      ),
    );

    await entryPointsRepository.save(
      entryPoints.map((entryPoint) => entryPointsRepository.create(entryPoint)),
    );

    const existingParkingSlots = await parkingSlotsRepository.find();
    const existingEntryPoints = await entryPointsRepository.find();

    const updatedEntryPoints = entryPointsParkingSlots.map(
      ({ entryPointName, parkingSlotNames }) => {
        const existingEntryPoint = existingEntryPoints.find(
          ({ name }) => name === entryPointName,
        );

        existingEntryPoint.parkingSlots = Promise.resolve(
          parkingSlotNames.map((parkingSlotName) =>
            existingParkingSlots.find(({ name }) => name === parkingSlotName),
          ),
        );

        return existingEntryPoint;
      },
    );

    await entryPointsRepository.save(updatedEntryPoints);

    await feesRepository.save(fees.map((fee) => feesRepository.create(fee)));
  }
}
