import { UUID } from 'node:crypto'

import { Controller, Get, Query } from '@nestjs/common'

import { ExamService } from './exam.service'

@Controller('exam')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Get()
  getExams(@Query('groupId') groupId: UUID) {
    return this.examService.getExams(groupId)
  }
}
