import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { Prisma } from 'prisma/generated/prisma'

import { PrismaService } from '../../config/prisma/prisma.service'

import { CreateNewUrlDto } from './new-url.dto'
@Injectable()
export class NewUrlService {
  constructor(private readonly prisma: PrismaService) {}

  async addNewUrl(req: Record<string, unknown>, body: CreateNewUrlDto) {
    try {
      await this.prisma.new_url.create({
        data: {
          subject_id: body.subject_id,
          url: body.url,
          meta: req as Prisma.InputJsonValue,
          created_at: new Date()
        }
      })

      return 'Successfully sent!'
    } catch (error) {
      throw new InternalServerErrorException(
        error instanceof Error ? error.message : 'Unexpected error'
      )
    }
  }
}
