import { ConflictException, Injectable } from '@nestjs/common'
import { v4 as uuidv4 } from 'uuid'

import { GroupDto } from '@/dto/group.dto'
import { PrismaService } from '@/prisma/prisma.service'

@Injectable()
export class GroupService {
  constructor(private readonly prisma: PrismaService) {}

  getGroups() {
    return this.prisma.group.findMany()
  }

  getGroupById(id: string) {
    return this.prisma.group.findUnique({
      where: { id: id }
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
        id: uuidv4(),
        name: groupDto.name,
        photo: groupDto.photo,
        createdAt: new Date()
      }
    })
  }
}
