import { UUID } from 'node:crypto'

import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Query
} from '@nestjs/common'

import { SpeciLessonsService } from './speci-lessons.service'

@Controller('speci-lessons')
export class SpeciLessonsController {
  constructor(private readonly speciLessons: SpeciLessonsService) {}

  @Get()
  async getSpeciLessons(@Query('groupId') group_id: UUID) {
    if (!group_id) {
      throw new BadRequestException('Group ID is not provided.')
    }

    const response = await this.speciLessons.getSpeciLessons(group_id)

    if (
      response.scheduleFirstWeek.length === 0 &&
      response.scheduleSecondWeek.length === 0
    ) {
      throw new NotFoundException('Group not found in external API')
    }

    return response
  }
}
