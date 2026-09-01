import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'

import { SpeciLessonsController } from './speci-lessons.controller.js'
import { SpeciLessonsService } from './speci-lessons.service.js'

@Module({
  imports: [HttpModule],
  controllers: [SpeciLessonsController],
  providers: [SpeciLessonsService]
})
export class SpeciLessonsModule {}
