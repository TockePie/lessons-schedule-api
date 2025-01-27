import { ConflictException, Injectable } from '@nestjs/common'
import { GroupDto } from 'src/dto/group.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { v4 as uuidv4 } from 'uuid'

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
        id: uuidv4() as string,
        name: groupDto.name,
        photo: groupDto.photo,
        createdAt: new Date()
      }
    })
  }
}
