import { Module } from '@nestjs/common'

import { PrismaModule } from '../../config/prisma/prisma.module.js'
import { SpecLessonsModule } from '../third-party/spec-lessons/spec-lessons.module.js'

import { ScheduleController } from './schedule.controller.js'
import { ScheduleService } from './schedule.service.js'

@Module({
  imports: [PrismaModule, SpecLessonsModule],
  controllers: [ScheduleController],
  providers: [ScheduleService]
})
export class ScheduleModule {}
