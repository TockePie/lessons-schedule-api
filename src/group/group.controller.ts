import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common'
import { GroupDto } from 'src/dto/group.dto'

import { GroupService } from './group.service'

@Controller('group')
export class GroupController {
  constructor(private readonly group: GroupService) {}

  @Get()
  getGroups() {
    return this.group.getGroups()
  }

  @Post()
  createGroup(
    @Body() groupDto: GroupDto,
    @Request() req: { cookies: { [key: string]: string } }
  ) {
    const password = req.cookies['password']

    return this.group.createGroup(groupDto, password)
  }

  @Get(':id')
  getGroupById(@Param('id') id: string) {
    return this.group.getGroupById(id)
  }
}
