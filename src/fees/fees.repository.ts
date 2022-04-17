import { EntityRepository, Repository } from 'typeorm';

import { Fee } from '@/fees/entities/fee.entity';

@EntityRepository(Fee)
export class FeesRepository extends Repository<Fee> {}
