import { Module } from '@nestjs/common'

import { PrismaModule } from '../../config/prisma/prisma.module'

import { ScheduleController } from './schedule.controller'
import { ScheduleService } from './schedule.service'

@Module({
  imports: [PrismaModule],
  controllers: [ScheduleController],
  providers: [ScheduleService]
})
export class ScheduleModule {}
