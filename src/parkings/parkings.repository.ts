import { EntityRepository, Repository } from 'typeorm';

import { Parking } from '@/parkings/entities/parking.entity';

@EntityRepository(Parking)
export class ParkingsRepository extends Repository<Parking> {}
