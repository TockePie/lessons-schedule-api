import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'

import { GroupModule } from '../../group/group.module.js'

import { SpecLessonsController } from './spec-lessons.controller.js'
import { SpecLessonsService } from './spec-lessons.service.js'

@Module({
  imports: [HttpModule, GroupModule],
  controllers: [SpecLessonsController],
  providers: [SpecLessonsService],
  exports: [SpecLessonsService]
})
export class SpecLessonsModule {}
