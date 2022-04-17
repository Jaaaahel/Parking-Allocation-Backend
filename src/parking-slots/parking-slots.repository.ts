import { EntityRepository, Repository } from 'typeorm';

import { ParkingSlot } from '@/parking-slots/entities/parking-slot.entity';

@EntityRepository(ParkingSlot)
export class ParkingSlotsRepository extends Repository<ParkingSlot> {}
