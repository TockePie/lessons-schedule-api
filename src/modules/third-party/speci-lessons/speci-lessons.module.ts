import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'

import { SpeciLessonsController } from './speci-lessons.controller'
import { SpeciLessonsService } from './speci-lessons.service'

@Module({
  imports: [HttpModule],
  controllers: [SpeciLessonsController],
  providers: [SpeciLessonsService]
})
export class SpeciLessonsModule {}
