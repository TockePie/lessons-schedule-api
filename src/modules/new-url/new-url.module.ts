import { Module } from '@nestjs/common'

import { PrismaModule } from '../../config/prisma/prisma.module.js'

import { NewUrlController } from './new-url.controller.js'
import { NewUrlService } from './new-url.service.js'

@Module({
  imports: [PrismaModule],
  controllers: [NewUrlController],
  providers: [NewUrlService]
})
export class NewUrlModule {}
