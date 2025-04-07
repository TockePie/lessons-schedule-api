import { ConflictException, Injectable } from '@nestjs/common'
import { v4 as uuidv4 } from 'uuid'

import { PrismaService } from '../../config/prisma/prisma.service'

import { GroupDto } from './group.dto'

@Injectable()
export class GroupService {
  constructor(private readonly prisma: PrismaService) {}

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

  async createGroup(groupDto: GroupDto, password: string) {
    //TODO: Change then to header authorization
    if (password !== process.env.PASSWORD) {
      throw new ConflictException('Invalid password')
    }

    const existingGroup = await this.prisma.group.findUnique({
      where: { name: groupDto.name }
    })

    if (existingGroup) {
      throw new ConflictException('Group already exists')
    }

    return this.prisma.group.create({
      data: {
        group_id: uuidv4(),
        name: groupDto.name,
        photo: groupDto.photo,
        created_at: new Date()
      }
    })
  }

  async updateGroupInfo(id: string, groupDto: GroupDto, password: string) {
    //TODO: Change then to header authorization
    if (password !== process.env.PASSWORD) {
      throw new ConflictException('Invalid password')
    }

    return this.prisma.group.update({
      where: { group_id: id },
      data: {
        name: groupDto.name,
        photo: groupDto.photo
      }
    })
  }
}
