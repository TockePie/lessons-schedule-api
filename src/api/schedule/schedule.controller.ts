import {
  BadRequestException,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Query
} from '@nestjs/common'

import { ScheduleService } from './schedule.service'

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly schedule: ScheduleService) {}

  @Get()
  showBadRequest() {
    throw new BadRequestException('Select a group to see the schedule')
  }

  @Get(':id')
  getGroupSchedule(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Query('week') week: 'even' | 'odd'
  ) {
    if (!week) {
      throw new BadRequestException('Select a week to see the schedule')
    }

    return this.schedule.getGroupSchedule(id, week)
  }
}
