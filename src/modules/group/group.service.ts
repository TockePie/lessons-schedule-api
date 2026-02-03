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

  async getGroupById(id: string) {
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

  // async createGroup(groupDto: GroupCreateDto, password: string) {
  //   //TODO: Change then to header authorization
  //   if (password !== process.env.PASSWORD) {
  //     throw new ConflictException('Invalid password')
  //   }

  //   const existingGroup = await this.prisma.group.findUnique({
  //     where: { name: groupDto.name }
  //   })

  //   if (existingGroup) {
  //     throw new ConflictException('Group already exists')
  //   }

  //   return this.prisma.group.create({
  //     data: {
  //       group_id: uuidv4(),
  //       name: groupDto.name,
  //       photo: groupDto.photo,
  //       created_at: new Date()
  //     }
  //   })
  // }

  // async updateGroupInfo(
  //   id: string,
  //   groupDto: GroupCreateDto,
  //   password: string
  // ) {
  //   //TODO: Change then to header authorization
  //   if (password !== process.env.PASSWORD) {
  //     throw new ConflictException('Invalid password')
  //   }

  //   return this.prisma.group.update({
  //     where: { group_id: id },
  //     data: {
  //       name: groupDto.name,
  //       photo: groupDto.photo
  //     }
  //   })
  // }
}
