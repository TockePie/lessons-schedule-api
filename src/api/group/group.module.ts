import { Module } from '@nestjs/common'

import { PrismaModule } from '../../config/prisma/prisma.module'

import { GroupController } from './group.controller'
import { GroupService } from './group.service'

@Module({
  imports: [PrismaModule],
  controllers: [GroupController],
  providers: [GroupService]
})
export class GroupModule {}
