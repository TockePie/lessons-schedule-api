import { Module } from '@nestjs/common'

import { PrismaModule } from '../../config/prisma/prisma.module'
import { SupabaseModule } from '../../config/supabase/supabase.module'

import { GroupController } from './group.controller'
import { GroupService } from './group.service'

@Module({
  imports: [PrismaModule, SupabaseModule],
  controllers: [GroupController],
  providers: [GroupService]
})
export class GroupModule {}
