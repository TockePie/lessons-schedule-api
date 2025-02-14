import { ConflictException, Injectable } from '@nestjs/common'
import { v4 as uuidv4 } from 'uuid'

import { PrismaService } from '../prisma/prisma.service'

import { GroupDto } from './dto/group.dto'

@Injectable()
export class GroupService {
  constructor(private readonly prisma: PrismaService) {}

  getGroupsName() {
    return this.prisma.group.findMany({
      select: { name: true, group_id: true }
    })
  }

  getGroupById(id: string) {
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

  updateGroupInfo(id: string, groupDto: GroupDto, password: string) {
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
