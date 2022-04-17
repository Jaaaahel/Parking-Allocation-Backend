import { EntityRepository, Repository } from 'typeorm';

import { Vehicle } from '@/vehicles/entities/vehicle.entity';

@EntityRepository(Vehicle)
export class VehiclesRepository extends Repository<Vehicle> {}
