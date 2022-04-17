import { EntityRepository, Repository } from 'typeorm';

import { EntryPoint } from '@/entry-points/entities/entry-point.entity';

@EntityRepository(EntryPoint)
export class EntryPointsRepository extends Repository<EntryPoint> {}
