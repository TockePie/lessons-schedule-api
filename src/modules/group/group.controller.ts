import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common'

import { GroupService } from './group.service'

@Controller('group')
export class GroupController {
  constructor(private readonly group: GroupService) {}

  @Get()
  getGroupsName() {
    return this.group.getGroupsName()
  }

  @Get('photo/:id')
  getGroupPicture(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.group.getGroupPicture(id)
  }
}
