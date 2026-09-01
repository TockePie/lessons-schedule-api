import { Module } from '@nestjs/common'

import { PrismaModule } from '../../config/prisma/prisma.module.js'
import { SupabaseModule } from '../../config/supabase/supabase.module.js'

import { GroupController } from './group.controller.js'
import { GroupService } from './group.service.js'

@Module({
  imports: [PrismaModule, SupabaseModule],
  controllers: [GroupController],
  providers: [GroupService]
})
export class GroupModule {}
