import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { SupabaseClient } from '@supabase/supabase-js'

import { PrismaService } from '../../config/prisma/prisma.service'

@Injectable()
export class GroupService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient
  ) {}

  async getGroupsName() {
    return this.prisma.group.findMany({
      select: { name: true, group_id: true },
      orderBy: { name: 'asc' }
    })
  }

  private async getGroupById(id: string) {
    return this.prisma.group.findUnique({
      where: { group_id: id }
    })
  }

  async getGroupPicture(id: string) {
    const group = await this.getGroupById(id)
    if (!group) {
      throw new NotFoundException('This group is not found.')
    }

    const { data } = this.supabase.storage
      .from('groupphotos')
      .getPublicUrl(group?.photo)

    return data.publicUrl
  }
}
