import { Controller, Get, Param } from '@nestjs/common'

import { SpecLessonsService } from './spec-lessons.service.js'

@Controller('spec-lessons')
export class SpecLessonsController {
  constructor(private readonly specLessons: SpecLessonsService) {}

  @Get(':id')
  async getSpecLessons(@Param('id') externalGroupId: string) {
    return await this.specLessons.getSpecLessons(externalGroupId)
  }
}
