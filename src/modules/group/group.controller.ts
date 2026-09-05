import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common'

import { GroupService } from './group.service.js'

@Controller('group')
export class GroupController {
  constructor(private readonly group: GroupService) {}

  @Get()
  async getGroupsName() {
    return this.group.getGroupsName()
  }

  @Get('photo/:id')
  async getGroupPicture(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.group.getGroupPicture(id)
  }
}
