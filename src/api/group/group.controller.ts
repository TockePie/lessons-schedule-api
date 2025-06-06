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

import { GroupCreateDto } from './group.dto'
import { GroupService } from './group.service'

@Controller('group')
export class GroupController {
  constructor(private readonly group: GroupService) {}

  @Get()
  getGroupsName() {
    return this.group.getGroupsName()
  }

  @Get(':id')
  getGroupById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.group.getGroupById(id)
  }

  @Post()
  createGroup(@Body() groupDto: GroupCreateDto, @Req() req: Request) {
    const password = req.cookies['password'] as string

    return this.group.createGroup(groupDto, password)
  }

  @Put(':id')
  updateGroupInfo(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() groupDto: GroupCreateDto,
    @Req() req: Request
  ) {
    const password = req.cookies['password'] as string

    return this.group.updateGroupInfo(id, groupDto, password)
  }
}
