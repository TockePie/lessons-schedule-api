import { Module } from '@nestjs/common'

import { PrismaModule } from '../../config/prisma/prisma.module.js'

import { ScheduleController } from './schedule.controller.js'
import { ScheduleService } from './schedule.service.js'

@Module({
  imports: [PrismaModule],
  controllers: [ScheduleController],
  providers: [ScheduleService]
})
export class ScheduleModule {}
