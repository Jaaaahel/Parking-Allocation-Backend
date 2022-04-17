import { PartialType } from '@nestjs/mapped-types';

import { CreateEntryPointDto } from './create-entry-point.dto';

export class UpdateEntryPointDto extends PartialType(CreateEntryPointDto) {}
