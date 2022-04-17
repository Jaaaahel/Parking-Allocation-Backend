import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateEntryPointDto } from './dto/create-entry-point.dto';
import { UpdateEntryPointDto } from './dto/update-entry-point.dto';
import { EntryPointsService } from './entry-points.service';

@Controller('entrypoints')
export class EntryPointsController {
  constructor(private readonly entriesService: EntryPointsService) {}

  @Post()
  create(@Body() createEntryDto: CreateEntryPointDto) {
    return this.entriesService.create(createEntryDto);
  }

  @Get()
  findAll() {
    return this.entriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEntryDto: UpdateEntryPointDto) {
    return this.entriesService.update(+id, updateEntryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entriesService.remove(+id);
  }
}
