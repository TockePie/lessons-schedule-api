import { Body, Controller, Post, Req } from '@nestjs/common'

import { CreateNewUrlDto } from './new-url.dto'
import { NewUrlService } from './new-url.service'

//TODO: Create a method to check these URLs by GUI and approve then or deny
@Controller('new-url')
export class NewUrlController {
  constructor(private readonly newUrl: NewUrlService) {}

  @Post()
  addNewUrl(
    @Req() req: Record<string, unknown>,
    @Body() body: CreateNewUrlDto
  ) {
    return this.newUrl.addNewUrl(req, body)
  }
}
