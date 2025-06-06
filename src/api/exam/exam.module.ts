import { Module } from '@nestjs/common'

import { ExamController } from './exam.controller'
import { ExamService } from './exam.service'

@Module({
  providers: [ExamService],
  controllers: [ExamController]
})
export class ExamModule {}
