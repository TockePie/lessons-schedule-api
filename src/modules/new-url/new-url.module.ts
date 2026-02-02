import { Module } from '@nestjs/common'

import { PrismaModule } from '../../config/prisma/prisma.module'

import { NewUrlController } from './new-url.controller'
import { NewUrlService } from './new-url.service'

@Module({
  imports: [PrismaModule],
  controllers: [NewUrlController],
  providers: [NewUrlService]
})
export class NewUrlModule {}
