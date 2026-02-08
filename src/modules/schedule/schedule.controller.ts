import {
  BadRequestException,
  Controller,
  Get,
  Param,
  ParseArrayPipe,
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
    @Query('week') week: 'even' | 'odd',
    @Query(
      'selectives',
      new ParseArrayPipe({ items: String, separator: ',', optional: true })
    )
    selectives: string[] = []
  ) {
    console.log({ selectives })
    return this.schedule.getGroupSchedule(id, week, selectives)
  }

  @Get('/:id/selectives')
  getAllSelectives(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.schedule.getAllSelectives(id)
  }
}
