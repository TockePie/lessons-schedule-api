import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Req
} from '@nestjs/common'
import { Request } from 'express'

import { GroupDto } from './group.dto'
import { GroupService } from './group.service'

@Controller('group')
export class GroupController {
  constructor(private readonly group: GroupService) {}

  @Get()
  getGroupsName() {
    return this.group.getGroupsName()
  }

  @Post()
  createGroup(@Body() groupDto: GroupDto, @Req() req: Request) {
    const password = req.cookies['password'] as string

    return this.group.createGroup(groupDto, password)
  }

  @Get(':id')
  getGroupById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.group.getGroupById(id)
  }

  @Put(':id')
  updateGroupInfo(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() groupDto: GroupDto,
    @Req() req: Request
  ) {
    const password = req.cookies['password'] as string

    return this.group.updateGroupInfo(id, groupDto, password)
  }
}
