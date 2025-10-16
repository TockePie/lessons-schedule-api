import { UUID } from 'node:crypto'

import { BadRequestException, Controller, Get, Query } from '@nestjs/common'

import { SpeciLessonsService } from './speci-lessons.service'

@Controller('speci-lessons')
export class SpeciLessonsController {
  constructor(private readonly speciLessons: SpeciLessonsService) {}

  @Get()
  getSpeciLessons(@Query('groupId') group_id: UUID) {
    if (!group_id) {
      throw new BadRequestException('Group ID is not provided.')
    }

    return this.speciLessons.getSpeciLessons(group_id)
  }
}
