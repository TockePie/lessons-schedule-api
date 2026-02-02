import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaPg } from '@prisma/adapter-pg'

import { PrismaClient } from '../../generated/prisma/client'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name)

  constructor(configService: ConfigService) {
    const databaseUrl = configService.get<string>('DATABASE_URL', {
      infer: true
    })

    const adapter = new PrismaPg({ connectionString: databaseUrl })

    super({ adapter })
  }

  async onModuleInit() {
    try {
      await this.$connect()
      this.logger.log('Prisma connected')
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error)
      this.logger.error(errorMessage)
    }
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }
}
